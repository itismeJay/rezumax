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
  Sparkles,
  Loader2,
} from "lucide-react";

interface ProjectEntry {
  id: string;
  name: string;
  technologies: string;
  startDate?: string;
  endDate?: string;
  bullets: string[];
  projectLink?: string; // Optional project link
}

interface ProjectsInfoSectionProps {
  projectsInfo: ProjectEntry[];
  onChange: (updated: ProjectEntry[]) => void;
  jobDescription?: string;
  visible?: boolean; // ← added for parent control
  onVisibilityChange?: (visible: boolean) => void; // ← added for parent callback
  sectionName?: string; // ← added for custom section name
  onSectionNameChange?: (name: string) => void; // ← added for section name change callback
}

export function ProjectsInfoSection({
  projectsInfo,
  onChange,
  jobDescription = "",
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName,
  onSectionNameChange,
}: ProjectsInfoSectionProps) {
  const ensureIds = (items: ProjectEntry[]) =>
    items.map((e) => ({ ...e, id: e.id || crypto.randomUUID() }));

  const [entries, setEntries] = useState<ProjectEntry[]>(() => ensureIds(projectsInfo));
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState<boolean>(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);
  const [tempSectionName, setTempSectionName] = useState("Projects");
  const [loadingBullet, setLoadingBullet] = useState<string | null>(null);

  const sectionName = externalSectionName || "Projects";

  // Sync entries state when projectsInfo prop changes
  useEffect(() => {
    setEntries(ensureIds(projectsInfo));
  }, [projectsInfo]);

  // Sync visible state with external prop
  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  // Sync tempSectionName with sectionName prop
  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  // Handle toggle visibility
  const handleToggleVisibility = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    if (onVisibilityChange) {
      onVisibilityChange(newVisible);
    }
  };

  // Add new project entry
  const handleAddEntry = () => {
    const newEntry: ProjectEntry = {
      id: crypto.randomUUID(), // ✅ Perfect!
      name: "",
      technologies: "",
      startDate: "",
      endDate: "",
      bullets: [""],
      projectLink: "",
    };

    const updated = [...entries, newEntry];
    setEntries(updated);
    onChange(updated);
  };

  // Delete project entry
  const handleDeleteEntry = (id: string) => {
    if (entries.length <= 1) return;
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    onChange(updated);
  };

  // Update field
  const handleFieldChange = (
    id: string,
    field: keyof ProjectEntry,
    value: string | string[],
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
    setEntries(updated);
    onChange(updated);
  };

  // Add bullet point
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

  // Update specific bullet
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

  // Delete bullet point
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

  // Handle rename section
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

  // Generate bullet point with AI
  const handleGenerateBullet = async (entryId: string, bulletIndex: number) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) return;

    const bulletKey = `${entryId}-${bulletIndex}`;
    setLoadingBullet(bulletKey);

    try {
      // Simulate AI generation (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const generatedBullet = `Developed key feature for ${entry.name} using ${entry.technologies}`;
      handleBulletChange(entryId, bulletIndex, generatedBullet);
    } catch (error) {
      console.error("Failed to generate bullet:", error);
    } finally {
      setLoadingBullet(null);
    }
  };

  // Generate all bullets for an entry
  const handleGenerateAllBullets = async (entryId: string) => {
    const entry = entries.find((e) => e.id === entryId);
    if (!entry) return;

    setLoadingBullet(`${entryId}-all`);

    try {
      // Simulate AI generation (replace with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const generatedBullets = [
        `Built ${entry.name} using ${entry.technologies} to solve real-world problems`,
        `Implemented key features that improved user experience and functionality`,
        `Collaborated with team members to deliver project on schedule`,
      ];

      handleFieldChange(entryId, "bullets", generatedBullets);
    } catch (error) {
      console.error("Failed to generate bullets:", error);
    } finally {
      setLoadingBullet(null);
    }
  };

  return (
    <Card
      className={`border border-border shadow-none ${!visible ? "opacity-50" : ""}`}
    >
      {/* Header */}
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
                className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={handleStartRename}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4 text-green-500 cursor-pointer hover:text-green-600 transition-colors"
                  onClick={handleConfirmRename}
                />
                <X
                  className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-600 transition-colors"
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
                className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                onClick={handleToggleVisibility}
              />
            ) : (
              <EyeOff
                className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                onClick={handleToggleVisibility}
              />
            )}
            <ChevronUp
              className={`w-4 h-4 cursor-pointer hover:text-foreground transition-all ${
                collapsed ? "rotate-180" : ""
              }`}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      {!collapsed && (
        <CardContent className="px-5 pb-5 space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-lg border-2 border-dashed border-muted-foreground/25">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                No projects yet
              </p>
              <p className="text-xs text-muted-foreground">
                Add your personal, academic, or professional projects
              </p>
            </div>
          ) : (
            entries.map((entry, entryIndex) => (
              <div
                key={entry.id}
                className="space-y-4 p-4 rounded-lg border border-border relative"
              >
                {/* Delete Button */}
                {entries.length > 1 && (
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

                {/* Project Name */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Project Name
                  </Label>
                  <Input
                    placeholder="e.g., E-Commerce Platform"
                    className="h-10"
                    value={entry.name}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "name", e.target.value)
                    }
                  />
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Technologies & Tools
                  </Label>
                  <Input
                    placeholder="e.g., React, Node.js, MongoDB, Docker"
                    className="h-10"
                    value={entry.technologies}
                    onChange={(e) =>
                      handleFieldChange(
                        entry.id,
                        "technologies",
                        e.target.value,
                      )
                    }
                  />
                </div>

                {/* Dates and Link Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Start Date (Optional)
                    </Label>
                    <Input
                      placeholder="e.g., Jan 2024"
                      className="h-10"
                      value={entry.startDate || ""}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "startDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      End Date (Optional)
                    </Label>
                    <Input
                      placeholder="e.g., Present"
                      className="h-10"
                      value={entry.endDate || ""}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "endDate", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Project Link (Optional)
                    </Label>
                    <Input
                      placeholder="e.g., github.com/..."
                      className="h-10"
                      value={entry.projectLink || ""}
                      onChange={(e) =>
                        handleFieldChange(
                          entry.id,
                          "projectLink",
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                {/* Bullets Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Key Features & Achievements
                    </Label>
                    <Button
                      asChild
                      variant="gradient"
                      size="sm"
                      className="group gap-1.5 text-xs px-3 py-2 rounded-md shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-300 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0]"
                    >
                      <button
                        type="button"
                        className="flex items-center gap-1.5"
                        onClick={() => handleGenerateAllBullets(entry.id)}
                        disabled={loadingBullet === `${entry.id}-all`}
                      >
                        {loadingBullet === `${entry.id}-all` ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Sparkles className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        )}
                        Suggest Bullet Point
                      </button>
                    </Button>
                  </div>

                  {entry.bullets.map((bullet, bulletIndex) => (
                    <div key={bulletIndex} className="flex gap-2 items-start">
                      <span className="text-muted-foreground mt-3 text-xs">
                        •
                      </span>
                      <div className="flex-1 relative">
                        <Textarea
                          placeholder="Describe a key feature, achievement, or technical challenge..."
                          className="min-h-[80px] text-sm resize-none pr-28 pb-10"
                          value={bullet}
                          onChange={(e) =>
                            handleBulletChange(
                              entry.id,
                              bulletIndex,
                              e.target.value,
                            )
                          }
                        />

                        {/* Button inside the Textarea */}
                        <Button
                          asChild
                          variant="gradient"
                          size="sm"
                          className="absolute bottom-2 right-2 group gap-1 text-xs px-3 py-1.5 rounded-md shadow-md border hover:shadow-lg active:scale-[0.98] transition-all duration-300 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] hover:bg-[position:100%_0]"
                        >
                          <button
                            type="button"
                            className="flex items-center gap-1"
                            onClick={() =>
                              handleGenerateBullet(entry.id, bulletIndex)
                            }
                            disabled={
                              loadingBullet === `${entry.id}-${bulletIndex}`
                            }
                          >
                            {loadingBullet === `${entry.id}-${bulletIndex}` ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Sparkles className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            )}
                            Improve with AI
                          </button>
                        </Button>
                      </div>

                      {entry.bullets.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() =>
                            handleDeleteBullet(entry.id, bulletIndex)
                          }
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {/* Add Bullet Button */}
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
                </div>

                {/* Entry Number Badge */}
                <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                  {entryIndex + 1}
                </div>
              </div>
            ))
          )}

          {/* Add Project Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-14 gap-3 border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-foreground"
            onClick={handleAddEntry}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-medium">Add Project</span>
          </Button>

          {/* Helper Tip */}
          {jobDescription && (
            <div className="mt-4 p-3 rounded-md bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                💡 <span className="font-medium">Tip:</span> Highlight projects
                that use technologies mentioned in the job description
              </p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
