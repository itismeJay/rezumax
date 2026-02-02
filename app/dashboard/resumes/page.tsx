"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { CreateResumeModal } from "@/components/modals/create-resume-modal";

export default function ResumesPage() {
  const router = useRouter();

  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDocumentModal, setShowDocumentModal] = useState(false);

  // Fetch resumes from API
  useEffect(() => {
    async function fetchResumes() {
      try {
        const res = await fetch("/api/resumes"); // call your GET API
        if (!res.ok) throw new Error("Failed to fetch resumes");

        const data = await res.json(); // ✅ converts JSON into JS objects
        setResumes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchResumes();
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (resumes.length === 0) return <p className="p-4">No resumes found.</p>;

  return (
    <div className="min-h-screen bg-background flex">
      <main className="p-4 lg:p-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                My Resumes
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage and optimize your resumes
              </p>
            </div>

            <Button
              variant="gradient"
              className="gap-2"
              onClick={() => setShowDocumentModal(true)}
            >
              <Plus className="w-4 h-4" />
              New Resume
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search resumes..." className="pl-10" />
            </div>

            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} {...resume} />
            ))}
          </div>
        </div>
      </main>

      {/* Modal for creating a new resume */}
      {/* <CreateResumeModal
        open={showDocumentModal}
        onOpenChange={setShowDocumentModal}
      /> */}
    </div>
  );
}
