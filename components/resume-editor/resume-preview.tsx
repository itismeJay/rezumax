// app/edit/[resumeId]/resume-preview.tsx

import React from "react";
import { ResumeData } from "@/types/resume-data";
import JakeRyanResume from "../templates/jake-ryan-template";

interface ResumePreviewProps {
  template: string;
  content: ResumeData;
  scale?: number;
}

/**
 * Resume Preview Component
 *
 * TWO-LAYER STRUCTURE:
 * 1. Outer div: Handles zoom/scaling for preview
 * 2. Inner div (id="resume-preview-pdf"): Target for PDF (always 100% scale)
 */
export function ResumePreview({
  template,
  content,
  scale = 1,
}: ResumePreviewProps) {
  return (
    <div className="flex justify-center w-full">
      {/* Outer div: Controls zoom for visual preview */}
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top center",
          transition: "transform 0.2s ease-in-out",
        }}
      >
        {/* ✅ Inner div: PDF target (NOT affected by parent scale) */}
        <div id="resume-preview-pdf">
          {template === "jake-ryan" && <JakeRyanResume data={content} />}
          {/* Add other templates here when ready */}
        </div>
      </div>
    </div>
  );
}
