"use server";
import { auth } from "@/lib/auth";

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
    // Check if the error is because the email is not verified
    if (
      error.status === 403 &&
      error.message?.toLowerCase().includes("verify")
    ) {
      return {
        success: false,
        message: "Please verify your email address before signing in.",
        unverified: true, // optional flag for frontend
      };
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
  password: string
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
