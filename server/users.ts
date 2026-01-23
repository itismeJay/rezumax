"use server";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { user } from "@/db/schema";
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return session.user;
};

// 🐢 Slower - Get user with database data
export async function getCurrentUserWithData() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Drizzle ORM query
  const currentUser = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
  });

  if (!currentUser) {
    redirect("/login");
  }

  return currentUser;
}

export const signIn = async (email: string, password: string) => {
  try {
    // Attempt to sign in
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    // Success
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

    // Optional: handle invalid credentials
    if (
      error.status === 401 ||
      error.message?.toLowerCase().includes("invalid")
    ) {
      return { success: false, message: "Email or password is incorrect." };
    }

    // Fallback for other errors
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
