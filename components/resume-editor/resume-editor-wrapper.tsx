// app/edit/[resumeId]/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { useDebouncedCallback } from "use-debounce";

// Drag-and-drop imports
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

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

import {
  ResumeData,
  ResumeFromDB,
  ResumeSection,
  SectionType,
} from "@/types/resume-data";
import { PersonalInfoSection } from "@/components/resume-editor/resume-info-sections/personal-info-section";
import { EducationInfoSection } from "./resume-info-sections/education-info-section";
import { ExperienceInfoSection } from "./resume-info-sections/experience-info-section";
import { ProjectsInfoSection } from "./resume-info-sections/projects-info-section";
import { SkillsInfoSection } from "./resume-info-sections/skills-info-section";
import { ResumePreview } from "./resume-preview";

// NEW: Import helpers and new components
import {
  migrateToNewFormat,
  getDefaultSectionTitle,
  createDefaultSectionData,
} from "@/lib/resume-helpers";
import { AddSectionMenu } from "@/components/resume-editor/drag-and-drop-helpers/add-section-menu";
import { SortableSectionCard } from "./drag-and-drop-helpers/sortable-section-card";
import { CertificationsSection } from "./resume-info-sections/certifications-info-section";
import { SummaryInfoSection } from "./resume-info-sections/summary-info-section";
import { AwardsInfoSection } from "./resume-info-sections/awards-info-section";
import { LanguagesInfoSection } from "./resume-info-sections/languages-info-section";
import { LeadershipInfoSection } from "./resume-info-sections/leadership-info-section";
import { ResearchInfoSection } from "./resume-info-sections/research-info-section";
import { PublicationsInfoSection } from "./resume-info-sections/publications-info-section";
import { VolunteerInfoSection } from "./resume-info-sections/volunteer-info-section";
import { InterestsInfoSection } from "./resume-info-sections/interests-info-section";
import { CustomInfoSection } from "./resume-info-sections/custom-info-section";

interface ResumeEditorWrapperProps {
  resumeData: ResumeFromDB;
}

