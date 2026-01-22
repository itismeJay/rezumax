// app/api/resumes/route.ts
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db/drizzle";
import { resume } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

// ✅ POST - Create resume (you already have this)
export async function POST(request: NextRequest) {
  try {
    console.log("📨 POST /api/resumes - Creating new resume");

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      console.log("Unauthorized");
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 },
      );
    }

    const currentUser = session.user.id;
    const body = await request.json();

    console.log("📦 Template:", body.template);

    if (!body.template || !body.content) {
      return NextResponse.json(
        { error: "Template and content are required" },
        { status: 400 },
      );
    }

    console.log("💾 Inserting into database...");

    const [newResume] = await db
      .insert(resume)
      .values({
        userId: currentUser,
        template: body.template,
        content: body.content,
        title: body.title,
      })
      .returning();

    console.log("✅ Resume created:", newResume.id);

    return NextResponse.json(newResume, { status: 201 });
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "Failed to create resume" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log("📨 GET /api/resumes - Fetching user resumes");

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session || !session.user) {
      console.log("Unauthorized");
      return NextResponse.json(
        { error: "Unauthorized - Please log in" },
        { status: 401 },
      );
    }

    const userResumes = await db
      .select()
      .from(resume)
      .where(eq(resume.userId, session.user.id))
      .orderBy(desc(resume.createdAt));

    return NextResponse.json(userResumes);
  } catch (error) {
    console.error("❌ Error fetching resumes:", error);
    return NextResponse.json(
      { error: "Failed to fetch resumes" },
      { status: 500 },
    );
  }
}
