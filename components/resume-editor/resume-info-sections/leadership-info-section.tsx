// app/edit/[resumeId]/leadership-info-section.tsx
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

interface LeadershipEntry {
  id: string;
  role: string;
  organization: string;
  startDate: string;
  endDate: string;
  achievements: string[];
}

interface LeadershipSectionProps {
  leadershipInfo: LeadershipEntry[];
  onChange: (updated: LeadershipEntry[]) => void;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  sectionName?: string;
  onSectionNameChange?: (name: string) => void;
}

export function LeadershipInfoSection({
  leadershipInfo,
  onChange,
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName,
  onSectionNameChange,
}: LeadershipSectionProps) {
  const [entries, setEntries] = useState<LeadershipEntry[]>(leadershipInfo);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);

  const sectionName = externalSectionName || "Leadership";
  const [tempSectionName, setTempSectionName] = useState(sectionName);

  useEffect(() => {
    setEntries(leadershipInfo);
  }, [leadershipInfo]);

  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  const handleAddEntry = () => {
    const newEntry: LeadershipEntry = {
      id: crypto.randomUUID(), // ✅ Perfect!
      role: "",
      organization: "",
      startDate: "",
      endDate: "",
      achievements: [""],
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
    field: keyof LeadershipEntry,
    value: string | string[],
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
    setEntries(updated);
    onChange(updated);
  };

  const handleAddAchievement = (id: string) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, achievements: [...entry.achievements, ""] };
      }
      return entry;
    });
    setEntries(updated);
    onChange(updated);
  };

  const handleAchievementChange = (
    id: string,
    achievementIndex: number,
    value: string,
  ) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        const newAchievements = [...entry.achievements];
        newAchievements[achievementIndex] = value;
        return { ...entry, achievements: newAchievements };
      }
      return entry;
    });
    setEntries(updated);
    onChange(updated);
  };

  const handleDeleteAchievement = (id: string, achievementIndex: number) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        const newAchievements = entry.achievements.filter(
          (_, idx) => idx !== achievementIndex,
        );
        return {
          ...entry,
          achievements: newAchievements.length > 0 ? newAchievements : [""],
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
              {entries.length} {entries.length === 1 ? "role" : "roles"}
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
          {entries.map((entry, index) => (
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
                  Leadership Role / Title
                </Label>
                <Input
                  value={entry.role}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "role", e.target.value)
                  }
                  placeholder="e.g., President, Student Council"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Organization
                </Label>
                <Input
                  value={entry.organization}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "organization", e.target.value)
                  }
                  placeholder="e.g., MIT Student Government"
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
                    placeholder="e.g., Sep 2022"
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
                  Key Achievements
                </Label>
                {entry.achievements.map((achievement, achievementIndex) => (
                  <div
                    key={achievementIndex}
                    className="flex gap-2 items-start"
                  >
                    <span className="text-muted-foreground mt-3 text-xs">
                      •
                    </span>
                    <Textarea
                      placeholder="Led team of 20 students..."
                      className="min-h-[60px] text-sm resize-none flex-1"
                      value={achievement}
                      onChange={(e) =>
                        handleAchievementChange(
                          entry.id,
                          achievementIndex,
                          e.target.value,
                        )
                      }
                    />
                    {entry.achievements.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() =>
                          handleDeleteAchievement(entry.id, achievementIndex)
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
                  onClick={() => handleAddAchievement(entry.id)}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Achievement
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
            <span className="font-medium">Add Leadership Role</span>
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
