// app/edit/[resumeId]/languages-info-section.tsx
"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

interface LanguageEntry {
  id: string;
  name: string;
  proficiency: string;
}

interface LanguagesSectionProps {
  languagesInfo: LanguageEntry[];
  onChange: (updated: LanguageEntry[]) => void;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  sectionName?: string;
  onSectionNameChange?: (name: string) => void;
}

export function LanguagesInfoSection({
  languagesInfo,
  onChange,
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName,
  onSectionNameChange,
}: LanguagesSectionProps) {
  const [entries, setEntries] = useState<LanguageEntry[]>(languagesInfo);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);

  const sectionName = externalSectionName || "Languages";
  const [tempSectionName, setTempSectionName] = useState(sectionName);

  // Proficiency levels
  const proficiencyLevels = [
    "Native",
    "Fluent",
    "Professional",
    "Intermediate",
    "Basic",
  ];

  useEffect(() => {
    setEntries(languagesInfo);
  }, [languagesInfo]);

  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  const handleAddEntry = () => {
    const newEntry: LanguageEntry = {
      id: crypto.randomUUID(), // ✅ Perfect!
      name: "",
      proficiency: "",
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
    field: keyof LanguageEntry,
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
              {entries.length} {entries.length === 1 ? "language" : "languages"}
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
        <CardContent className="px-5 pb-5 space-y-4">
          {entries.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-lg border-2 border-dashed">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                No languages yet
              </p>
              <p className="text-xs text-muted-foreground">
                Click "Add Language" below to get started
              </p>
            </div>
          ) : (
            entries?.map((entry, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg border border-border bg-muted/20 relative"
              >
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Language
                    </Label>
                    <Input
                      value={entry.name}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "name", e.target.value)
                      }
                      placeholder="e.g., Spanish"
                      className="h-9"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Proficiency
                    </Label>
                    <Select
                      value={entry.proficiency}
                      onValueChange={(value) =>
                        handleFieldChange(entry.id, "proficiency", value)
                      }
                    >
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {proficiencyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {entries.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive mt-6"
                    onClick={() => handleRemoveEntry(entry.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                )}

                <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
            ))
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full h-12 gap-3 border-2 border-dashed"
            onClick={handleAddEntry}
          >
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary/10">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <span className="font-medium">Add Language</span>
          </Button>

          <div className="p-3 rounded-md bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">
              💡 <span className="font-medium">Pro tip:</span> Only include
              languages where you have professional or conversational
              proficiency
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
