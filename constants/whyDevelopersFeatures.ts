import {
  Shield,
  Target,
  MessageSquare,
  Building2,
  TrendingUp,
} from "lucide-react";

export interface WhyDevelopersFeatures {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

export const whyDevelopersFeatures = [
  {
    icon: Shield,
    title: "ATS-Optimized Structure",
    description:
      "Standard headings, proper formatting, and keyword density that passes automated screening.",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Target,
    title: "Role-Specific Scoring",
    description:
      "AI adapts evaluation based on Frontend, Backend, Full Stack, DevOps, or Data Engineering roles.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Recruiter-Style Feedback",
    description:
      "Get the same insights Big Tech recruiters look for when screening candidates.",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Building2,
    title: "Big Tech Resume Formatting",
    description:
      "Structure and language patterns proven to work at FAANG and top-tier companies.",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: TrendingUp,
    title: "Quantified Impact Suggestions",
    description:
      "AI helps you add metrics, scale indicators, and measurable achievements.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];
