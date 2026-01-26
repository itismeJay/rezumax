// app/edit/[resumeId]/page.tsx
"use client";
import Link from "next/link";
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
import { PersonalInfoSection } from "@/components/resume-editor/personal-info-section";
import { ResumeFromDB } from "@/types/resume-data";
import { EducationInfoSection } from "./education-info-section";
import { ExperienceInfoSection } from "./experience-info-section";
import { ProjectsInfoSection } from "./projects-info-section";
import { SkillsInfoSection } from "./skills-info-section";
import { useState } from "react";
import { ResumePreview } from "./resume-preview";

interface ResumeEditorWrapperProps {
  resumeData: ResumeFromDB;
}

export default function ResumeEditorWrapper({
  resumeData,
}: ResumeEditorWrapperProps) {
  const [resumeContent, setResumeContent] = useState(resumeData);
  const [isSaving, setIsSaving] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.75);

  console.log("ResumeData in Wrapper:", resumeData);

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen">
      {/* Modern Header */}
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
                Last saved Just now · Jake Ryan template
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-muted-foreground"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Import</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export PDF</span>
            </Button>
            <Button variant="default" size="sm" className="gap-2">
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Editor */}
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

          {/* Scrollable Form Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-5">
              {/* AI Target Job Card */}
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
                    className="min-h-[80px] text-sm resize-none bg-background/50"
                  />
                </CardContent>
              </Card>

              {/* Personal Information Card */}
              <PersonalInfoSection
                personalInfo={resumeData.content.personalInfo}
              />

              {/* Education Section */}
              <EducationInfoSection
                educationInfo={resumeData.content.education}
              />

              {/* Experience Section */}
              <ExperienceInfoSection
                experienceInfo={resumeData.content.experience}
              />

              {/* Projects Section */}
              <ProjectsInfoSection projectsInfo={resumeData.content.projects} />

              {/* Skills Section */}
              <SkillsInfoSection skillsInfo={resumeData.content.skills} />

              {/* Bottom Padding */}
              <div className="h-8" />
            </div>
          </div>
        </div>

        {/* Right Panel - Preview */}
        {/* Right Panel - Preview */}
        <div className="hidden lg:flex w-1/2 bg-muted/50 flex-col h-full overflow-hidden">
          {/* Preview Header with Zoom Controls */}
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
              content={resumeData.content}
              scale={zoomLevel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
