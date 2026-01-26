import { ResumeFromDB } from "@/types/resume-data";
import JakeRyanResume from "../templates/jake-ryan-template";

interface ResumePreviewProps {
  template: string;
  content: ResumeFromDB["content"];
  scale?: number;
}

export function ResumePreview({
  template,
  content,
  scale = 1,
}: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (template) {
      case "jake-ryan":
        return <JakeRyanResume data={content} />;

      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-muted-foreground">
              Resume preview will appear here
            </p>
          </div>
        );
    }
  };

  return (
    <div
      className="transform-gpu transition-transform duration-200 origin-top"
      style={{ transform: `scale(${scale})`, width: "100%" }}
    >
      {renderTemplate()}
    </div>
  );
}
