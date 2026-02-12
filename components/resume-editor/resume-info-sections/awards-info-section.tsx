// app/edit/[resumeId]/awards-info-section.tsx
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

interface AwardEntry {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

interface AwardsSectionProps {
  awardsInfo: AwardEntry[];
  onChange: (updated: AwardEntry[]) => void;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  sectionName?: string;
  onSectionNameChange?: (name: string) => void;
}

export function AwardsInfoSection({
  awardsInfo,
  onChange,
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName,
  onSectionNameChange,
}: AwardsSectionProps) {
  const ensureIds = (items: AwardEntry[]) =>
    items.map((e) => ({ ...e, id: e.id || crypto.randomUUID() }));

  const [entries, setEntries] = useState<AwardEntry[]>(() => ensureIds(awardsInfo));
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);

  const sectionName = externalSectionName || "Awards & Honors";
  const [tempSectionName, setTempSectionName] = useState(sectionName);

  useEffect(() => {
    setEntries(ensureIds(awardsInfo));
  }, [awardsInfo]);

  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  const handleAddEntry = () => {
    const newEntry: AwardEntry = {
      id: crypto.randomUUID(), // ✅ Perfect!
      title: "",
      issuer: "",
      date: "",
      description: "",
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
    field: keyof AwardEntry,
    value: string,
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
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
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
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
          {entries.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-lg border-2 border-dashed">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                No awards yet
              </p>
              <p className="text-xs text-muted-foreground">
                Click "Add Award" below to get started
              </p>
            </div>
          ) : (
            entries.map((entry, index) => (
              <div
                key={entry.id}
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
                    Award Title
                  </Label>
                  <Input
                    value={entry.title}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "title", e.target.value)
                    }
                    placeholder="e.g., Employee of the Year"
                    className="h-10"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Issuing Organization
                    </Label>
                    <Input
                      value={entry.issuer}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "issuer", e.target.value)
                      }
                      placeholder="e.g., Google"
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Date Received
                    </Label>
                    <Input
                      value={entry.date}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "date", e.target.value)
                      }
                      placeholder="e.g., Dec 2023"
                      className="h-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Description (Optional)
                  </Label>
                  <Textarea
                    value={entry.description}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "description", e.target.value)
                    }
                    placeholder="Brief description of the award and its significance"
                    className="min-h-[60px] text-sm resize-none"
                  />
                </div>

                <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
            ))
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full h-14 gap-3 border-2 border-dashed"
            onClick={handleAddEntry}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-medium">Add Award</span>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
