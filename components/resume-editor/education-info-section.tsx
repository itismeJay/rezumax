import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ✅ Define just the prop type you need
interface EducationInfoSectionProps {
  educationInfo: {
    id: string;
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }[];
}
export function EducationInfoSection({
  educationInfo,
}: EducationInfoSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-1 pt-2 px-5">
        <h3 className="font-semibold text-base">Education</h3>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">School</Label>
            <Input placeholder="Southwestern University" className="h-10" />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Degree</Label>
            <Input
              placeholder="Bachelor of Arts in Computer Science"
              className="h-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Location</Label>
              <Input placeholder="Georgetown, TX" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                GPA (Optional)
              </Label>
              <Input placeholder="3.8/4.0" className="h-10" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Start Date
              </Label>
              <Input placeholder="Aug. 2018" className="h-10" />
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">End Date</Label>
              <Input placeholder="May 2021" className="h-10" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
