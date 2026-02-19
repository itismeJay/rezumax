// app/(auth)/signup/page.tsx
import SignUpForm from "@/components/forms/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Renhanced",
  description:
    "Create a Renhanced account to start building and optimizing your resumes quickly with AI-powered suggestions.",
  keywords: [
    "signup",
    "resume builder",
    "AI resume",
    "Renhanced",
    "resume optimizer",
    "job application",
  ],
};

export default function SignUpPage() {
  return <SignUpForm />;
}
