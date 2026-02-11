"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FileText, Mail, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectType: (type: "resume" | "cover-letter") => void;
}

const documentTypes = [
  {
    id: "resume",
    title: "Resume",
    description:
      "Create an ATS-optimized resume that highlights your skills and experience",
    icon: FileText,
    available: true,
  },
  {
    id: "cover-letter",
    title: "Cover Letter",
    description: "Craft a compelling cover letter tailored to your target role",
    icon: Mail,
    available: false,
  },
] as const;

export function CreateResumeModal({
  open,

  onOpenChange,
  onSelectType,
}: NewDocumentModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Fixed width and full-screen responsiveness */}
      <DialogContent className="w-[95vw] max-w-[600px] sm:max-w-lg p-6 gap-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Create New Document
          </DialogTitle>
          <DialogDescription className="text-center">
            Choose what you'd like to create
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {documentTypes.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() =>
                type.available &&
                onSelectType(type.id as "resume" | "cover-letter")
              }
              disabled={!type.available}
              className={cn(
                "group relative flex items-center gap-4 p-5 rounded-xl border-2 transition-all duration-200 text-left",
                type.available
                  ? "border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
                  : "border-border/50 opacity-50 cursor-not-allowed",
              )}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center transition-colors",
                  type.available
                    ? "bg-primary/10 group-hover:bg-primary/20"
                    : "bg-muted",
                )}
              >
                <type.icon
                  className={cn(
                    "w-7 h-7",
                    type.available ? "text-primary" : "text-muted-foreground",
                  )}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg text-foreground">
                    {type.title}
                  </h3>
                  {!type.available && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                      Coming Soon
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {type.description}
                </p>
              </div>

              {type.available && (
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
