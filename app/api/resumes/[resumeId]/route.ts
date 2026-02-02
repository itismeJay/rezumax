// app/api/resumes/[resumeId]/route.ts
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import { resume } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// ✅ PATCH - Update resume content
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  try {
    // 1️⃣ Get resume ID from URL
    const { resumeId } = await params;

    // 2️⃣ Check authentication
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3️⃣ Get the data from request body
    const body = await request.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    console.log("💾 Saving resume:", resumeId);

    // 4️⃣ Update database
    const [updatedResume] = await db
      .update(resume)
      .set({
        content: content,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(resume.id, resumeId),
          eq(resume.userId, session.user.id), // Security: only update own resume
        ),
      )
      .returning();

    // 5️⃣ Check if update was successful
    if (!updatedResume) {
      return NextResponse.json(
        { error: "Resume not found or unauthorized" },
        { status: 404 },
      );
    }

    console.log("✅ Resume saved successfully");

    // 6️⃣ Revalidate the page cache (Next.js 15)
    revalidatePath(`/edit/${resumeId}`);

    // 7️⃣ Return success
    return NextResponse.json({
      success: true,
      message: "Resume saved successfully",
      updatedAt: updatedResume.updatedAt,
    });
  } catch (error) {
    console.error("❌ Error saving resume:", error);
    return NextResponse.json(
      { error: "Failed to save resume" },
      { status: 500 },
    );
  }
}
