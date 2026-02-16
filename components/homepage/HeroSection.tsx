"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { TypeWriter } from "../ui/typewriter";

export function HeroSection() {
  const [showSubtitle, setShowSubtitle] = useState(false);

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 hover-scale-sm cursor-default">
            <Sparkles className="w-4 h-4 text-primary animate-bounce-gentle" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Resume Builder
            </span>
          </div>

          {/* Headline with Typing Effect */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 min-h-[1.2em] sm:min-h-[2.4em]">
            <TypeWriter
              text="Build ATS-Optimized Resumes"
              delay={50}
              onComplete={() => setShowSubtitle(true)}
            />
            <span
              className={`block mt-2 gradient-text transition-all duration-500 ${
                showSubtitle
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              That Land Tech Jobs
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 transition-all duration-500 delay-200 ${
              showSubtitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Score your resume instantly, get AI-powered suggestions, and create
            perfectly tailored applications for top tech companies.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-500 delay-300 ${
              showSubtitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link href="/dashboard">
              <Button variant="gradient" size="xl" className="group hover-lift">
                Start Building Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button variant="heroOutline" size="xl" className="hover-lift">
                View Templates
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground transition-all duration-500 delay-500 ${
              showSubtitle
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <div className="flex items-center gap-2 hover-scale-sm cursor-default">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2 hover-scale-sm cursor-default">
              <Zap className="w-4 h-4 text-warning" />
              <span>Generate in seconds</span>
            </div>
            <div className="flex items-center gap-2 hover-scale-sm cursor-default">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span>ATS-friendly format</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
