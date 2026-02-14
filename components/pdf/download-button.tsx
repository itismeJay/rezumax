"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ResumeData } from "@/types/resume-data";

interface DownloadPDFButtonProps {
  resumeId: string;
  fileName: string;
  resumeContent: ResumeData;
  template: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function DownloadPDFButton({
  resumeId,
  fileName,
  resumeContent,
  template,
  variant = "outline",
  size = "sm",
  className,
}: DownloadPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    const loadingToast = toast.loading("Generating PDF...");

    try {
      // Dynamically import to avoid Next.js SSR bundling issues with pako
      const { pdf } = await import("@react-pdf/renderer");
      const { JakeRyanPdfDocument } =
        await import("@/components/pdf/jake-ryan-pdf");

      // Build the PDF document based on the template
      let doc: React.ReactElement<any>;

      switch (template) {
        case "jake-ryan":
        default:
          doc = <JakeRyanPdfDocument data={resumeContent} />;
          break;
        // Add other templates here as needed
      }

      // Generate PDF blob
      const blob = await pdf(doc).toBlob();

      // Trigger download
      const finalFileName = fileName.endsWith(".pdf")
        ? fileName
        : `${fileName}.pdf`;

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = finalFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success("Resume downloaded!", { id: loadingToast });

      // Optional: Analytics tracking
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "resume_download", {
          resume_id: resumeId,
        });
      }
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to download. Please try again.", {
        id: loadingToast,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`${className || ""} gap-2`}
      onClick={handleDownload}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="hidden sm:inline">Generating...</span>
        </>
      ) : (
        <>
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export PDF</span>
        </>
      )}
    </Button>
  );
}
