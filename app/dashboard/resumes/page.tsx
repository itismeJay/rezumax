// app/dashboard/resumes/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { CreateResumeModal } from "@/components/modals/create-resume-modal";
import { CreateResumeButton } from "@/components/dashboard/create-resume-button";

// ==========================================
// Types
// ==========================================
interface Resume {
  id: string;
  title: string;
  score: number | null;
  createdAt: string; // <-- changed from Date
  updatedAt: string; // <-- changed from Date
  userId: string;
  template: string;
}

// ==========================================
// Skeleton Component
// ==========================================
function ResumeCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <Skeleton className="w-8 h-8 rounded-md" />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-4 w-12" />
      </div>

      <Skeleton className="h-1.5 w-full rounded-full" />

      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
}

// ==========================================
// Empty State Component
// ==========================================
function EmptyState({ onCreateClick }: { onCreateClick: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-muted p-4 mb-4">
        <Plus className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Get started by creating your first resume and take the next step in your
        career
      </p>
      <Button variant="gradient" className="gap-2" onClick={onCreateClick}>
        <Plus className="w-4 h-4" />
        Create Your First Resume
      </Button>
    </div>
  );
}

// ==========================================
// Main Component
// ==========================================
export default function ResumesPage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // ==========================================
  // Data Fetching
  // ==========================================
  useEffect(() => {
    async function fetchResumes() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/resumes");

        if (!res.ok) {
          throw new Error("Failed to fetch resumes");
        }

        const data = await res.json();
        setResumes(data);
      } catch (err) {
        console.error("Error fetching resumes:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchResumes();
  }, []);

  // ==========================================
  // Filtering Logic
  // ==========================================
  const filteredResumes = resumes.filter((resume) =>
    resume.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ==========================================
  // Render
  // ==========================================
  return (
    <div className="min-h-screen bg-background">
      <main className="p-4 lg:p-8 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                My Resumes
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and optimize your resumes
              </p>
            </div>

            <CreateResumeButton />
          </div>

          {/* Search & Filter Bar */}
          {resumes.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search resumes..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <p className="text-destructive text-sm font-medium">
                Error: {error}
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ResumeCardSkeleton key={index} />
              ))}
            </div>
          )}

          {/* Empty State: No resumes at all */}
          {!loading && !error && resumes.length === 0 && (
            <EmptyState onCreateClick={() => setShowDocumentModal(true)} />
          )}

          {/* Resumes Grid */}
          {!loading && !error && filteredResumes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredResumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  id={resume.id}
                  title={resume.title}
                  score={resume.score || 0}
                  lastUpdated={new Date(resume.updatedAt).toLocaleDateString()}
                />
              ))}
            </div>
          )}

          {/* No Search Results */}
          {!loading &&
            !error &&
            resumes.length > 0 &&
            filteredResumes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No resumes found matching "{searchQuery}"
                </p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
