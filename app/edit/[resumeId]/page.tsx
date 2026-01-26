// app/edit/[resumeId]/page.tsx
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { eq, and } from "drizzle-orm";
import { resume } from "@/db/schema";
import { redirect, notFound } from "next/navigation";
import { headers } from "next/headers";
import { ResumeFromDB } from "@/types/resume-data";
import ResumeEditorWrapper from "@/components/resume-editor/resume-editor-wrapper";

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

  const [resumeData] = await db
    .select()
    .from(resume)
    .where(and(eq(resume.id, resumeId), eq(resume.userId, session.user.id)));

  if (!resumeData) {
    notFound();
  }

  // ✅ Cast the content to your ResumeFromDB type
  const ResumeData = resumeData as ResumeFromDB;

  return (
    <div>
      <ResumeEditorWrapper resumeData={ResumeData} />
    </div>
  );
}
