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
  Check,
  X,
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
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  sectionName?: string;
  onSectionNameChange?: (name: string) => void;
}

export function SkillsInfoSection({
  skillsInfo,
  onChange,
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName,
  onSectionNameChange,
}: SkillsInfoSectionProps) {
  const [skills, setSkills] = useState<SkillsData>(skillsInfo);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);
  const [tempSectionName, setTempSectionName] = useState("Technical Skills");
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const sectionName = externalSectionName || "Technical Skills";

  // Sync visibility state when external prop changes
  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  // Sync skills state when skillsInfo prop changes
  useEffect(() => {
    setSkills(skillsInfo);
  }, [skillsInfo]);

  // Sync tempSectionName with sectionName prop
  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

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

  const handleToggleVisibility = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    if (onVisibilityChange) {
      onVisibilityChange(newVisible);
    }
  };

  // Handle rename section
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

  return (
    <Card
      className={`border border-border shadow-none ${!visible ? "opacity-50" : ""}`}
    >
      {/* Header */}
      <CardHeader className="pb-3 pt-4 px-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab active:cursor-grabbing" />

            {isRenamingSection ? (
              <Input
                value={tempSectionName}
                onChange={(e) => setTempSectionName(e.target.value)}
                autoFocus
                className="h-7 w-40 text-base font-semibold p-1"
              />
            ) : (
              <h3 className="font-semibold text-base">{sectionName}</h3>
            )}

            {!isRenamingSection ? (
              <Pencil
                className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={handleStartRename}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4 text-green-500 cursor-pointer hover:text-green-600 transition-colors"
                  onClick={handleConfirmRename}
                />
                <X
                  className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-600 transition-colors"
                  onClick={handleCancelRename}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-xs">
              {filledFieldsCount}{" "}
              {filledFieldsCount === 1 ? "category" : "categories"}
            </span>
            {visible ? (
              <Eye
                className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
                onClick={handleToggleVisibility}
              />
            ) : (
              <EyeOff
                className="w-4 h-4 cursor-pointer hover:text-foreground transition-colors"
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

      {/* Content */}
      {!collapsed && (
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
                />
              </div>
            </div>

            {/* Optional Fields */}
            {/* {showOptionalFields && (
              <div className="space-y-4 p-4 rounded-lg border border-border bg-muted/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-1 w-1 rounded-full bg-primary/60"></div>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Additional Skills
                  </span>
                </div>

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
                  />
                </div>

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
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Other Skills
                  </Label>
                  <Input
                    placeholder="e.g., Agile, CI/CD, Test-Driven Development"
                    className="h-10"
                    value={skills.other || ""}
                    onChange={(e) => handleFieldChange("other", e.target.value)}
                  />
                </div>
              </div>
            )} */}

            {/* Toggle Optional Fields Button */}
            {/* <Button
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
            </Button> */}

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
