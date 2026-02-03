// app/edit/[resumeId]/page.tsx
"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

import {
  ArrowLeft,
  Save,
  Download,
  ZoomIn,
  ZoomOut,
  Upload,
  FileText,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { ResumeData, ResumeFromDB } from "@/types/resume-data";

import { PersonalInfoSection } from "@/components/resume-editor/personal-info-section";
import { EducationInfoSection } from "./education-info-section";
import { ExperienceInfoSection } from "./experience-info-section";
import { ProjectsInfoSection } from "./projects-info-section";
import { SkillsInfoSection } from "./skills-info-section";
import { ResumePreview } from "./resume-preview";
import axios from "axios";

// ----------------------------------------------
// Props Interface
// ----------------------------------------------
interface ResumeEditorWrapperProps {
  resumeData: ResumeFromDB;
}

// ----------------------------------------------
// Main Component
// ----------------------------------------------
export default function ResumeEditorWrapper({
  resumeData,
}: ResumeEditorWrapperProps) {
  // --------------------------------------------
  // State
  // --------------------------------------------
  const [editableResume, setEditableResume] = useState(
    resumeData.content as ResumeData,
  );
  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState(0.75);

  // Ref to store debounced auto-save function for cancellation
  const debouncedAutoSaveRef = useRef<ReturnType<typeof useDebouncedCallback> | null>(null);

  // --------------------------------------------
  // Auto-save Function (Debounced)
  // --------------------------------------------
  const debouncedAutoSave = useDebouncedCallback(
    async (content: ResumeData) => {
      try {
        setSaveStatus("saving");

        const response = await fetch(`/api/resumes/${resumeData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) throw new Error("Failed to save");

        console.log("✅ Auto-saved successfully");
        setSaveStatus("saved");

        // Hide "Saved" indicator after 2 seconds
        setTimeout(() => setSaveStatus(null), 2000);
      } catch (error) {
        console.error("❌ Auto-save failed:", error);
        toast.error("Failed to auto-save changes");
        setSaveStatus(null);
      }
    },
    3000, // Wait 3 second after typing stops
  );

  // Store debounced function in ref for access in handleSaveClick
  debouncedAutoSaveRef.current = debouncedAutoSave;

  // --------------------------------------------
  // Handler for saving via button
  // --------------------------------------------
  const handleSaveClick = async () => {
    // Cancel any pending debounced auto-save to prevent race condition
    if (debouncedAutoSaveRef.current) {
      debouncedAutoSaveRef.current.cancel();
    }

    setIsSaving(true);
    setSaveStatus("saving");

    try {
      await axios.patch(`/api/resumes/${resumeData.id}`, {
        content: editableResume,
      });

      setSaveStatus("saved");
      toast.success("Resume saved successfully!");

      setTimeout(() => {
        setSaveStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  // --------------------------------------------
  // Handlers for Resume Sections
  // --------------------------------------------
  const handlePersonalInfoChange = (
    personalInfo: ResumeData["personalInfo"],
  ) => {
    const updatedResume = { ...editableResume, personalInfo };
    setEditableResume(updatedResume);
    debouncedAutoSave(updatedResume);
  };

  const handleEducationInfoChange = (
    educationInfo: ResumeData["education"],
  ) => {
    const updatedResume = { ...editableResume, education: educationInfo };
    setEditableResume(updatedResume);
    debouncedAutoSave(updatedResume);
  };

  const handleExperienceInfoChange = (
    experienceInfo: ResumeData["experience"],
  ) => {
    const updatedResume = { ...editableResume, experience: experienceInfo };
    setEditableResume(updatedResume);
    debouncedAutoSave(updatedResume);
  };
  const handleProjectsInfoSection = (projectsInfo: ResumeData["projects"]) => {
    const updatedResume = { ...editableResume, projects: projectsInfo };
    setEditableResume(updatedResume);
    debouncedAutoSave(updatedResume);
  };
  const handleSkillsInfoSection = (skillsInfo: ResumeData["skills"]) => {
    const updatedResume = { ...editableResume, skills: skillsInfo };
    setEditableResume(updatedResume);
    debouncedAutoSave(updatedResume);
  };
  // --------------------------------------------
  // Debug Logs
  // --------------------------------------------
  console.log("ResumeData in Wrapper:", resumeData);
  console.log("editableResume in Wrapper:", editableResume);

  // --------------------------------------------
  // JSX
  // --------------------------------------------
  return (
    <div className="min-h-screen bg-background flex flex-col h-screen">
      {/* -------------------------------- Header -------------------------------- */}
      <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
          {/* Left: Back + Title */}
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="shrink-0">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="min-w-0">
              <h1 className="text-base font-semibold text-foreground truncate">
                {resumeData.title || "Untitled Resume"}
              </h1>
              <p className="text-xs text-muted-foreground">
                {saveStatus === "saving" && "💾 Saving..."}
                {saveStatus === "saved" && "✓ All changes saved"}
                {!saveStatus && "Auto-saves as you type"}
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              className="gap-2 cursor-pointer"
              onClick={handleSaveClick}
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>
      </header>

      {/* -------------------------------- Main Content -------------------------------- */}
      <div className="flex-1 flex overflow-hidden">
        {/* ---------------- Left Panel: Editor ---------------- */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-border bg-muted/30 h-full overflow-hidden">
          {/* Panel Header */}
          <div className="flex-shrink-0 px-6 py-4 bg-background border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Resume Content</span>
              </div>
              <span className="text-xs text-muted-foreground">
                Drag sections to reorder
              </span>
            </div>
          </div>

          {/* Scrollable Form */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-5">
              {/* AI Tailoring Card */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader className="px-5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">AI Tailoring</h3>
                      <p className="text-xs text-muted-foreground">
                        Paste a job description to optimize your resume
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="px-5 pb-4">
                  <Textarea
                    placeholder="Paste job description here for AI-powered tailoring..."
                    className="min-h-[80px] text-sm resize-none bg-background/50 focus-visible:border-primary focus-visible:ring-primary/50"
                  />
                </CardContent>
              </Card>

              {/* Resume Sections */}
              <PersonalInfoSection
                personalInfo={editableResume.personalInfo}
                onChange={handlePersonalInfoChange}
              />
              <EducationInfoSection
                educationInfo={editableResume.education}
                onChange={handleEducationInfoChange}
              />
              <ExperienceInfoSection
                experienceInfo={editableResume.experience}
                onChange={handleExperienceInfoChange}
              />
              <ProjectsInfoSection
                projectsInfo={editableResume.projects}
                onChange={handleProjectsInfoSection}
              />
              <SkillsInfoSection
                skillsInfo={editableResume.skills}
                onChange={handleSkillsInfoSection}
              />

              <div className="h-8" />
            </div>
          </div>
        </div>

        {/* ---------------- Right Panel: Live Preview ---------------- */}
        <div className="hidden lg:flex w-1/2 bg-muted/50 flex-col h-full overflow-hidden">
          {/* Preview Header */}
          <div className="flex-shrink-0 px-6 py-3 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between">
            <span className="font-medium text-sm text-muted-foreground">
              Live Preview
            </span>
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  setZoomLevel((prev) => Math.max(prev - 0.05, 0.4))
                }
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-xs text-muted-foreground w-12 text-center font-mono">
                {Math.round(zoomLevel * 100)}%
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setZoomLevel((prev) => Math.min(prev + 0.05, 1))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto py-5">
            <ResumePreview
              template={resumeData.template}
              content={editableResume}
              scale={zoomLevel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