export default function ResumeEditorWrapper({
  resumeData,
}: ResumeEditorWrapperProps) {
  // ✅ STEP 6.1: Migrate old data to new format on load
  const [resumeContent, setResumeContent] = useState<ResumeData>(() => {
    const content = resumeData.content as any;
    return migrateToNewFormat(content);
  });

  const [saveStatus, setSaveStatus] = useState<"saving" | "saved" | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0.75);

  // ✅ STEP 6.2: Setup drag-and-drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 }, // Prevent accidental drags
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // ✅ STEP 6.3: Auto-save function
  const debouncedAutoSave = useDebouncedCallback(
    async (content: ResumeData) => {
      try {
        setSaveStatus("saving");
        const response = await fetch(`/api/resumes/${resumeData.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        if (!response.ok) throw new Error("Failed to save");
        console.log("✅ Auto-saved successfully");
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus(null), 2000);
      } catch (error) {
        console.error("❌ Auto-save failed:", error);
        toast.error("Failed to auto-save changes");
        setSaveStatus(null);
      }
    },
    1000,
  );

  // ✅ STEP 6.4: Personal info handler (unchanged)
  const handlePersonalInfoChange = (
    personalInfo: ResumeData["personalInfo"],
  ) => {
    const updated = { ...resumeContent, personalInfo };
    setResumeContent(updated);
    debouncedAutoSave(updated);
  };

  // ✅ STEP 6.5: GENERIC section data change handler (replaces 4 separate handlers!)
  const handleSectionDataChange = (sectionId: string, data: any) => {
    const updated = {
      ...resumeContent,
      sections: resumeContent.sections.map((section) =>
        section.id === sectionId ? { ...section, data } : section,
      ),
    };
    setResumeContent(updated);
    debouncedAutoSave(updated);
  };

  // ✅ STEP 6.6: Add new section
  const handleAddSection = (type: SectionType) => {
    const newSection: ResumeSection = {
      id: `${type}-${Date.now()}`, // Unique ID
      type,
      title: getDefaultSectionTitle(type),
      order: resumeContent.sections.length, // Add to end
      visible: true,
      data: createDefaultSectionData(type),
    };

    const updated = {
      ...resumeContent,
      sections: [...resumeContent.sections, newSection],
    };
    setResumeContent(updated);
    debouncedAutoSave(updated);
    toast.success(`Added ${getDefaultSectionTitle(type)}`);
  };

  // ✅ STEP 6.7: Delete section
  const handleDeleteSection = (sectionId: string) => {
    const updated = {
      ...resumeContent,
      sections: resumeContent.sections.filter((s) => s.id !== sectionId),
    };
    setResumeContent(updated);
    debouncedAutoSave(updated);
    toast.success("Section removed");
  };

  // ✅ STEP 6.8: Toggle visibility
  const handleToggleVisibility = (sectionId: string) => {
    const updated = {
      ...resumeContent,
      sections: resumeContent.sections.map((s) =>
        s.id === sectionId ? { ...s, visible: !s.visible } : s,
      ),
    };
    setResumeContent(updated);
    debouncedAutoSave(updated);
  };

  // ✅ STEP 6.9: Rename section
  const handleRenameSection = (sectionId: string, newTitle: string) => {
    const updated = {
      ...resumeContent,
      sections: resumeContent.sections.map((s) =>
        s.id === sectionId ? { ...s, title: newTitle } : s,
      ),
    };
    setResumeContent(updated);
    debouncedAutoSave(updated);
  };

  // ✅ STEP 6.10: Handle drag end (reorder sections)
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = resumeContent.sections.findIndex(
        (s) => s.id === active.id,
      );
      const newIndex = resumeContent.sections.findIndex(
        (s) => s.id === over.id,
      );

      const reordered = arrayMove(resumeContent.sections, oldIndex, newIndex);

      // Update order property
      const updated = {
        ...resumeContent,
        sections: reordered.map((s, index) => ({ ...s, order: index })),
      };

      setResumeContent(updated);
      debouncedAutoSave(updated);
    }
  };

  // ✅ STEP 6.11: Render correct form component based on section type with chrome callbacks
  const renderSectionForm = (section: ResumeSection) => {
    const onChange = (data: any) => handleSectionDataChange(section.id, data);

    // Common chrome props that will be passed to sections that support them
    const chromeProps = {
      sectionName: section.title,
      visible: section.visible,
      onVisibilityChange: () => handleToggleVisibility(section.id),
      onSectionNameChange: (newTitle: string) =>
        handleRenameSection(section.id, newTitle),
      onDeleteSection: () => handleDeleteSection(section.id),
      canDelete: resumeContent.sections.length > 1,
    };

    switch (section.type) {
      case "education":
        return (
          <EducationInfoSection
            educationInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "experience":
        return (
          <ExperienceInfoSection
            experienceInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "projects":
        return (
          <ProjectsInfoSection
            projectsInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "skills":
        return (
          <SkillsInfoSection
            skillsInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "certifications":
        return (
          <CertificationsSection
            certificationsInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "summary":
        return (
          <SummaryInfoSection
            summaryInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "awards":
        return (
          <AwardsInfoSection
            awardsInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "languages":
        return (
          <LanguagesInfoSection
            languagesInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "leadership":
        return (
          <LeadershipInfoSection
            leadershipInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "research":
        return (
          <ResearchInfoSection
            researchInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "publications":
        return (
          <PublicationsInfoSection
            publicationsInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "volunteer":
        return (
          <VolunteerInfoSection
            volunteerInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "interests":
        return (
          <InterestsInfoSection
            interestsInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      case "custom":
        return (
          <CustomInfoSection
            customInfo={section.data}
            onChange={onChange}
            {...chromeProps}
          />
        );
      default:
        return (
          <div className="text-sm text-muted-foreground">
            Form for {section.type} coming soon...
          </div>
        );
    }
  };

  // Get list of existing section types (for Add Section menu)
  const existingSectionTypes = resumeContent.sections.map((s) => s.type);

  // ✅ FIX 1: Manual save handler with debounce cancellation
  const handleSaveClick = async () => {
    // Cancel any pending auto-save to prevent race conditions
    debouncedAutoSave.cancel();

    setIsSaving(true);
    setSaveStatus("saving");
    try {
      const response = await fetch(`/api/resumes/${resumeData.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: resumeContent }),
      });
      if (!response.ok) throw new Error("Failed to save");
      setSaveStatus("saved");
      toast.success("Resume saved successfully!");
      setTimeout(() => setSaveStatus(null), 5000);
    } catch (error) {
      console.error("Save failed:", error);
      toast.error("Failed to save changes");
      setSaveStatus(null);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen">
      {/* Header - UNCHANGED */}
      <header className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between gap-4">
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
            <Button
              variant="default"
              size="sm"
              className="gap-2"
              onClick={handleSaveClick}
              disabled={isSaving}
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Editor */}
        <div className="w-full lg:w-1/2 flex flex-col border-r border-border bg-muted/30 h-full overflow-hidden">
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

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-5">
              {/* AI Tailoring Card - UNCHANGED */}
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

              {/* Personal Info - Always visible */}
              <PersonalInfoSection
                personalInfo={resumeContent.personalInfo}
                onChange={handlePersonalInfoChange}
              />

              {/* ✅ STEP 6.12: Dynamic sections with drag-and-drop */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={resumeContent.sections.map((s) => s.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {/* ✅ FIX 2: Non-mutating sort using spread operator */}
                  {[...resumeContent.sections]
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <SortableSectionCard
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        visible={section.visible}
                        canDelete={resumeContent.sections.length > 1}
                        onToggleVisibility={() =>
                          handleToggleVisibility(section.id)
                        }
                        onDelete={() => handleDeleteSection(section.id)}
                        onRename={(newTitle) =>
                          handleRenameSection(section.id, newTitle)
                        }
                      >
                        {renderSectionForm(section)}
                      </SortableSectionCard>
                    ))}
                </SortableContext>
              </DndContext>

              {/* ✅ STEP 6.13: Add Section Menu */}
              <AddSectionMenu
                existingSections={existingSectionTypes}
                onAddSection={handleAddSection}
              />

              <div className="h-8" />
            </div>
          </div>
        </div>

        {/* Right Panel: Preview - UNCHANGED */}
        <div className="hidden lg:flex w-1/2 bg-muted/50 flex-col h-full overflow-hidden">
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
          <div className="flex-1 overflow-auto py-5">
            <ResumePreview
              template={resumeData.template}
              content={resumeContent}
              scale={zoomLevel}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
