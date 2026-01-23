// components/resume/ResumeEditor.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { debounce } from "lodash";
import JakeRyanResume from "../templates/jake-ryan-template";

interface ResumeEditorProps {
  initialResume: {
    id: string;
    userId: string;
    title: string;
    template: string;
    content: any;
    score: number | null;
    createdAt: Date;
    updatedAt: Date;
  };
}

export default function ResumeEditor({ initialResume }: ResumeEditorProps) {
  const router = useRouter();

  // State
  const [title, setTitle] = useState(initialResume.title);
  const [resumeData, setResumeData] = useState(initialResume.content);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date>(
    new Date(initialResume.updatedAt),
  );

  // ========================================
  // AUTO-SAVE FUNCTIONALITY
  // ========================================
  const saveResume = async (data: any, newTitle?: string) => {
    setIsSaving(true);

    try {
      const response = await fetch(`/api/resumes/${initialResume.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTitle || title,
          content: data,
        }),
      });

      if (!response.ok) throw new Error("Failed to save");

      const updated = await response.json();
      setLastSaved(new Date(updated.updatedAt));
      toast.success("Saved!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save");
    } finally {
      setIsSaving(false);
    }
  };

  // Debounced auto-save (waits 1 second after user stops typing)
  const debouncedSave = useCallback(
    debounce((data: any) => {
      saveResume(data);
    }, 1000),
    [initialResume.id, title],
  );

  // Trigger auto-save when data changes
  useEffect(() => {
    if (JSON.stringify(resumeData) !== JSON.stringify(initialResume.content)) {
      debouncedSave(resumeData);
    }
  }, [resumeData]);

  // ========================================
  // UPDATE FUNCTIONS
  // ========================================

  // Personal Info
  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  // Experience
  const addExperience = () => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: `exp-${Date.now()}`,
          position: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          bullets: ["", "", ""],
        },
      ],
    }));
  };

  const updateExperience = (id: string, field: string, value: any) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: prev.experience.map((exp: any) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: prev.experience.filter((exp: any) => exp.id !== id),
    }));
  };

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: prev.experience.map((exp: any) =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.map((b: string, i: number) =>
                i === bulletIndex ? value : b,
              ),
            }
          : exp,
      ),
    }));
  };

  const addBullet = (expId: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: prev.experience.map((exp: any) =>
        exp.id === expId ? { ...exp, bullets: [...exp.bullets, ""] } : exp,
      ),
    }));
  };

  const removeBullet = (expId: string, bulletIndex: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      experience: prev.experience.map((exp: any) =>
        exp.id === expId
          ? {
              ...exp,
              bullets: exp.bullets.filter(
                (_: any, i: number) => i !== bulletIndex,
              ),
            }
          : exp,
      ),
    }));
  };

  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ========================================
          HEADER
      ======================================== */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/dashboard")}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>

            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => saveResume(resumeData, title)}
                className="text-xl font-bold border-none focus-visible:ring-2 focus-visible:ring-blue-500 px-2 h-auto"
                placeholder="Resume Title"
              />
              <p className="text-xs text-gray-500">
                {isSaving ? (
                  <span className="flex items-center gap-1">
                    <span className="animate-pulse">Saving...</span>
                  </span>
                ) : (
                  `Last saved ${formatTimeAgo(lastSaved)} • ${initialResume.template}`
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={() => saveResume(resumeData)}
              disabled={isSaving}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Now"}
            </Button>
          </div>
        </div>
      </header>

      {/* ========================================
          MAIN CONTENT - SPLIT VIEW
      ======================================== */}
      <div className="max-w-[1800px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* ========================================
              LEFT: FORMS
          ======================================== */}
          <div className="h-screen overflow-y-auto p-6 bg-white border-r">
            <div className="max-w-2xl mx-auto space-y-6">
              {/* Personal Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Full Name</Label>
                      <Input
                        value={resumeData.personalInfo?.fullName || ""}
                        onChange={(e) =>
                          updatePersonalInfo("fullName", e.target.value)
                        }
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        value={resumeData.personalInfo?.email || ""}
                        onChange={(e) =>
                          updatePersonalInfo("email", e.target.value)
                        }
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={resumeData.personalInfo?.phone || ""}
                        onChange={(e) =>
                          updatePersonalInfo("phone", e.target.value)
                        }
                        placeholder="+1 234-567-8900"
                      />
                    </div>
                    <div>
                      <Label>Location</Label>
                      <Input
                        value={resumeData.personalInfo?.location || ""}
                        onChange={(e) =>
                          updatePersonalInfo("location", e.target.value)
                        }
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    <div>
                      <Label>LinkedIn</Label>
                      <Input
                        value={resumeData.personalInfo?.linkedin || ""}
                        onChange={(e) =>
                          updatePersonalInfo("linkedin", e.target.value)
                        }
                        placeholder="linkedin.com/in/johndoe"
                      />
                    </div>
                    <div>
                      <Label>GitHub</Label>
                      <Input
                        value={resumeData.personalInfo?.github || ""}
                        onChange={(e) =>
                          updatePersonalInfo("github", e.target.value)
                        }
                        placeholder="github.com/johndoe"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Experience Section */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Experience</CardTitle>
                    <Button onClick={addExperience} size="sm" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {resumeData.experience?.map((exp: any, index: number) => (
                    <div
                      key={exp.id}
                      className="border rounded-lg p-4 space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          Experience #{index + 1}
                        </span>
                        {resumeData.experience.length > 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeExperience(exp.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Company</Label>
                          <Input
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "company",
                                e.target.value,
                              )
                            }
                            placeholder="Company Name"
                          />
                        </div>
                        <div>
                          <Label>Position</Label>
                          <Input
                            value={exp.position}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "position",
                                e.target.value,
                              )
                            }
                            placeholder="Software Engineer"
                          />
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "location",
                                e.target.value,
                              )
                            }
                            placeholder="City, State"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <Label>Start</Label>
                            <Input
                              value={exp.startDate}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "startDate",
                                  e.target.value,
                                )
                              }
                              placeholder="June 2020"
                            />
                          </div>
                          <div>
                            <Label>End</Label>
                            <Input
                              value={exp.endDate}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "endDate",
                                  e.target.value,
                                )
                              }
                              placeholder="Present"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bullets */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Bullet Points</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addBullet(exp.id)}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Bullet
                          </Button>
                        </div>

                        {exp.bullets?.map(
                          (bullet: string, bulletIndex: number) => (
                            <div
                              key={bulletIndex}
                              className="flex gap-2 items-start"
                            >
                              <span className="text-muted-foreground mt-3">
                                •
                              </span>
                              <Textarea
                                value={bullet}
                                onChange={(e) =>
                                  updateBullet(
                                    exp.id,
                                    bulletIndex,
                                    e.target.value,
                                  )
                                }
                                placeholder="Describe your achievement..."
                                className="flex-1 min-h-[60px]"
                              />
                              {exp.bullets.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() =>
                                    removeBullet(exp.id, bulletIndex)
                                  }
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Add Education, Projects, Skills sections similarly... */}
            </div>
          </div>

          {/* ========================================
              RIGHT: LIVE PREVIEW
          ======================================== */}
          <div className="h-screen overflow-y-auto bg-gray-100 p-8 sticky top-0">
            <div className="flex justify-center">
              <JakeRyanResume data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
