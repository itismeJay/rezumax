import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// ✅ Define just the prop type you need
interface SkillsInfoSectionProps {
  skillsInfo: {
    languages: string;
    frameworks: string;
    developerTools: string;
    libraries: string;
  };
}
export function SkillsInfoSection({ skillsInfo }: SkillsInfoSectionProps) {
  return (
    <Card>
      <CardHeader className="pb-1 pt-2 px-5">
        <h3 className="font-semibold text-base">Technical Skills</h3>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Languages</Label>
            <Input
              placeholder="Java, Python, C/C++, SQL, JavaScript, HTML/CSS, R"
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Frameworks</Label>
            <Input
              placeholder="React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI"
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Developer Tools
            </Label>
            <Input
              placeholder="Git, Docker, TravisCI, Google Cloud Platform, VS Code, PyCharm, IntelliJ"
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Libraries</Label>
            <Input placeholder="pandas, NumPy, Matplotlib" className="h-10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
