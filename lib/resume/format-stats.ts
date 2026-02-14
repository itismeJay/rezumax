// lib/format-stats.ts

import { FileText, Target, TrendingUp, Zap } from "lucide-react";
import type { DashboardStats, StatCardData } from "@/types/dashboard-stats";

/**
 * Format raw dashboard statistics for UI display
 *
 * Converts raw numbers into user-friendly stat cards with:
 * - Formatted values (e.g., "73%", "4")
 * - Descriptive change messages
 * - Appropriate icons
 *
 * @param stats - Raw statistics from database
 * @returns Array of formatted stat cards
 *
 * @example
 * const stats = { totalResumes: 4, avgScore: 73, ... };
 * const formatted = formatDashboardStats(stats);
 * // [{ label: "Total Resumes", value: "4", ... }]
 */
export function formatDashboardStats(stats: DashboardStats): StatCardData[] {
  return [
    // ==========================================
    // Total Resumes Card
    // ==========================================
    {
      label: "Total Resumes",
      value: stats.totalResumes.toString(),
      icon: FileText,
      change:
        stats.resumesThisWeek > 0
          ? `+${stats.resumesThisWeek} this week`
          : "No new resumes this week",
    },

    // ==========================================
    // Average Score Card
    // ==========================================
    {
      label: "Avg. Score",
      value: `${stats.avgScore}%`,
      icon: Target,
      change: formatScoreChange(stats.scoreChange),
    },

    // ==========================================
    // Applications Card (placeholder)
    // ==========================================
    {
      label: "Applications",
      value: stats.applications.toString(),
      icon: TrendingUp,
      change:
        stats.applicationsThisWeek > 0
          ? `+${stats.applicationsThisWeek} this week`
          : "No applications yet",
    },

    // ==========================================
    // AI Improvements Card (placeholder)
    // ==========================================
    {
      label: "AI Improvements",
      value: stats.aiImprovements.toString(),
      icon: Zap,
      change: "Coming soon",
    },
  ];
}

/**
 * Format score change message with sign
 *
 * @param change - Score difference from last month
 * @returns Formatted change message
 */
function formatScoreChange(change: number): string {
  if (change > 0) {
    return `+${change}% from last month`;
  } else if (change < 0) {
    return `${change}% from last month`;
  } else {
    return "No change from last month";
  }
}
