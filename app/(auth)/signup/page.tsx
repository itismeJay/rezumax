// app/(auth)/signup/page.tsx
import SignUpForm from "@/components/forms/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - DevResumeAI",
  description:
    "Create a DevResumeAI account to start building and optimizing your resumes.",
};

export default function SignUpPage() {
  return <SignUpForm />;
}
