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
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Template } from "@/types/template";
import { templates } from "@/constants/modals/template-selection";

interface TemplateSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (templateId: string) => void;
}

export function TemplateSelectionModal({
  open,
  onOpenChange,
  onSelectTemplate,
}: TemplateSelectionModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const selectedTemplateData: Template | undefined = templates.find(
    (t) => t.id === selectedTemplate
  );

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onSelectTemplate(selectedTemplate);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] w-[1100px] h-[90vh] p-0 gap-0 flex overflow-hidden">
        {/* Left Side - Preview */}
        <div className="flex-1 min-w-0 bg-muted/30 p-8 flex flex-col items-center justify-center overflow-auto">
          {selectedTemplateData ? (
            <img
              src={selectedTemplateData.thumbnail}
              alt={selectedTemplateData.name}
              className="h-[70vh] max-h-[85vh] w-auto sm:h-[75vh] md:h-auto md:w-full md:max-w-[420px] rounded-lg shadow-2xl border border-border object-cover"
            />
          ) : (
            <div className="w-[420px] aspect-[8.5/11] rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <p>Select a template to preview</p>
            </div>
          )}

          {selectedTemplateData && (
            <div className="mt-4 sm:mt-6 text-center px-4">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                {selectedTemplateData.name}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-md">
                {selectedTemplateData.description}
              </p>
            </div>
          )}
        </div>

        {/* Right Side - Template Selection */}
        <div className="w-[380px] shrink-0 border-l border-border p-6 flex flex-col bg-background overflow-y-auto">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-bold">
              Select Template
            </DialogTitle>
            <DialogDescription>Choose your preferred style</DialogDescription>
          </DialogHeader>

          {/* Template Thumbnails */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              All Templates
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template.id)}
                  className={cn(
                    "relative aspect-[8.5/11] rounded-md overflow-hidden border-2 transition-all hover:scale-105",
                    selectedTemplate === template.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
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
              disabled={!selectedTemplate}
              className="flex-1 gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Apply Template
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
