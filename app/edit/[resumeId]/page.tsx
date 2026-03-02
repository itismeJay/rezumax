// app/edit/[resumeId]/page.tsx
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { resume } from "@/db/schema";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { ResumeFromDB } from "@/types/resume-data";
import ResumeEditorWrapper from "@/components/resume-editor/resume-editor-wrapper";
import { CacheKeys } from "@/lib/cache/cacheKeys";
import { cacheWrapper } from "@/lib/cache/cacheService";

export default async function EditPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // ✅ cacheWrapper replaces the raw db query
  // "Need data? → use cacheWrapper" ← your rule
  const resumeData = await cacheWrapper(
    CacheKeys.resume.single(resumeId), // key: "resume:abc123"
    () =>
      // fetchFn: runs only on cache miss
      db
        .select()
        .from(resume)
        .where(and(eq(resume.id, resumeId), eq(resume.userId, session.user.id)))
        .then((rows) => rows[0] ?? null), // return first row or null
    "resume.single", // strategy: 15 min TTL
  );

  if (!resumeData) {
    notFound();
  }

  const typedResumeData = resumeData as ResumeFromDB;

  return (
    <div>
      <ResumeEditorWrapper resumeData={typedResumeData} />
    </div>
  );
}
