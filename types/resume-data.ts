// types/resume.ts (or wherever you have ResumeData)
import { z } from "zod";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    location: string;
    startDate: string;
    graduateDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    id: string;
    position: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }>;
  projects: Array<{
    id: string;
    name: string;
    technologies: string;
    startDate?: string;
    endDate?: string;
    projectLink?: string;
    bullets: string[];
  }>;
  skills: {
    languages: string;
    frameworks: string;
    developerTools: string;
    libraries: string;
  };

  // 👇 ADD THIS - Section names for all customizable sections
  sectionNames?: {
    education?: string;
    experience?: string;
    projects?: string;
    skills?: string;
  };
}

// Zod schema for ResumeData
export const resumeDataSchema = z.object({
  personalInfo: z.object({
    fullName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
  }),
  education: z.array(
    z.object({
      id: z.string(),
      school: z.string(),
      degree: z.string(),
      location: z.string(),
      startDate: z.string(),
      graduateDate: z.string(), // 👈 Fixed: was "endDate" in your schema
      gpa: z.string().optional(),
    }),
  ),
  experience: z.array(
    z.object({
      id: z.string(),
      position: z.string(),
      company: z.string(),
      location: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      bullets: z.array(z.string()),
    }),
  ),
  projects: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      technologies: z.string(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      projectLink: z.string().optional(), // 👈 Added this
      bullets: z.array(z.string()),
    }),
  ),
  skills: z.object({
    languages: z.string(),
    frameworks: z.string(),
    developerTools: z.string(),
    libraries: z.string(),
  }),

  // 👇 ADD THIS - Zod schema for section names
  sectionNames: z
    .object({
      education: z.string().optional(),
      experience: z.string().optional(),
      projects: z.string().optional(),
      skills: z.string().optional(),
    })
    .optional(),
});

// Type for the full database row
export interface ResumeFromDB {
  id: string;
  userId: string;
  title: string;
  template: string;
  content: ResumeData; // The JSON content matches ResumeData
  score: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// Zod schema for ResumeFromDB
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
