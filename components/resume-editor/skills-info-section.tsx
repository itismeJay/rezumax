"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash2,
  GripVertical,
  Sparkles,
} from "lucide-react";

interface SkillsData {
  languages: string;
  frameworks: string;
  developerTools: string;
  libraries: string;
  databases?: string;
  cloudPlatforms?: string;
  other?: string;
}

interface SkillsInfoSectionProps {
  skillsInfo: SkillsData;
  onChange: (updated: SkillsData) => void;
}

export function SkillsInfoSection({
  skillsInfo,
  onChange,
}: SkillsInfoSectionProps) {
  const [skills, setSkills] = useState<SkillsData>(skillsInfo);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [sectionName, setSectionName] = useState("Technical Skills");

  // Sync skills state when skillsInfo prop changes
  useEffect(() => {
    setSkills(skillsInfo);
  }, [skillsInfo]);

  // Update skill field
  const handleFieldChange = (field: keyof SkillsData, value: string) => {
    const updated = { ...skills, [field]: value };
    setSkills(updated);
    onChange(updated);
  };

  // Count non-empty fields
  const filledFieldsCount = Object.values(skills).filter(
    (val) => val && val.trim(),
  ).length;

  return (
    <Card className="border border-border shadow-none">
      {/* Header */}
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />
            {isEditing ? (
              <Input
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                onBlur={() => setIsEditing(false)}
                autoFocus
                className="h-7 w-40 text-base font-semibold p-1"
              />
            ) : (
              <h3 className="font-semibold text-base">{sectionName}</h3>
            )}
            <Pencil
              className={`w-3.5 h-3.5 cursor-pointer transition-colors ${
                isEditing
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setIsEditing(!isEditing)}
              aria-label={isEditing ? "Exit edit mode" : "Enter edit mode"}
            />
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-xs">
              {filledFieldsCount}{" "}
              {filledFieldsCount === 1 ? "category" : "categories"}
            </span>
            {visible ? (
              <Eye
                className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setVisible(!visible)}
              />
            ) : (
              <EyeOff
                className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setVisible(!visible)}
              />
            )}
            <ChevronUp
              className={`w-4 h-4 cursor-pointer hover:text-foreground transition-all ${collapsed ? "rotate-180" : ""}`}
              onClick={() => setCollapsed(!collapsed)}
            />
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      {!collapsed && visible && (
        <CardContent className="px-5 pb-5">
          <div className="space-y-4">
            {/* Core Fields */}
            <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-1 w-1 rounded-full bg-primary"></div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Core Skills
                </span>
              </div>

              {/* Languages */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Programming Languages
                </Label>
                <Input
                  placeholder="e.g., JavaScript, Python, Java, TypeScript, Go"
                  className="h-10"
                  value={skills.languages}
                  onChange={(e) =>
                    handleFieldChange("languages", e.target.value)
                  }
                  disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>

              {/* Frameworks */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Frameworks & Libraries
                </Label>
                <Input
                  placeholder="e.g., React, Node.js, Express, Django, Spring Boot"
                  className="h-10"
                  value={skills.frameworks}
                  onChange={(e) =>
                    handleFieldChange("frameworks", e.target.value)
                  }
                  disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>

              {/* Developer Tools */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Developer Tools
                </Label>
                <Input
                  placeholder="e.g., Git, Docker, Kubernetes, Jenkins, VS Code"
                  className="h-10"
                  value={skills.developerTools}
                  onChange={(e) =>
                    handleFieldChange("developerTools", e.target.value)
                  }
                  disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>

              {/* Libraries */}
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Libraries & APIs
                </Label>
                <Input
                  placeholder="e.g., pandas, NumPy, REST APIs, GraphQL"
                  className="h-10"
                  value={skills.libraries}
                  onChange={(e) =>
                    handleFieldChange("libraries", e.target.value)
                  }
                  disabled={!isEditing}
                  readOnly={!isEditing}
                />
              </div>
            </div>

            {/* Optional Fields */}
            {showOptionalFields && (
              <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1 w-1 rounded-full bg-primary/60"></div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Additional Skills
                  </span>
                </div>

                {/* Databases */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Databases
                  </Label>
                  <Input
                    placeholder="e.g., PostgreSQL, MongoDB, Redis, MySQL"
                    className="h-10"
                    value={skills.databases || ""}
                    onChange={(e) =>
                      handleFieldChange("databases", e.target.value)
                    }
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>

                {/* Cloud Platforms */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Cloud Platforms & Services
                  </Label>
                  <Input
                    placeholder="e.g., AWS, Google Cloud, Azure, Heroku"
                    className="h-10"
                    value={skills.cloudPlatforms || ""}
                    onChange={(e) =>
                      handleFieldChange("cloudPlatforms", e.target.value)
                    }
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>

                {/* Other */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Other Skills
                  </Label>
                  <Input
                    placeholder="e.g., Agile, CI/CD, Test-Driven Development"
                    className="h-10"
                    value={skills.other || ""}
                    onChange={(e) => handleFieldChange("other", e.target.value)}
                    disabled={!isEditing}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            )}

            {/* Toggle Optional Fields Button */}
            {isEditing && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full gap-2 border-dashed"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
              >
                <Plus className="w-3.5 h-3.5" />
                {showOptionalFields
                  ? "Hide Optional Categories"
                  : "Add More Categories"}
              </Button>
            )}

            {/* Helper Tips */}
            <div className="space-y-2 mt-4">
              <div className="p-3 rounded-md bg-primary/5 border border-primary/20">
                <div className="flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-foreground mb-1">
                      Pro Tips for Skills Section:
                    </p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>
                        • List skills most relevant to your target job first
                      </li>
                      <li>• Group similar technologies together</li>
                      <li>
                        • Include proficiency levels if space permits (e.g.,
                        "Python (Advanced)")
                      </li>
                      <li>• Keep it concise - quality over quantity</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
