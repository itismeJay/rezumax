// types/dashboard.ts

import { LucideIcon } from "lucide-react";

/**
 * Raw statistics data from database queries
 */
export interface DashboardStats {
  // Resume metrics
  //“What my backend/service calculates”
  totalResumes: number;
  avgScore: number;
  resumesThisWeek: number;
  scoreChange: number;

  // Future features (placeholders)
  applications: number;
  applicationsThisWeek: number;
  aiImprovements: number;
}

/**
 * Formatted stat card data for UI
 */
//“What the UI needs to render cards”
export interface StatCardData {
  label: string;
  value: string;
  icon: LucideIcon;
  change: string;
}

/**
 * Resume data needed for stats calculation
 */
//“What the database gives me”
export interface ResumeStatsQuery {
  id: string;
  score: number | null;
  createdAt: Date;
}
