// app/dashboard/page.tsx

import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

import { ResumeCard } from "@/components/dashboard/resume-card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { getCurrentUserWithData, getUserRecentResumes } from "@/server/users"; // ✅ NEW: Import stats function
import { getUserDashboardStats } from "@/server/user-dashboard-stats";
import { formatDashboardStats } from "@/lib/format-stats"; // ✅ NEW: Import formatter
import MotionWrapper from "@/components/dashboard/wrapper/motion-wrapper";
import { CreateResumeButton } from "@/components/dashboard/create-resume-button";
import Link from "next/link";

/**
 * Dashboard page - Shows user overview and recent activity
 *
 * Features:
 * - Real-time statistics
 * - Recent resumes
 * - Quick actions
 */
export default async function DashboardPage() {
  // ==========================================
  // 1. Get authenticated user
  // ==========================================
  const user = await getCurrentUserWithData();

  // ==========================================
  // 2. Fetch data in parallel (performance!)
  // ==========================================
  const [recentResumes, statsData] = await Promise.all([
    getUserRecentResumes(user.id, 4),
    getUserDashboardStats(user.id),
  ]);

  // ==========================================
  // 3. Format stats for display
  // ==========================================
  const stats = formatDashboardStats(statsData);

  // ==========================================
  // 4. Render UI
  // ==========================================
  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <MotionWrapper>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl max-md:text-center font-bold">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your resumes and progress.
              </p>
            </div>

            <CreateResumeButton />
          </div>

          {/* Stats - ✅ Now using real data from database! */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
          {/* Recent Resumes */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Resumes</h2>

              <Link
                href="/dashboard/resumes"
                className="text-sm font-medium text-primary hover:underline transition-colors"
              >
                View All Resumes
              </Link>
            </div>

            {recentResumes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentResumes.map((resume) => (
                  <ResumeCard key={resume.id} {...resume} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <p className="text-muted-foreground mb-4">
                  No resumes yet. Create your first one to get started!
                </p>
                <CreateResumeButton />
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-xl border border-primary/20 p-6">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Boost your job search with these tools
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="inline-block">
                <CreateResumeButton variant="outline" size="sm" />
              </div>

              <Button variant="outline" size="sm" className="gap-2">
                <Zap className="w-4 h-4" />
                AI Resume Review
              </Button>
            </div>
          </div>
        </div>
      </MotionWrapper>
    </div>
  );
}
