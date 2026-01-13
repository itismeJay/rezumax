// components/dashboard/create-resume-button.tsx
"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { CreateResumeModal } from "@/components/modals/create-resume-modal";
import { TemplateSelectionModal } from "../modals/template-selection-modal";
import { ResumeData } from "@/types/resume-data";

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

  const handleResumeData = (resumeData: any) => {
    console.log(resumeData);
  };

  const handleSelectTemplate = (templateId: string) => {
    // Generate a unique ID for the new resume
    const resumeId = uuidv4();

    console.log("Selected template:", templateId);
    console.log("Generated resume ID:", resumeId);

    // Close the modal
    setResumeModal(false);

    // TODO: You can navigate to resume editor page with resumeId
    // router.push(`/dashboard/resume/${resumeId}`);
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
      >
        <Plus className="w-4 h-4" />
        Create New
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
      />
    </>
  );
}
