// app/(auth)/login/page.tsx
import SignUpForm from "@/components/forms/signup-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - DevResumeAI",
  description: "Log in to your DevResumeAI account to manage your resumes.",
};

export default function LoginPage() {
  return <SignUpForm />;
}
