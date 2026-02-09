// types/resume.ts
import { z } from "zod";

// -------------------------------
// Section Types
// -------------------------------
export type SectionType =
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "summary"
  | "certifications"
  | "awards"
  | "leadership"
  | "research"
  | "publications"
  | "volunteer"
  | "languages"
  | "interests"
  | "custom";

// -------------------------------
// Generic Resume Section
// -------------------------------
export interface ResumeSection {
  id: string; // Unique identifier
  type: SectionType; // Section type
  title: string; // Display title (can be customized)
  order: number; // For sorting/reordering
  visible: boolean; // Show/hide
  data: any; // Actual content (array/object depending on section)
}

// -------------------------------
// Resume Data (Dynamic Sections)
// -------------------------------
export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  sections: ResumeSection[]; // ✅ Dynamic sections array
}

// -------------------------------
// Zod schema for validation
// -------------------------------
export const resumeDataSchema = z.object({
  personalInfo: z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
  }),
  sections: z.array(
    z.object({
      id: z.string(),
      type: z.enum([
        "education",
        "experience",
        "projects",
        "skills",
        "summary",
        "certifications",
        "awards",
        "leadership",
        "research",
        "publications",
        "volunteer",
        "languages",
        "interests",
        "custom",
      ]),
      title: z.string(),
      order: z.number(),
      visible: z.boolean(),
      data: z.any(),
    }),
  ),
});

// -------------------------------
// Full DB row type
// -------------------------------
export interface ResumeFromDB {
  id: string;
  userId: string;
  title: string;
  template: string;
  content: ResumeData; // JSON content
  score: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// -------------------------------
// Zod schema for DB row
// -------------------------------
export const resumeFromDBSchema = z.object({
  id: z.string(),
  userId: z.string(),
  title: z.string(),
  template: z.string(),
  content: resumeDataSchema,
  score: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
