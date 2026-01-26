import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ✅ Define just the prop type you need
interface PersonalInfoSectionProps {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    location?: string;
    portfolio?: string;
  };
}
export function PersonalInfoSection({
  personalInfo,
}: PersonalInfoSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-1 pt-2 px-5">
        <h3 className="font-semibold text-base">Personal Information</h3>
      </CardHeader>

      <CardContent className="px-5 pb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Full Name</Label>
            <Input placeholder="John Developer" className="h-10" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input placeholder="john@example.com" className="h-10" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Phone</Label>
            <Input placeholder="+1 (555) 123-4567" className="h-10" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Location</Label>
            <Input placeholder="San Francisco, CA" className="h-10" />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">LinkedIn</Label>
            <Input
              placeholder="linkedin.com/in/johndeveloper"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">GitHub</Label>
            <Input placeholder="github.com/johndeveloper" className="h-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
