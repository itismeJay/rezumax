import { FileText, Target, TrendingUp, Zap } from "lucide-react";

export const stats = [
  {
    label: "Total Resumes",
    value: "4",
    icon: FileText,
    change: "+1 this week",
  },
  {
    label: "Avg. Score",
    value: "73%",
    icon: Target,
    change: "+5% from last month",
  },
  {
    label: "Applications",
    value: "12",
    icon: TrendingUp,
    change: "+3 this week",
  },
  {
    label: "AI Improvements",
    value: "28",
    icon: Zap,
    change: "This month",
  },
];

export const resumes = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    score: 85,
    lastUpdated: "2 hours ago",
    targetJob: "Meta - Frontend Engineer",
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    score: 73,
    lastUpdated: "1 day ago",
    targetJob: "Stripe - Software Engineer",
  },
];
