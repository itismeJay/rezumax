"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash2,
  GripVertical,
} from "lucide-react";

// Single education entry props
interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  coursework?: string; // Optional relevant coursework
  honors?: string; // Optional honors/awards
}

// Props for the EducationInfoSection component
interface EducationInfoSectionProps {
  educationInfo: EducationEntry[];
  onChange: (updated: EducationEntry[]) => void;
}

export function EducationInfoSection({
  educationInfo,
  onChange,
}: EducationInfoSectionProps) {
  const [entries, setEntries] = useState<EducationEntry[]>(educationInfo);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Sync entries state when educationInfo prop changes
  useEffect(() => {
    setEntries(educationInfo);
  }, [educationInfo]);

  // Add a new education entry
  const handleAddEntry = () => {
    const newEntry: EducationEntry = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      coursework: "",
      honors: "",
    };

    const updated = [...entries, newEntry];
    setEntries(updated);
    onChange(updated);
  };

  // Remove an education entry
  const handleRemoveEntry = (id: string) => {
    // Keep at least one entry
    if (entries.length <= 1) {
      return;
    }
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    onChange(updated);
  };

  // Update a specific field in an entry
  const handleFieldChange = (
    id: string,
    field: keyof EducationEntry,
    value: string,
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
    setEntries(updated);
    onChange(updated);
  };

  return (
    <Card className="border border-border shadow-none">
      {/* Header */}
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Drag Handle */}
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />

            <h3 className="font-semibold text-base">Education</h3>

            <Pencil
              className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
              onClick={() => setIsEditing(!isEditing)}
            />
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-xs">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </span>

            {/* Visibility Toggle */}
            {visible ? (
              <Eye
                className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <EyeOff
                className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setVisible(!visible)}
              />
            )}

            {/* Collapse Toggle */}
            <ChevronUp
              className={`w-4 h-4 cursor-pointer hover:text-foreground transition-all ${collapsed ? "rotate-180" : ""}`}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      {!collapsed && visible && (
        <CardContent className="px-5 pb-5 space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-lg border-2 border-dashed border-muted-foreground/25">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                No education entries yet
              </p>
              <p className="text-xs text-muted-foreground">
                Click "Add Education" below to get started
              </p>
            </div>
          ) : (
            entries.map((entry, index) => (
              <div
                key={entry.id}
                className="space-y-4 p-4 rounded-lg border border-border bg-muted/20 relative"
              >
                {/* Delete Button */}
                {entries.length > 1 && isEditing && (
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

                {/* School */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    School / University
                  </Label>
                  <Input
                    value={entry.school}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "school", e.target.value)
                    }
                    placeholder="e.g., Massachusetts Institute of Technology"
                    className="h-10"
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>

                {/* Degree */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Degree & Major
                  </Label>
                  <Input
                    value={entry.degree}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "degree", e.target.value)
                    }
                    placeholder="e.g., Bachelor of Science in Computer Science"
                    className="h-10"
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>

                {/* Location & GPA Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Location
                    </Label>
                    <Input
                      value={entry.location}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "location", e.target.value)
                      }
                      placeholder="e.g., Cambridge, MA"
                      className="h-10"
                      disabled={!isEditing}
                      readOnly={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      GPA (Optional)
                    </Label>
                    <Input
                      value={entry.gpa || ""}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "gpa", e.target.value)
                      }
                      placeholder="e.g., 3.9/4.0"
                      className="h-10"
                      disabled={!isEditing}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>

                {/* Start & End Dates */}
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
                      placeholder="e.g., Sept 2019"
                      className="h-10"
                      disabled={!isEditing}
                      readOnly={!isEditing}
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
                      placeholder="e.g., May 2023 or Expected May 2025"
                      className="h-10"
                      disabled={!isEditing}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>

                {/* Optional Fields - Coursework */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Relevant Coursework (Optional)
                  </Label>
                  <Input
                    value={entry.coursework || ""}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "coursework", e.target.value)
                    }
                    placeholder="e.g., Data Structures, Algorithms, Machine Learning"
                    className="h-10"
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>

                {/* Optional Fields - Honors */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Honors & Awards (Optional)
                  </Label>
                  <Input
                    value={entry.honors || ""}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "honors", e.target.value)
                    }
                    placeholder="e.g., Dean's List, Summa Cum Laude"
                    className="h-10"
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>

                {/* Entry Number Badge */}
                <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
            ))
          )}

          {/* Add Education Button */}
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
              <span className="font-medium">Add Education</span>
            </Button>
          )}

          {/* Helper Tip */}
          {isEditing && (
            <div className="mt-4 p-3 rounded-md bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground">
                💡 <span className="font-medium">Pro tip:</span> Include your GPA
                if it's above 3.5, and list relevant coursework that matches the
                job requirements
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
