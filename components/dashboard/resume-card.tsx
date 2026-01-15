"use client";

import Link from "next/link";
import {
  FileText,
  TrendingUp,
  Clock,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type ResumeCardProps = {
  id: string;
  title: string;
  score: number;
  lastUpdated: string;
  targetJob?: string;
};

export function ResumeCard({
  id,
  title,
  score,
  lastUpdated,
  targetJob,
}: ResumeCardProps) {
  const getScoreColor = (score: number) =>
    score >= 80
      ? "text-success bg-success/10"
      : score >= 60
      ? "text-warning bg-warning/10"
      : "text-destructive bg-destructive/10";

  const getScoreLabel = (score: number) =>
    score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs Work";

  return (
    <div className="group bg-card rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold group-hover:text-primary transition-colors">
              {title}
            </h3>
            {targetJob && (
              <p className="text-xs text-muted-foreground">
                {targetJob}
              </p>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="opacity-0 group-hover:opacity-100"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem>Download PDF</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Score */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "px-2.5 py-1 rounded-full text-xs font-medium",
              getScoreColor(score)
            )}
          >
            {score}%
          </span>
          <span className="text-xs text-muted-foreground">
            {getScoreLabel(score)}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <TrendingUp className="w-3.5 h-3.5 text-success" />
          +5%
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden mb-4">
        <div
          className={cn(
            "h-full rounded-full",
            score >= 80
              ? "bg-success"
              : score >= 60
              ? "bg-warning"
              : "bg-destructive"
          )}
          style={{ width: `${score}%` }}
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {lastUpdated}
        </div>

        <Link href={`/dashboard/resume/${id}`}>
          <Button variant="ghost" size="sm" className="text-primary">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
}
