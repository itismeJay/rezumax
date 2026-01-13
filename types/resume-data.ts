export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    linkedin?: string;
    github?: string;
    location?: string;
  };
  education: Array<{
    school: string;
    degree: string;
    location: string;
    startDate: string;
    endDate: string;
    details?: string;
  }>;
  experience: Array<{
    role: string;
    company: string;
    startDate: string;
    endDate: string;
    location: string;
    description: string[];
  }>;
  skills: string[];
  projects: Array<{
    title: string;
    description: string[];
    tech?: string[];
  }>;
}
