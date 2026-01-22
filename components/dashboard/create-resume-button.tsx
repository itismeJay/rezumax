// components/dashboard/create-resume-button.tsx
"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CreateResumeModal } from "@/components/modals/create-resume-modal";
import { TemplateSelectionModal } from "../modals/template-selection-modal";
import { toast } from "sonner";

interface CreateResumeButtonProps {
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}

export function CreateResumeButton({
  variant = "gradient",
  size = "default",
  className,
}: CreateResumeButtonProps = {}) {
  const router = useRouter();
  const [resumeModal, setResumeModal] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // 🔥 THIS IS THE KEY FUNCTION - CREATES RESUME IN DATABASE
  const handleSelectTemplate = async (templateId: string) => {
    setLoading(true);
    try {
      const response = await fetch("/api/resumes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          template: templateId,
          content: {
            personalInfo: {
              fullName: "",
              phone: "",
              email: "",
              linkedin: "",
              github: "",
              location: "",
              portfolio: "",
            },
            education: [
              {
                id: "edu-1",
                school: "",
                degree: "",
                location: "",
                startDate: "",
                endDate: "",
                gpa: "",
              },
            ],
            experience: [
              {
                id: "exp-1",
                position: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                bullets: ["", "", ""], // 3 bullets
              },
            ],
            projects: [
              {
                id: "proj-1",
                name: "",
                technologies: "",
                startDate: "",
                endDate: "",
                bullets: ["", "", ""], // 3 bullets
              },
            ],
            skills: {
              languages: "",
              frameworks: "",
              developerTools: "",
              libraries: "",
            },
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create resume");
      }

      const newResume = await response.json();
      console.log(newResume);
      toast.success("Resume created successfully!");
      setLoading(false);
      router.push(`/edit/${newResume.id}`);
    } catch (error) {
      console.error("Error creating resume:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create resume",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelectType = (type: "resume" | "cover-letter") => {
    console.log("Selected type:", type);
    if (type === "resume") {
      setOpen(false);
      setResumeModal(true);
    }
  };

  return (
    <>
      {/* Button to open "Create Resume / Cover Letter" modal */}
      <Button
        variant={variant}
        size={size}
        className={className || "gap-2 cursor-pointer"}
        onClick={() => setOpen(true)}
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" />
            Create New
          </>
        )}
      </Button>

      {/* Modal to select type (resume / cover letter) */}
      <CreateResumeModal
        open={open}
        onOpenChange={setOpen}
        onSelectType={handleSelectType}
      />

      {/* Modal to select template */}
      <TemplateSelectionModal
        open={resumeModal}
        onOpenChange={setResumeModal}
        onSelectTemplate={handleSelectTemplate}
        isLoading={loading}
      />
    </>
  );
}
