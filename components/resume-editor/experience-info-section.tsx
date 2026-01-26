import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

// ✅ Define just the prop type you need
interface ExperienceInfoSectionProps {
  experienceInfo: {
    id: string;
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }[];
}
export function ExperienceInfoSection({
  experienceInfo,
}: ExperienceInfoSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-1 pt-2 px-5">
        <h3 className="font-semibold text-base">Experience</h3>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Position</Label>
            <Input
              placeholder="Undergraduate Research Assistant"
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Company</Label>
            <Input placeholder="Texas A&M University" className="h-10" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Location</Label>
              <Input placeholder="College Station, TX" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Dates</Label>
              <Input placeholder="June 2020 - Present" className="h-10" />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Achievements (bullet points)
            </Label>
            <Textarea
              placeholder="• Developed a REST API using FastAPI and PostgreSQL&#10;• Developed a full-stack web application using Flask, React, PostgreSQL and Docker"
              className="min-h-[100px] text-sm resize-none"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
