// app/edit/[resumeId]/publications-info-section.tsx
"use client";

import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

interface PublicationEntry {
  id: string;
  title: string;
  authors: string;
  venue: string;
  date: string;
  doi: string;
  description: string;
}

interface PublicationsSectionProps {
  publicationsInfo: PublicationEntry[];
  onChange: (updated: PublicationEntry[]) => void;
  visible?: boolean;
  onVisibilityChange?: (visible: boolean) => void;
  sectionName?: string;
  onSectionNameChange?: (name: string) => void;
}

export function PublicationsInfoSection({
  publicationsInfo,
  onChange,
  visible: externalVisible,
  onVisibilityChange,
  sectionName: externalSectionName,
  onSectionNameChange,
}: PublicationsSectionProps) {
  const [entries, setEntries] = useState<PublicationEntry[]>(publicationsInfo);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(externalVisible ?? true);
  const [isRenamingSection, setIsRenamingSection] = useState(false);

  const sectionName = externalSectionName || "Publications";
  const [tempSectionName, setTempSectionName] = useState(sectionName);

  useEffect(() => {
    setEntries(publicationsInfo);
  }, [publicationsInfo]);

  useEffect(() => {
    if (externalVisible !== undefined) {
      setVisible(externalVisible);
    }
  }, [externalVisible]);

  useEffect(() => {
    setTempSectionName(sectionName);
  }, [sectionName]);

  const handleAddEntry = () => {
    const newEntry: PublicationEntry = {
      id: `pub-${Date.now()}`,
      title: "",
      authors: "",
      venue: "",
      date: "",
      doi: "",
      description: "",
    };
    const updated = [...entries, newEntry];
    setEntries(updated);
    onChange(updated);
  };

  const handleRemoveEntry = (id: string) => {
    if (entries.length <= 1) return;
    const updated = entries.filter((entry) => entry.id !== id);
    setEntries(updated);
    onChange(updated);
  };

  const handleFieldChange = (
    id: string,
    field: keyof PublicationEntry,
    value: string,
  ) => {
    const updated = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry,
    );
    setEntries(updated);
    onChange(updated);
  };

  const handleToggleVisibility = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    if (onVisibilityChange) {
      onVisibilityChange(newVisible);
    }
  };

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
                className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={handleStartRename}
              />
            ) : (
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4 text-green-500 cursor-pointer"
                  onClick={handleConfirmRename}
                />
                <X
                  className="w-4 h-4 text-red-500 cursor-pointer"
                  onClick={handleCancelRename}
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span className="text-xs">
              {entries.length}{" "}
              {entries.length === 1 ? "publication" : "publications"}
            </span>

            {visible ? (
              <Eye
                className="w-4 h-4 cursor-pointer hover:text-foreground"
                onClick={handleToggleVisibility}
              />
            ) : (
              <EyeOff
                className="w-4 h-4 cursor-pointer hover:text-foreground"
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

      {!collapsed && (
        <CardContent className="px-5 pb-5 space-y-6">
          {entries.map((entry, index) => (
            <div
              key={entry.id}
              className="space-y-4 p-4 rounded-lg border border-border bg-muted/20 relative"
            >
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

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Publication Title
                </Label>
                <Input
                  value={entry.title}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "title", e.target.value)
                  }
                  placeholder="e.g., Deep Learning Approaches to Protein Folding"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Authors
                </Label>
                <Input
                  value={entry.authors}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "authors", e.target.value)
                  }
                  placeholder="e.g., Smith, J., Doe, A., & Johnson, M."
                  className="h-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Venue / Journal
                  </Label>
                  <Input
                    value={entry.venue}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "venue", e.target.value)
                    }
                    placeholder="e.g., Nature Machine Intelligence"
                    className="h-10"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground font-medium">
                    Publication Date
                  </Label>
                  <Input
                    value={entry.date}
                    onChange={(e) =>
                      handleFieldChange(entry.id, "date", e.target.value)
                    }
                    placeholder="e.g., March 2024"
                    className="h-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  DOI / Link (Optional)
                </Label>
                <Input
                  value={entry.doi}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "doi", e.target.value)
                  }
                  placeholder="e.g., 10.1038/s42256-024-00001"
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-medium">
                  Brief Description (Optional)
                </Label>
                <Textarea
                  value={entry.description}
                  onChange={(e) =>
                    handleFieldChange(entry.id, "description", e.target.value)
                  }
                  placeholder="Brief summary of the publication's key findings or contributions..."
                  className="min-h-[80px] text-sm resize-none"
                />
              </div>

              <div className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                {index + 1}
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full h-14 gap-3 border-2 border-dashed"
            onClick={handleAddEntry}
          >
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
              <Plus className="w-4 h-4" />
            </div>
            <span className="font-medium">Add Publication</span>
          </Button>

          <div className="p-3 rounded-md bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">
              💡 <span className="font-medium">Pro tip:</span> List publications
              in reverse chronological order. Include conference papers, journal
              articles, and preprints.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
