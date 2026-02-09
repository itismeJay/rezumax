// components/resume-editor/sortable-section-card.tsx
"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  GripVertical,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
  Check,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SortableSectionCardProps {
  id: string;
  title: string;
  visible: boolean;
  canDelete: boolean;
  onToggleVisibility: () => void;
  onDelete: () => void;
  onRename: (newTitle: string) => void;
  children: React.ReactNode;
}

export function SortableSectionCard({
  id,
  title,
  visible,
  canDelete,
  onToggleVisibility,
  onDelete,
  onRename,
  children,
}: SortableSectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  // Drag-and-drop hook
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      onRename(editedTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(title);
    setIsEditing(false);
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className={!visible ? "opacity-50" : ""}>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            {/* Drag Handle */}
            <button
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
            >
              <GripVertical className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Title or Edit Input */}
            {isEditing ? (
              <div className="flex-1 flex items-center gap-2">
                <Input
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSaveTitle();
                    if (e.key === "Escape") handleCancelEdit();
                  }}
                  className="h-8"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleSaveTitle}
                >
                  <Check className="w-4 h-4 text-green-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleCancelEdit}
                >
                  <X className="w-4 h-4 text-red-600" />
                </Button>
              </div>
            ) : (
              <>
                <h3 className="flex-1 font-semibold text-sm">{title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </Button>
              </>
            )}

            {/* Visibility Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onToggleVisibility}
            >
              {visible ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
            </Button>

            {/* Delete Button */}
            {canDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>{visible && children}</CardContent>
      </Card>
    </div>
  );
}
