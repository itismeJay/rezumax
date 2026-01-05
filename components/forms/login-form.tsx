"use client";
import Link from "next/link";
import { useState } from "react";
import { FileText, Github, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/server/users";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const { success, message } = await signIn(values.email, values.password);

    if (success) {
      toast.success((message as string) || "Signed in successfully");
      router.push("/dashboard");
      console.log(values);
    } else {
      toast.error(message as string);
    }
    setLoading(false);
  }

  return (
    <>
      <div className="min-h-screen bg-background flex">
        {/* Left Panel - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo with Back Button */}
            <div className="flex items-center gap-4 mb-8">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shadow-md">
                  <FileText className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-xl text-foreground">
                  RezumaX
                </span>
              </Link>
            </div>

            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome back
            </h1>
            <p className="text-muted-foreground mb-8">
              Log in to your account to continue building amazing resumes.
            </p>

            {/* Social Login */}
            <div className="space-y-3 mb-6">
              <Button
                variant="outline"
                className="w-full gap-2 cursor-pointer"
                disabled={loading}
              >
                <Github className="w-4 h-4" />
                Continue with GitHub
              </Button>
              <Button
                variant="outline"
                className="w-full gap-2 cursor-pointer"
                disabled={loading}
                type="button"
                onClick={signInWithGoogle}
              >
                <Mail className="w-4 h-4" />
                Continue with Google
              </Button>
            </div>

            <div className="relative my-6">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            {/* Email Login Form */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="you@example.com" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="w-full"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button disabled={loading} className="w-full" type="submit">
                  {loading ? <Loader2 className="animate-spin" /> : "Log in"}
                </Button>
              </form>
            </Form>
            <p className="text-sm text-center text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Right Panel - Branding */}
        <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary via-secondary to-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-primary-foreground blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-primary-foreground">
            <div className="max-w-md text-center">
              <h2 className="text-3xl font-bold mb-4">
                Build resumes that get you hired
              </h2>
              <p className="text-primary-foreground/80 text-lg">
                Join thousands of developers who have landed their dream jobs
                with AI-optimized resumes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
