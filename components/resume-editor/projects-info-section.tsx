import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

// ✅ Define just the prop type you need
interface ProjectsInfoSectionProps {
  projectsInfo: {
    id: string;
    name: string;
    technologies: string;
    startDate?: string;
    endDate?: string;
    bullets: string[];
  }[];
}
export function ProjectsInfoSection({
  projectsInfo,
}: ProjectsInfoSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-1 pt-2 px-5">
        <h3 className="font-semibold text-base">Projects</h3>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Project Name
            </Label>
            <Input placeholder="Gitlytics" className="h-10" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Technologies
            </Label>
            <Input
              placeholder="Python, Flask, React, PostgreSQL, Docker"
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Description (bullet points)
            </Label>
            <Textarea
              placeholder="• Developed a full-stack web application using Flask serving a REST API with React as the frontend&#10;• Implemented GitHub OAuth to get data from user's repositories"
              className="min-h-[100px] text-sm resize-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
