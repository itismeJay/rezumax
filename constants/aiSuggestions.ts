export interface AISuggestion {
  type: "warning" | "success";
  category: string;
  message: string;
}

export const aiSuggestions: AISuggestion[] = [
  {
    type: "warning",
    category: "Writing Quality",
    message:
      "Replace weak phrases like 'Worked on...' with action verbs like 'Designed & implemented...'",
  },
  {
    type: "success",
    category: "ATS & Structure",
    message: "Great job! Your resume follows standard heading conventions.",
  },
  {
    type: "warning",
    category: "Job Optimization",
    message: "Backend roles expect database indexing experience — consider adding this.",
  },
];
