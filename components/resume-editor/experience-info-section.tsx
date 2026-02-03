"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, Trash2, GripVertical } from "lucide-react";

interface ExperienceEntry {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: string[];
}

interface ExperienceSectionProps {
  experienceInfo: ExperienceEntry[];
  onChange: (updated: ExperienceEntry[]) => void;
  jobDescription?: string; // Optional job description for AI tailoring
}

export function ExperienceInfoSection({
  experienceInfo,
  onChange,
  jobDescription = "",
}: ExperienceSectionProps) {
  const [entries, setEntries] = useState<ExperienceEntry[]>(experienceInfo);
  const [isEditing, setIsEditing] = useState(false);

  // Sync entries state when experienceInfo prop changes
  useEffect(() => {
    setEntries(experienceInfo);
  }, [experienceInfo]);

  // Update entry field
  const handleFieldChange = (
    id: string,
    field: keyof ExperienceEntry,
    value: string | string[],
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
    setEntries(updated);
    onChange(updated);
  };

  // Add new experience entry
  const handleAddEntry = () => {
    const newEntry: ExperienceEntry = {
      id: crypto.randomUUID(),
      position: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    };

    const updated = [...entries, newEntry];
    setEntries(updated);
    onChange(updated);
  };

  // Delete experience entry
  const handleDeleteEntry = (id: string) => {
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    onChange(updated);
  };

  // Add bullet point to specific entry
  const handleAddBullet = (id: string) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, bullets: [...entry.bullets, ""] };
      }
      return entry;
    });
    setEntries(updated);
    onChange(updated);
  };

  // Update specific bullet point
  const handleBulletChange = (
    id: string,
    bulletIndex: number,
    value: string,
  ) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        const newBullets = [...entry.bullets];
        newBullets[bulletIndex] = value;
        return { ...entry, bullets: newBullets };
      }
      return entry;
    });
    setEntries(updated);
    onChange(updated);
  };

  // Delete specific bullet point
  const handleDeleteBullet = (id: string, bulletIndex: number) => {
    const updated = entries.map((entry) => {
      if (entry.id === id) {
        const newBullets = entry.bullets.filter(
          (_, idx) => idx !== bulletIndex,
        );
        return { ...entry, bullets: newBullets.length > 0 ? newBullets : [""] };
      }
      return entry;
    });
    setEntries(updated);
    onChange(updated);
  };

  return (
    <Card>
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
            <h3 className="font-semibold text-base">Experience</h3>
            <Pencil
              className={`w-3.5 h-3.5 cursor-pointer transition-colors ${
                isEditing
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsEditing(!isEditing)}
              aria-label={isEditing ? "Exit edit mode" : "Enter edit mode"}
            />
          </div>
          <span className="text-xs text-muted-foreground">
            {entries.length} {entries.length === 1 ? "entry" : "entries"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-5 pb-5 space-y-6">
        {entries.map((entry, entryIndex) => (
          <div
            key={entry.id}
            className="space-y-4 p-4 rounded-lg border border-border bg-muted/20 relative"
          >
            {/* Delete Entry Button */}
            {entries.length > 1 && isEditing && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                onClick={() => handleDeleteEntry(entry.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}

            {/* Position */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground font-medium">
                Position / Job Title
              </Label>
              <Input
                placeholder="e.g., Senior Software Engineer"
                className="h-10"
                value={entry.position}
                onChange={(e) =>
                  handleFieldChange(entry.id, "position", e.target.value)
                }
                disabled={!isEditing}
                readOnly={!isEditing}
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground font-medium">
                Company / Organization
              </Label>
              <Input
                placeholder="e.g., Google"
                className="h-10"
                value={entry.company}
                onChange={(e) =>
                  handleFieldChange(entry.id, "company", e.target.value)
                }
                disabled={!isEditing}
                readOnly={!isEditing}
              />
            </div>

            {/* Location and Dates Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Location
                </Label>
                <Input
                  placeholder="e.g., San Francisco, CA"
                  className="h-10"
                  value={entry.location}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "location", e.target.value)
                  }
                  disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Start Date
                </Label>
                <Input
                  placeholder="e.g., Jan 2023"
                  className="h-10"
                  value={entry.startDate}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "startDate", e.target.value)
                  }
                  disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  End Date
                </Label>
                <Input
                  placeholder="e.g., Present"
                  className="h-10"
                  value={entry.endDate}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "endDate", e.target.value)
                  }
                  disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* Bullets Section */}
            <div className="space-y-3">
              <Label className="text-xs text-muted-foreground font-medium">
                Key Achievements & Responsibilities
              </Label>

              {entry.bullets.map((bullet, bulletIndex) => (
                <div key={bulletIndex} className="flex gap-2 items-start">
                  <span className="text-muted-foreground mt-3 text-xs">•</span>
                  <Textarea
                    placeholder="Describe your achievement or responsibility..."
                    className="min-h-[60px] text-sm resize-none flex-1"
                    value={bullet}
                    onChange={(e) =>
                      handleBulletChange(entry.id, bulletIndex, e.target.value)
                    }
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                  {entry.bullets.length > 1 && isEditing && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mt-2 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteBullet(entry.id, bulletIndex)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              ))}

              {/* Add Bullet Button */}
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-dashed"
                  onClick={() => handleAddBullet(entry.id)}
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Bullet Point
                </Button>
              )}
            </div>

            {/* Entry Number Badge */}
            <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
              {entryIndex + 1}
            </div>
          </div>
        ))}

        {/* Add New Experience Entry Button */}
        {isEditing && (
          <Button
            type="button"
            variant="outline"
            className="w-full h-14 gap-3 border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-foreground"
            onClick={handleAddEntry}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-medium">Add Another Experience</span>
          </Button>
        )}

        {/* Job Description Helper (if provided) */}
        {jobDescription && (
          <div className="mt-4 p-3 rounded-md bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground">
              💡 Tip: Tailor your bullet points to match keywords from the job
              description
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
