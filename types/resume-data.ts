// types/resume.ts (or wherever you have ResumeData)
export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    location?: string;
    portfolio?: string;
  };
  education: Array<{
    id: string;
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
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
    bullets: string[];
  }>;
  skills: {
    languages: string;
    frameworks: string;
    developerTools: string;
    libraries: string;
  };
}

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
