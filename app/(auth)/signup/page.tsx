// app/(auth)/signup/page.tsx
import SignUpForm from "@/components/forms/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - RezumaX", // ✅ Updated app name
  description:
    "Create a RezumaX account to start building and optimizing your resumes quickly with AI-powered suggestions.", // ✅ Updated description
  keywords: [
    "signup",
    "resume builder",
    "AI resume",
    "RezumaX",
    "resume optimizer",
    "job application",
  ],
};

export default function SignUpPage() {
  return <SignUpForm />;
}
