// lib/resume-helpers.ts
import { ResumeData, ResumeSection, SectionType } from "@/types/resume-data";

/**
 * Migrates old resume format to new dynamic sections format
 *
 * OLD FORMAT:
 * {
 *   personalInfo: {...},
 *   education: [...],
 *   experience: [...],
 *   projects: [...],
 *   skills: {...}
 * }
 *
 * NEW FORMAT:
 * {
 *   personalInfo: {...},
 *   sections: [
 *     { id, type, title, order, visible, data },
 *     ...
 *   ]
 * }
 */
export function migrateToNewFormat(oldData: any): ResumeData {
  // If already in new format, return as-is
  if (oldData.sections && Array.isArray(oldData.sections)) {
    return oldData as ResumeData;
  }

  // Otherwise, convert old format to new
  const sections: ResumeSection[] = [];

  // Add education section
  if (oldData.education) {
    sections.push({
      id: "education-default",
      type: "education",
      title: oldData.sectionNames?.education || "Education",
      order: 0,
      visible: true,
      data: oldData.education,
    });
  }

  // Add experience section
  if (oldData.experience) {
    sections.push({
      id: "experience-default",
      type: "experience",
      title: oldData.sectionNames?.experience || "Work Experience",
      order: 1,
      visible: true,
      data: oldData.experience,
    });
  }

  // Add projects section
  if (oldData.projects) {
    sections.push({
      id: "projects-default",
      type: "projects",
      title: oldData.sectionNames?.projects || "Projects",
      order: 2,
      visible: true,
      data: oldData.projects,
    });
  }

  // Add skills section
  if (oldData.skills) {
    sections.push({
      id: "skills-default",
      type: "skills",
      title: oldData.sectionNames?.skills || "Technical Skills",
      order: 3,
      visible: true,
      data: oldData.skills,
    });
  }

  return {
    personalInfo: oldData.personalInfo || {
      fullName: "",
      email: "",
      phone: "",
      linkedin: "",
      github: "",
      portfolio: "",
    },
    sections,
  };
}

/**
 * Get default title for a section type
 */
export function getDefaultSectionTitle(type: SectionType): string {
  const titles: Record<SectionType, string> = {
    education: "Education",
    experience: "Work Experience",
    projects: "Projects",
    skills: "Technical Skills",
    summary: "Professional Summary",
    certifications: "Certifications",
    awards: "Awards & Honors",
    leadership: "Leadership Experience",
    research: "Research",
    publications: "Publications",
    volunteer: "Volunteer Work",
    languages: "Languages",
    interests: "Interests",
    custom: "Custom Section",
  };
  return titles[type];
}

/**
 * Create empty data structure for a section type
 */
export function createDefaultSectionData(type: SectionType): any {
  switch (type) {
    case "education":
      return [
        {
          school: "",
          degree: "",
          location: "",
          graduationDate: "",
          gpa: "",
          coursework: "",
        },
      ];
    case "experience":
      return [
        {
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          responsibilities: [""],
        },
      ];
    case "projects":
      return [
        {
          name: "",
          technologies: "",
          description: "",
          link: "",
          highlights: [""],
        },
      ];
    case "skills":
      return {
        languages: "",
        frameworks: "",
        developerTools: "",
        libraries: "",
      };
    case "summary":
      return {
        summary: "",
      };
    case "certifications":
      return [
        {
          name: "",
          issuer: "",
          date: "",
          credentialId: "",
        },
      ];
    case "awards":
      return [
        {
          title: "",
          issuer: "",
          date: "",
          description: "",
        },
      ];
    case "leadership":
      return [
        {
          role: "",
          organization: "",
          startDate: "",
          endDate: "",
          achievements: [""],
        },
      ];
    case "research":
      return [
        {
          title: "",
          institution: "",
          date: "",
          summary: "",
        },
      ];
    case "publications":
      return [
        {
          title: "",
          publisher: "",
          date: "",
          link: "",
        },
      ];
    case "volunteer":
      return [
        {
          role: "",
          organization: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ];
    case "languages":
      return [
        {
          name: "",
          proficiency: "",
        },
      ];
    case "interests":
      return [
        {
          name: "",
        },
      ];
    case "custom":
      return [];
    default:
      return [];
  }
}
