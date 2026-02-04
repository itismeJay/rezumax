"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  ChevronUp,
  Eye,
  EyeOff,
  Pencil,
  Plus,
  Trash2,
  GripVertical,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Single education entry props
interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  location: string;
  startDate: string;
  graduateDate: string;
  gpa?: string;
}

// Props for the EducationInfoSection component
interface EducationInfoSectionProps {
  educationInfo: EducationEntry[];
  onChange: (updated: EducationEntry[]) => void;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  sectionName?: string; // 👈 Prop from parent
  onSectionNameChange?: (name: string) => void; // 👈 Prop from parent
}

export function EducationInfoSection({
  educationInfo,
  onChange,
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName, // 👈 Rename to avoid conflict
  onSectionNameChange, // 👈 NEW: Add this to destructuring
}: EducationInfoSectionProps) {
  const [entries, setEntries] = useState<EducationEntry[]>(educationInfo);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState<boolean>(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);

  // 👇 CHANGED: Derive from prop or use default
  const sectionName = externalSectionName || "Education";

  // 👇 KEEP: Still need temp state for the input field
  const [tempSectionName, setTempSectionName] = useState(sectionName);

  // Sync entries state when educationInfo prop changes
  useEffect(() => {
    setEntries(educationInfo);
  }, [educationInfo]);

  // Sync visible state with external prop
  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  // 👇 NEW: Sync tempSectionName when sectionName changes
  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  // Add a new education entry
  const handleAddEntry = () => {
    const newEntry: EducationEntry = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      location: "",
      startDate: "",
      graduateDate: "",
      gpa: "",
    };

    const updated = [...entries, newEntry];
    setEntries(updated);
    onChange(updated);
  };

  // Remove an education entry
  const handleRemoveEntry = (id: string) => {
    if (entries.length <= 1) {
      return;
    }
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    onChange(updated);
  };

  // Update a specific field in an entry
  const handleFieldChange = (
    id: string,
    field: keyof EducationEntry,
    value: string,
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
    setEntries(updated);
    onChange(updated);
  };

  // Generate year range (from 1950 to current year + 10)
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1950 + 11 },
    (_, i) => currentYear - i + 10,
  );

  const months = [
    { value: "Jan", label: "January" },
    { value: "Feb", label: "February" },
    { value: "Mar", label: "March" },
    { value: "Apr", label: "April" },
    { value: "May", label: "May" },
    { value: "Jun", label: "June" },
    { value: "Jul", label: "July" },
    { value: "Aug", label: "August" },
    { value: "Sep", label: "September" },
    { value: "Oct", label: "October" },
    { value: "Nov", label: "November" },
    { value: "Dec", label: "December" },
  ];

  // Parse existing date to get month and year
  const parseDateParts = (dateStr: string): { month: string; year: string } => {
    if (!dateStr) return { month: "", year: "" };
    const parts = dateStr.split(" ");
    return {
      month: parts[0] || "",
      year: parts[1] || "",
    };
  };

  // Handle month/year change
  const handleMonthYearChange = (
    id: string,
    field: "startDate" | "graduateDate",
    month: string,
    year: string,
  ) => {
    if (month && year) {
      const formattedDate = `${month} ${year}`;
      handleFieldChange(id, field, formattedDate);
    }
  };

  // 👇 CHANGED: Handle rename section
  const handleStartRename = () => {
    setTempSectionName(sectionName); // Use current sectionName
    setIsRenamingSection(true);
  };

  const handleConfirmRename = () => {
    // 👇 CHANGED: Call parent callback
    if (onSectionNameChange) {
      onSectionNameChange(tempSectionName);
    }
    setIsRenamingSection(false);
  };

  const handleCancelRename = () => {
    setTempSectionName(sectionName); // Revert to current sectionName
    setIsRenamingSection(false);
  };

  // Handle visibility toggle
  const handleToggleVisibility = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    if (onVisibilityChange) {
      onVisibilityChange(newVisible);
    }
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
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
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
        <CardContent className="px-5 pb-5 space-y-6">
          {entries.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-lg border-2 border-dashed border-muted-foreground/25">
              <p className="text-sm text-muted-foreground mb-2 font-medium">
                No education entries yet
              </p>
              <p className="text-xs text-muted-foreground">
                Click "Add Education" below to get started
              </p>
            </div>
          ) : (
            entries.map((entry, index) => {
              const startParts = parseDateParts(entry.startDate);
              const gradParts = parseDateParts(entry.graduateDate);

              return (
                <div
                  key={entry.id}
                  className="space-y-4 p-4 rounded-lg border border-border bg-muted/20 relative"
                >
                  {/* Delete Button */}
                  {entries.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveEntry(entry.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}

                  {/* School */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      School / University
                    </Label>
                    <Input
                      value={entry.school}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "school", e.target.value)
                      }
                      placeholder="e.g., Massachusetts Institute of Technology"
                      className="h-10"
                    />
                  </div>

                  {/* Degree */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground font-medium">
                      Degree & Major
                    </Label>
                    <Input
                      value={entry.degree}
                      onChange={(e) =>
                        handleFieldChange(entry.id, "degree", e.target.value)
                      }
                      placeholder="e.g., Bachelor of Science in Computer Science"
                      className="h-10"
                    />
                  </div>

                  {/* Location & GPA Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-medium">
                        Location
                      </Label>
                      <Input
                        value={entry.location}
                        onChange={(e) =>
                          handleFieldChange(
                            entry.id,
                            "location",
                            e.target.value,
                          )
                        }
                        placeholder="e.g., Cambridge, MA"
                        className="h-10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-medium">
                        GPA (Optional)
                      </Label>
                      <Input
                        value={entry.gpa || ""}
                        onChange={(e) =>
                          handleFieldChange(entry.id, "gpa", e.target.value)
                        }
                        placeholder="e.g., 3.9/4.0"
                        className="h-10"
                      />
                    </div>
                  </div>

                  {/* Start Date - Month & Year Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-medium">
                        Start Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-10 justify-start text-left font-normal",
                              !entry.startDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {entry.startDate || "Select start date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" align="start">
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground">
                                Month
                              </Label>
                              <Select
                                value={startParts.month}
                                onValueChange={(month) =>
                                  handleMonthYearChange(
                                    entry.id,
                                    "startDate",
                                    month,
                                    startParts.year,
                                  )
                                }
                              >
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                                <SelectContent>
                                  {months.map((month) => (
                                    <SelectItem
                                      key={month.value}
                                      value={month.value}
                                    >
                                      {month.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground">
                                Year
                              </Label>
                              <Select
                                value={startParts.year}
                                onValueChange={(year) =>
                                  handleMonthYearChange(
                                    entry.id,
                                    "startDate",
                                    startParts.month,
                                    year,
                                  )
                                }
                              >
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                  {years.map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>

                    {/* Graduation Date - Month & Year Dropdowns */}
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground font-medium">
                        Graduation Date
                      </Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full h-10 justify-start text-left font-normal",
                              !entry.graduateDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {entry.graduateDate || "Select graduation date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-4" align="start">
                          <div className="space-y-3">
                            <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground">
                                Month
                              </Label>
                              <Select
                                value={gradParts.month}
                                onValueChange={(month) =>
                                  handleMonthYearChange(
                                    entry.id,
                                    "graduateDate",
                                    month,
                                    gradParts.year,
                                  )
                                }
                              >
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue placeholder="Select month" />
                                </SelectTrigger>
                                <SelectContent>
                                  {months.map((month) => (
                                    <SelectItem
                                      key={month.value}
                                      value={month.value}
                                    >
                                      {month.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label className="text-xs text-muted-foreground">
                                Year
                              </Label>
                              <Select
                                value={gradParts.year}
                                onValueChange={(year) =>
                                  handleMonthYearChange(
                                    entry.id,
                                    "graduateDate",
                                    gradParts.month,
                                    year,
                                  )
                                }
                              >
                                <SelectTrigger className="w-[200px]">
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                  {years.map((year) => (
                                    <SelectItem
                                      key={year}
                                      value={year.toString()}
                                    >
                                      {year}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Entry Number Badge */}
                  <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                    {index + 1}
                  </div>
                </div>
              );
            })
          )}

          {/* Add Education Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full h-14 gap-3 border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-foreground"
            onClick={handleAddEntry}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-medium">Add Education</span>
          </Button>

          {/* Helper Tip */}
          <div className="mt-4 p-3 rounded-md bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">
              💡 <span className="font-medium">Pro tip:</span> Include your GPA
              if it's above 3.5, and list relevant coursework that matches the
              job requirements
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
