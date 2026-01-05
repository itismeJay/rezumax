import {
  User,
  FileText,
  Sparkles,
  TrendingUp,
  Download,
} from "lucide-react";

export interface HowItWorksStep {
  icon: React.ElementType;
  step: string;
  title: string;
  description: string;
}

export const howItWorksSteps: HowItWorksStep[] = [
  {
    icon: User,
    step: "01",
    title: "Enter Your Developer Background",
    description:
      "Add your skills, experience, projects, and education to build your foundation.",
  },
  {
    icon: FileText,
    step: "02",
    title: "Paste a Job Description",
    description:
      "Drop in the job posting you're targeting for role-specific optimization.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "AI Generates & Scores Your Resume",
    description:
      "Get an instant 100-point score with detailed category breakdowns.",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Improve Weak Areas with AI",
    description:
      "Receive actionable suggestions to boost each scoring category.",
  },
  {
    icon: Download,
    step: "05",
    title: "Export ATS-Friendly Resume",
    description:
      "Download a perfectly formatted PDF that passes applicant tracking systems.",
  },
];
