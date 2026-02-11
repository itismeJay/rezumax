// server/users.ts
"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { user, resume } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq, desc } from "drizzle-orm";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session.user;
};

export async function getCurrentUserWithData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!currentUser) {
    redirect("/login");
  }

  return currentUser;
}

// ✅ NEW: Get user's recent resumes
export async function getUserRecentResumes(userId: string, limit: number = 4) {
  try {
    // Get current session
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      redirect("/login"); // or return [] if in API context
    }

    // ✅ Enforce authorization: session user must match requested userId
    if (session.user.id !== userId) {
      console.warn("Unauthorized attempt to fetch another user's resumes");
      redirect("/login"); // or return [] if in API context
    }

    const resumes = await db
      .select({
        id: resume.id,
        title: resume.title,
        score: resume.score,
        updatedAt: resume.updatedAt,
        createdAt: resume.createdAt,
      })
      .from(resume)
      .where(eq(resume.userId, userId))
      .orderBy(desc(resume.createdAt)) // Order by creation date
      .limit(limit);

    // Format the data to match ResumeCard props
    return resumes.map((r) => ({
      id: r.id,
      title: r.title,
      score: r.score || 0,
      lastUpdated: formatRelativeTime(r.updatedAt || r.createdAt),
      targetJob: undefined, // Optional field
    }));
  } catch (error) {
    console.error("Failed to fetch resumes:", error);
    return [];
  }
}

// Helper function for date formatting
function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInMs = now.getTime() - then.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  return `${Math.floor(diffInDays / 30)} months ago`;
}

export const signIn = async (email: string, password: string) => {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
    return { success: true, message: "Signed in successfully" };
  } catch (error: any) {
    if (error && typeof error === "object" && "code" in error) {
      const code = (error as { code: string }).code;

      if (code === auth.$ERROR_CODES.EMAIL_NOT_VERIFIED) {
        return {
          success: false,
          message: "Please verify your email address before signing in.",
          unverified: true,
        };
      }
    }

    if (
      error.status === 401 ||
      error.message?.toLowerCase().includes("invalid")
    ) {
      return { success: false, message: "Email or password is incorrect." };
    }

    return { success: false, message: error.message || "Sign in failed" };
  }
};

export const signUp = async (
  username: string,
  email: string,
  password: string,
) => {
  try {
    await auth.api.signUpEmail({
      body: {
        email: email,
        password: password,
        name: username,
      },
    });
    return { success: true, message: "Signed up successfully" };
  } catch (error) {
    return { success: false, message: "Sign up failed" };
  }
};
