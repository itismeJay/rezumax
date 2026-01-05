// app/(auth)/login/page.tsx
import LoginForm from "@/components/forms/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - ResumaX",
  description: "Log in to your ResumaX account to manage your resumes.",
};

export default function LoginPage() {
  return <LoginForm />;
}
