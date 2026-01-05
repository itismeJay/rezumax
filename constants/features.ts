import {
  Target,
  Sparkles,
  FileCheck,
  BarChart3,
  Clock,
  Download,
} from "lucide-react";
import React from "react";

export interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: Target,
    title: "ATS Score Analysis",
    description:
      "Get instant feedback with a 100-point scoring system that breaks down content quality, structure, and optimization.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Suggestions",
    description:
      "Receive actionable recommendations to improve each section of your resume and boost your score.",
  },
  {
    icon: FileCheck,
    title: "Job Description Matching",
    description:
      "Paste a job description and get tailored suggestions to optimize your resume for specific roles.",
  },
  {
    icon: BarChart3,
    title: "Score Breakdown",
    description:
      "Detailed metrics across content quality, ATS compliance, job optimization, and writing quality.",
  },
  {
    icon: Clock,
    title: "Version History",
    description:
      "Track your progress with resume version history and see how your scores improve over time.",
  },
  {
    icon: Download,
    title: "ATS-Friendly Export",
    description:
      "Download perfectly formatted PDF resumes that pass through applicant tracking systems.",
  },
];
