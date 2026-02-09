// app/edit/[resumeId]/summary-info-section.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  Eye,
  EyeOff,
  Pencil,
  GripVertical,
  Check,
  X,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Label } from "@/components/ui/label";

interface SummarySectionProps {
  summaryInfo: { summary: string };
  onChange: (updated: { summary: string }) => void;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  sectionName?: string;
  onSectionNameChange?: (name: string) => void;
}

export function SummaryInfoSection({
  summaryInfo,
  onChange,
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName,
  onSectionNameChange,
}: SummarySectionProps) {
  const [summary, setSummary] = useState(summaryInfo.summary || "");
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const sectionName = externalSectionName || "Professional Summary";
  const [tempSectionName, setTempSectionName] = useState(sectionName);

  useEffect(() => {
    setSummary(summaryInfo.summary || "");
  }, [summaryInfo]);

  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  const handleSummaryChange = (value: string) => {
    setSummary(value);
    onChange({ summary: value });
  };

  const handleToggleVisibility = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    if (onVisibilityChange) {
      onVisibilityChange(newVisible);
    }
  };

  const handleStartRename = () => {
    setTempSectionName(sectionName);
    setIsRenamingSection(true);
  };

  const handleConfirmRename = () => {
    if (onSectionNameChange) {
      onSectionNameChange(tempSectionName);
    }
    setIsRenamingSection(false);
  };

  const handleCancelRename = () => {
    setTempSectionName(sectionName);
    setIsRenamingSection(false);
  };

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      // TODO: Replace with actual AI API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const generated = `Results-driven professional with proven expertise in delivering impactful solutions. Combines technical proficiency with strategic thinking to drive measurable business outcomes. Demonstrated ability to lead cross-functional teams and execute complex projects successfully.`;

      handleSummaryChange(generated);
    } catch (error) {
      console.error("Failed to generate summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card
      className={`border border-border shadow-none ${!visible ? "opacity-50" : ""}`}
    >
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />

            {isRenamingSection ? (
              <input
                value={tempSectionName}
                onChange={(e) => setTempSectionName(e.target.value)}
                autoFocus
                className="h-7 w-64 text-base font-semibold p-1 border rounded"
              />
            ) : (
              <h3 className="font-semibold text-base">{sectionName}</h3>
            )}

            {!isRenamingSection ? (
              <Pencil
                className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={handleStartRename}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4 text-green-500 cursor-pointer"
                  onClick={handleConfirmRename}
                />
                <X
                  className="w-4 h-4 text-red-500 cursor-pointer"
                  onClick={handleCancelRename}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            {visible ? (
              <Eye
                className="w-4 h-4 cursor-pointer hover:text-foreground"
                onClick={handleToggleVisibility}
              />
            ) : (
              <EyeOff
                className="w-4 h-4 cursor-pointer hover:text-foreground"
                onClick={handleToggleVisibility}
              />
            )}

            <ChevronUp
              className={`w-4 h-4 cursor-pointer hover:text-foreground transition-all ${collapsed ? "rotate-180" : ""}`}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </CardHeader>

      {!collapsed && (
        <CardContent className="px-5 pb-5 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground font-medium">
                Professional Summary
              </Label>
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleGenerateSummary}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate with AI
                  </>
                )}
              </Button>
            </div>

            <Textarea
              placeholder="A brief professional summary highlighting your key strengths, experience, and career goals (2-4 sentences recommended)"
              className="min-h-[120px] text-sm resize-none"
              value={summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
            />
          </div>

          <div className="p-3 rounded-md bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">
              💡 <span className="font-medium">Pro tip:</span> Keep it concise
              (50-100 words). Focus on your unique value proposition and
              measurable achievements.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
