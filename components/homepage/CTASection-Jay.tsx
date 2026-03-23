"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export function CTASection() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const handleGetStarted = () => {
    if (isPending) return;
    if (!session) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  };
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-primary via-secondary to-primary bg-[length:200%_200%] p-8 sm:p-12 lg:p-16 overflow-hidden animate-pulse-glow">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-40 h-40 bg-primary-foreground rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary-foreground rounded-full blur-3xl" />
          </div>

          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of developers who have improved their resumes and
              landed positions at top tech companies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={handleGetStarted}
                className="cursor-pointer bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold shadow-xl text-lg px-16 py-7"
              >
                Build Your Resume Now
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
