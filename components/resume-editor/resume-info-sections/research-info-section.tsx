// app/edit/[resumeId]/research-info-section.tsx
"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash2,
  GripVertical,
  Check,
  X,
} from "lucide-react";

interface ResearchEntry {
  id: string;
  title: string;
  institution: string;
  advisor: string;
  startDate: string;
  endDate: string;
  description: string[];
}

interface ResearchSectionProps {
  researchInfo: ResearchEntry[];
  onChange: (updated: ResearchEntry[]) => void;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  sectionName?: string;
  onSectionNameChange?: (name: string) => void;
}

export function ResearchInfoSection({
  researchInfo,
  onChange,
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName,
  onSectionNameChange,
}: ResearchSectionProps) {
  const ensureIds = (items: ResearchEntry[]) =>
    items.map((e) => ({ ...e, id: e.id || crypto.randomUUID() }));

  const [entries, setEntries] = useState<ResearchEntry[]>(() => ensureIds(researchInfo));
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);

  const sectionName = externalSectionName || "Research";
  const [tempSectionName, setTempSectionName] = useState(sectionName);

  useEffect(() => {
    setEntries(ensureIds(researchInfo));
  }, [researchInfo]);

  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  const handleAddEntry = () => {
    const newEntry: ResearchEntry = {
      id: crypto.randomUUID(), // ✅ Perfect!
      title: "",
      institution: "",
      advisor: "",
      startDate: "",
      endDate: "",
      description: [""],
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    onChange(updated);
  };

  const handleRemoveEntry = (id: string) => {
    if (entries.length <= 1) return;
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    onChange(updated);
  };

  const handleFieldChange = (
    id: string,
    field: keyof ResearchEntry,
    value: string | string[],
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
    setEntries(updated);
    onChange(updated);
  };

  const handleAddDescription = (id: string) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, description: [...entry.description, ""] };
      }
      return entry;
    });
    setEntries(updated);
    onChange(updated);
  };

  const handleDescriptionChange = (
    id: string,
    descriptionIndex: number,
    value: string,
  ) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        const newDescription = [...entry.description];
        newDescription[descriptionIndex] = value;
        return { ...entry, description: newDescription };
      }
      return entry;
    });
    setEntries(updated);
    onChange(updated);
  };

  const handleDeleteDescription = (id: string, descriptionIndex: number) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        const newDescription = entry.description.filter(
          (_, idx) => idx !== descriptionIndex,
        );
        return {
          ...entry,
          description: newDescription.length > 0 ? newDescription : [""],
        };
      }
      return entry;
    });
    setEntries(updated);
    onChange(updated);
  };

  const handleToggleVisibility = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    if (onVisibilityChange) {
      onVisibilityChange(newVisible);
    }
  };

  const handleStartRename = () => {
    setTempSectionName(sectionName);
    setIsRenamingSection(true);
  };

  const handleConfirmRename = () => {
    if (onSectionNameChange) {
      onSectionNameChange(tempSectionName);
    }
    setIsRenamingSection(false);
  };

  const handleCancelRename = () => {
    setTempSectionName(sectionName);
    setIsRenamingSection(false);
  };

  return (
    <Card
      className={`border border-border shadow-none ${!visible ? "opacity-50" : ""}`}
    >
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />

            {isRenamingSection ? (
              <Input
                value={tempSectionName}
                onChange={(e) => setTempSectionName(e.target.value)}
                autoFocus
                className="h-7 w-40 text-base font-semibold p-1"
              />
            ) : (
              <h3 className="font-semibold text-base">{sectionName}</h3>
            )}

            {!isRenamingSection ? (
              <Pencil
                className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={handleStartRename}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4 text-green-500 cursor-pointer"
                  onClick={handleConfirmRename}
                />
                <X
                  className="w-4 h-4 text-red-500 cursor-pointer"
                  onClick={handleCancelRename}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-xs">
              {entries.length} {entries.length === 1 ? "project" : "projects"}
            </span>

            {visible ? (
              <Eye
                className="w-4 h-4 cursor-pointer hover:text-foreground"
                onClick={handleToggleVisibility}
              />
            ) : (
              <EyeOff
                className="w-4 h-4 cursor-pointer hover:text-foreground"
                onClick={handleToggleVisibility}
              />
            )}

            <ChevronUp
              className={`w-4 h-4 cursor-pointer hover:text-foreground transition-all ${collapsed ? "rotate-180" : ""}`}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </CardHeader>

      {!collapsed && (
        <CardContent className="px-5 pb-5 space-y-6">
          {entries?.map((entry, index) => (
            <div
              key={`entry-${entry.id}-${index}`} // ✅ fixed outer key
              className="space-y-4 p-4 rounded-lg border border-border bg-muted/20 relative"
            >
              {entries.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveEntry(entry.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Research Title
                </Label>
                <Input
                  value={entry.title}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "title", e.target.value)
                  }
                  placeholder="e.g., Machine Learning for Drug Discovery"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Institution / Lab
                </Label>
                <Input
                  value={entry.institution}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "institution", e.target.value)
                  }
                  placeholder="e.g., Stanford AI Lab"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Advisor / PI
                </Label>
                <Input
                  value={entry.advisor}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "advisor", e.target.value)
                  }
                  placeholder="e.g., Dr. Jane Smith"
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Start Date
                  </Label>
                  <Input
                    value={entry.startDate}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "startDate", e.target.value)
                    }
                    placeholder="e.g., Jan 2023"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    End Date
                  </Label>
                  <Input
                    value={entry.endDate}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "endDate", e.target.value)
                    }
                    placeholder="e.g., Present"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground font-medium">
                  Research Description
                </Label>
                {entry.description?.map((desc, descIndex) => (
                  <div
                    key={`desc-${entry.id}-${descIndex}`} // ✅ fixed inner key
                    className="flex gap-2 items-start"
                  >
                    <span className="text-muted-foreground mt-3 text-xs">
                      •
                    </span>
                    <Textarea
                      placeholder="Developed novel algorithms..."
                      className="min-h-[60px] text-sm resize-none flex-1"
                      value={desc}
                      onChange={(e) =>
                        handleDescriptionChange(
                          entry.id,
                          descIndex,
                          e.target.value,
                        )
                      }
                    />
                    {entry.description.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          handleDeleteDescription(entry.id, descIndex)
                        }
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-dashed"
                  onClick={() => handleAddDescription(entry.id)}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Description
                </Button>
              </div>

              <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {index + 1}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full h-14 gap-3 border-2 border-dashed"
            onClick={handleAddEntry}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-medium">Add Research Project</span>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
