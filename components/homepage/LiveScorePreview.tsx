"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { scoreCategories } from "@/constants/scoreCategories";
import { aiSuggestions } from "@/constants/aiSuggestions";

export function LiveScorePreview() {
  const [animatedScore, setAnimatedScore] = useState(0);
  const targetScore = 82;

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedScore((prev) => {
          if (prev >= targetScore) {
            clearInterval(interval);
            return targetScore;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset =
    circumference - (animatedScore / 100) * circumference;

  return (
    <section className="py-20 lg:py-32 bg-card overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Live Preview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            See Your Resume Score in Action
          </h2>
          <p className="text-lg text-muted-foreground">
            Real-time AI analysis with actionable improvement suggestions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Score Circle */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full scale-75" />
              <svg className="w-64 h-64 transform -rotate-90 relative z-10">
                <circle
                  cx="128"
                  cy="128"
                  r="70"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="12"
                  className="text-muted/20"
                />
                <circle
                  cx="128"
                  cy="128"
                  r="70"
                  fill="none"
                  stroke="url(#scoreGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient
                    id="scoreGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="50%" stopColor="hsl(var(--secondary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                <span className="text-5xl font-bold text-foreground">
                  {animatedScore}
                </span>
                <span className="text-muted-foreground text-lg">/ 100</span>
                <span className="text-success text-sm font-medium mt-1">
                  Good Score
                </span>
              </div>
            </div>
          </div>

          {/* Score Breakdown & Suggestions */}
          <div className="space-y-6">
            <div className="bg-background rounded-2xl border border-border p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Score Breakdown
              </h3>
              <div className="space-y-4">
                {scoreCategories.map((category) => (
                  <div key={category.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">
                        {category.name}
                      </span>
                      <span className="font-medium text-foreground">
                        {category.score}/{category.max}
                      </span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${category.color} rounded-full transition-all duration-1000`}
                        style={{
                          width: `${(category.score / category.max) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-background rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">
                  AI Suggestions
                </h3>
              </div>
              <div className="space-y-3">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 p-3 rounded-lg ${
                      suggestion.type === "warning"
                        ? "bg-warning/10"
                        : "bg-success/10"
                    }`}
                  >
                    {suggestion.type === "warning" ? (
                      <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {suggestion.category}
                      </span>
                      <p className="text-sm text-foreground mt-0.5">
                        {suggestion.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link href="/dashboard" className="block">
              <Button variant="gradient" size="lg" className="w-full group">
                Improve Your Writing Quality
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
