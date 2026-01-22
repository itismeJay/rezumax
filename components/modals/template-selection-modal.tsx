"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ResumeTemplate } from "@/constants/modals/template-selection";
import { ResumeTemplates } from "@/constants/modals/template-selection";
import Image from "next/image";

interface TemplateSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (templateId: string) => void;
  isLoading: boolean;
}

export function TemplateSelectionModal({
  open,
  onOpenChange,
  onSelectTemplate,
  isLoading,
}: TemplateSelectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const selectedTemplateData: ResumeTemplate | undefined = ResumeTemplates.find(
    (t) => t.id === selectedTemplate
  );

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return;
    onSelectTemplate(selectedTemplate);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          max-w-[95vw]
          w-[1100px]
          max-h-[90vh]
          p-0
          gap-0
          flex
          max-md:flex-col
          overflow-y-auto
        "
      >
        {/* LEFT: Resume Preview */}
        <div className="flex-1 min-w-0 bg-muted/30 py-20 p-6 flex flex-col items-center">
          {selectedTemplateData ? (
            <>
              <div className="relative w-full max-w-[420px] aspect-[8.5/11]">
                <Image
                  src={selectedTemplateData.image}
                  alt={selectedTemplateData.name}
                  fill
                  className="object-cover rounded-lg shadow-2xl border border-border"
                />
              </div>

              <div className="mt-4 text-center px-4">
                <h3 className="text-lg font-bold text-foreground">
                  {selectedTemplateData.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 max-w-md">
                  {selectedTemplateData.description}
                </p>
              </div>
            </>
          ) : (
            <div className="w-full max-w-[420px] aspect-[8.5/11] rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground">
              Select a template to preview
            </div>
          )}
        </div>

        {/* RIGHT: Template Selection */}
        <div className="w-full md:w-[380px] shrink-0 border-l border-border p-6 flex flex-col bg-background">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold">
              Select Template
            </DialogTitle>
            <DialogDescription>Choose your preferred style</DialogDescription>
          </DialogHeader>

          {/* Thumbnails */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              All Templates
            </h4>

            <div className="grid grid-cols-3 gap-3">
              {ResumeTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={cn(
                    "relative aspect-[8.5/11] w-full max-w-[120px] mx-auto rounded-md overflow-hidden border-2 transition-all",
                    selectedTemplate === template.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <Image
                    src={template.image}
                    alt={template.name}
                    fill
                    className="object-cover"
                  />

                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <div className="bg-primary rounded-full p-1">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          {selectedTemplateData && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">
                Features
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedTemplateData.features.map((feature) => (
                  <Badge key={feature} variant="secondary" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="flex-1" />

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 cursor-pointer"
            >
              Cancel
            </Button>

            <Button
              variant="gradient"
              onClick={handleApplyTemplate}
              disabled={!selectedTemplate || isLoading}
              className="flex-1 gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Apply Template"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
