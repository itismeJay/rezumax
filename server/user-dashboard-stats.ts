/**
 * Get dashboard statistics for a user
 *
 * Calculates:
 * - Total number of resumes
 * - Average resume score
 * - Resumes created this week
 * - Score change from last month
 *
 * @param userId - The user's ID
 * @returns Dashboard statistics
 *
 * @example
 * const stats = await getUserDashboardStats(user.id);
 * // { totalResumes: 4, avgScore: 73, resumesThisWeek: 1, ... }
 */

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { resume } from "@/db/schema";
import { DashboardStats, ResumeStatsQuery } from "@/types/dashboard-stats";

export async function getUserDashboardStats(
  userId: string,
): Promise<DashboardStats> {
  try {
    // 1. Fetch all user resumes with minimal data
    const userResumes: ResumeStatsQuery[] = await db
      .select({
        id: resume.id,
        score: resume.score,
        createdAt: resume.createdAt,
      })
      .from(resume)
      .where(eq(resume.userId, userId));

    // 2. Calculate total resumes
    const totalResumes = userResumes.length;

    // 3. Calculate average score
    const resumeWithScore = userResumes.filter((r) => r.score !== null);
    const avgScore =
      resumeWithScore.length > 0
        ? Math.round(
            resumeWithScore.reduce((sum, r) => sum + (r.score || 0), 0) /
              resumeWithScore.length,
          )
        : 0;

    // ==========================================
    // 4. Calculate resumes created this week
    // ==========================================
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const resumesThisWeek = userResumes.filter(
      (r) => new Date(r.createdAt) >= oneWeekAgo,
    ).length;

    // ==========================================
    // 5. Calculate score change from last month
    // ==========================================

    // Define time ranges
    const now = new Date();
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const twoMonthsAgo = new Date(now);
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    // Get last month's resumes
    const lastMonthResumes = userResumes.filter((r) => {
      const createdDate = new Date(r.createdAt);
      return createdDate >= twoMonthsAgo && createdDate < oneMonthAgo;
    });

    // Calculate last month's average score
    const lastMonthResumesWithScores = lastMonthResumes.filter(
      (r) => r.score !== null,
    );
    const lastMonthAvgScore =
      lastMonthResumesWithScores.length > 0
        ? Math.round(
            lastMonthResumesWithScores.reduce(
              (sum, r) => sum + (r.score || 0),
              0,
            ) / lastMonthResumesWithScores.length,
          )
        : 0;

    // Calculate the change
    const scoreChange = avgScore - lastMonthAvgScore;

    // 6. Return all stats

    return {
      // Real data
      totalResumes,
      avgScore,
      resumesThisWeek,
      scoreChange,

      // Placeholder values for future features
      applications: 0,
      applicationsThisWeek: 0,
      aiImprovements: 0,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    // Return safe defaults on error
    return {
      totalResumes: 0,
      avgScore: 0,
      resumesThisWeek: 0,
      scoreChange: 0,
      applications: 0,
      applicationsThisWeek: 0,
      aiImprovements: 0,
    };
  }
}
