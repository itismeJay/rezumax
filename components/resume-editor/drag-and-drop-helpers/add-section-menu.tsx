// components/resume-editor/add-section-menu.tsx
"use client";

import { useState } from "react";
import {
  Plus,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  BookOpen,
  Users,
  Globe,
  Heart,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SectionType } from "@/types/resume-data";
import { cn } from "@/lib/utils";

interface AddSectionMenuProps {
  existingSections: SectionType[];
  onAddSection: (type: SectionType) => void;
}

// Map icons for the sections
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap,
  Briefcase,
  FolderGit2,
  Award,
  BookOpen,
  Users,
  Globe,
  Heart,
};

export function AddSectionMenu({
  existingSections,
  onAddSection,
}: AddSectionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const sectionOptions: Array<{
    type: SectionType;
    label: string;
    icon: keyof typeof iconMap;
    description: string;
  }> = [
    {
      type: "summary",
      label: "Professional Summary",
      icon: "BookOpen",
      description:
        "Brief overview of your professional background and key strengths",
    },
    {
      type: "certifications",
      label: "Certifications",
      icon: "Award",
      description: "Professional certifications and licenses you've earned",
    },
    {
      type: "leadership",
      label: "Leadership Experience",
      icon: "Users",
      description: "Leadership roles and team management experience",
    },
    {
      type: "publications",
      label: "Publications",
      icon: "BookOpen",
      description: "Published articles, papers, or books",
    },
    {
      type: "research",
      label: "Research",
      icon: "FolderGit2",
      description: "Research projects and academic work",
    },
    {
      type: "volunteer",
      label: "Volunteer Work",
      icon: "Heart",
      description: "Community service and volunteer activities",
    },
    {
      type: "languages",
      label: "Languages",
      icon: "Globe",
      description: "Languages you speak and proficiency levels",
    },
    {
      type: "awards",
      label: "Awards & Honors",
      icon: "Award",
      description: "Recognition and achievements you've received",
    },
    {
      type: "interests",
      label: "Interests",
      icon: "Heart",
      description: "Personal interests and hobbies",
    },
  ];

  const availableSections = sectionOptions.filter(
    (option) => !existingSections.includes(option.type),
  );

  const handleAddSection = (type: SectionType) => {
    onAddSection(type);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full h-14 gap-3 border-2 border-dashed border-muted-foreground/25",
              "hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 ease-in-out",
              "text-muted-foreground hover:text-foreground",
            )}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted transition-all duration-300 ease-in-out group-hover:bg-primary/10">
              <Plus className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:rotate-90" />
            </div>
            <span className="font-medium">Add New Section</span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[700px] max-h-[85vh] p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-2xl font-semibold">
                  Add New Section
                </DialogTitle>
                <DialogDescription className="mt-1.5">
                  Choose a section to add to your resume
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="px-6 pb-6">
            <div className="max-h-[calc(85vh-160px)] overflow-y-auto pr-2 -mr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {availableSections.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 transition-transform duration-500 ease-out hover:scale-110">
                    <Award className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    All available sections have been added
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    You're using all the sections we offer!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {availableSections.map((section, index) => {
                    const Icon = iconMap[section.icon];
                    return (
                      <button
                        key={section.type}
                        onClick={() => handleAddSection(section.type)}
                        className="w-full flex items-start gap-4 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all duration-300 ease-out cursor-pointer text-left group hover:shadow-lg transform hover:-translate-y-0.5"
                        style={{
                          animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
                        }}
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-muted group-hover:bg-primary/10 transition-all duration-300 ease-out shrink-0 group-hover:scale-110">
                          {Icon && (
                            <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 ease-out" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors duration-300 ease-out">
                            {section.label}
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                            {section.description}
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-300 ease-out shrink-0 mt-1 opacity-0 group-hover:opacity-100 transform group-hover:rotate-90" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}</style>
        </DialogContent>
      </Dialog>
    </div>
  );
}
