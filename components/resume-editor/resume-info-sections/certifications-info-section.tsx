// components/resume-editor/certifications-section.tsx
"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
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
import { Calendar as CalendarIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface CertificationEntry {
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

interface CertificationsSectionProps {
  certificationsInfo: CertificationEntry[];
  onChange: (updated: CertificationEntry[]) => void;
}

export function CertificationsSection({
  certificationsInfo,
  onChange,
}: CertificationsSectionProps) {
  const [entries, setEntries] =
    useState<CertificationEntry[]>(certificationsInfo);

  useEffect(() => {
    setEntries(certificationsInfo);
  }, [certificationsInfo]);

  const handleAddEntry = () => {
    const newEntry: CertificationEntry = {
      name: "",
      issuer: "",
      date: "",
      credentialId: "",
    };

    const updated = [...entries, newEntry];
    setEntries(updated);
    onChange(updated);
  };

  const handleRemoveEntry = (index: number) => {
    if (entries.length <= 1) return;
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    onChange(updated);
  };

  const handleFieldChange = (
    index: number,
    field: keyof CertificationEntry,
    value: string,
  ) => {
    const updated = entries.map((entry, i) =>
      i === index ? { ...entry, [field]: value } : entry,
    );
    setEntries(updated);
    onChange(updated);
  };

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

  const parseDateParts = (dateStr: string): { month: string; year: string } => {
    if (!dateStr) return { month: "", year: "" };
    const parts = dateStr.split(" ");
    return {
      month: parts[0] || "",
      year: parts[1] || "",
    };
  };

  const handleMonthYearChange = (
    index: number,
    month: string,
    year: string,
  ) => {
    const currentValue = entries[index]?.date || "";
    const current = parseDateParts(currentValue);
    const formattedDate =
      `${month || current.month} ${year || current.year}`.trim();
    handleFieldChange(index, "date", formattedDate);
  };

  return (
    <div className="space-y-6">
      {entries.length === 0 ? (
        <div className="text-center py-8 px-4 rounded-lg border-2 border-dashed border-muted-foreground/25">
          <p className="text-sm text-muted-foreground mb-2 font-medium">
            No certifications yet
          </p>
          <p className="text-xs text-muted-foreground">
            Click "Add Certification" below to get started
          </p>
        </div>
      ) : (
        entries.map((entry, index) => {
          const dateParts = parseDateParts(entry.date);

          return (
            <div
              key={index}
              className="space-y-4 p-4 rounded-lg border border-border bg-muted/20 relative"
            >
              {entries.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => handleRemoveEntry(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Certification Name
                </Label>
                <Input
                  value={entry.name}
                  onChange={(e) =>
                    handleFieldChange(index, "name", e.target.value)
                  }
                  placeholder="e.g., AWS Certified Solutions Architect"
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Issuing Organization
                  </Label>
                  <Input
                    value={entry.issuer}
                    onChange={(e) =>
                      handleFieldChange(index, "issuer", e.target.value)
                    }
                    placeholder="e.g., Amazon Web Services"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Issue Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full h-10 justify-start text-left font-normal",
                          !entry.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {entry.date || "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-4" align="start">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label className="text-xs text-muted-foreground">
                            Month
                          </Label>
                          <Select
                            value={dateParts.month}
                            onValueChange={(month) =>
                              handleMonthYearChange(
                                index,
                                month,
                                dateParts.year,
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
                            value={dateParts.year}
                            onValueChange={(year) =>
                              handleMonthYearChange(
                                index,
                                dateParts.month,
                                year,
                              )
                            }
                          >
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px]">
                              {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
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

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Credential ID (Optional)
                </Label>
                <Input
                  value={entry.credentialId}
                  onChange={(e) =>
                    handleFieldChange(index, "credentialId", e.target.value)
                  }
                  placeholder="e.g., ABC123XYZ"
                  className="h-10"
                />
              </div>

              <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {index + 1}
              </div>
            </div>
          );
        })
      )}

      <Button
        type="button"
        variant="outline"
        className="w-full h-14 gap-3 border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 text-muted-foreground hover:text-foreground"
        onClick={handleAddEntry}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
          <Plus className="w-4 h-4" />
        </div>
        <span className="font-medium">Add Certification</span>
      </Button>

      <div className="mt-4 p-3 rounded-md bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground">
          💡 <span className="font-medium">Pro tip:</span> Include relevant
          certifications that align with your career goals and the positions
          you're targeting
        </p>
      </div>
    </div>
  );
}
