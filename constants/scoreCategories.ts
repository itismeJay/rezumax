export interface ScoreCategory {
  name: string;
  score: number;
  max: number;
  color: string;
}

export const scoreCategories: ScoreCategory[] = [
  { name: "Content Quality", score: 34, max: 40, color: "bg-success" },
  { name: "ATS & Structure", score: 16, max: 20, color: "bg-primary" },
  { name: "Job Optimization", score: 18, max: 25, color: "bg-warning" },
  { name: "Writing Quality", score: 9, max: 10, color: "bg-secondary" },
  { name: "Application Ready", score: 5, max: 5, color: "bg-success" },
];
