import jakeryanresume from "@/assets/resume-templates/jake-ryan-resume-template.png";
import { StaticImageData } from "next/image";

// This is your data model
export interface ResumeTemplate {
  id: string;
  name: string;
  image: StaticImageData;
  description: string;
  features: string[];
}

export const ResumeTemplates: ResumeTemplate[] = [
  {
    id: "jake-ryan",
    name: "Jake Ryan",
    image: jakeryanresume,
    description:
      "A sleek and professional resume template designed to showcase skills and experience with clarity and style.",
    features: ["ATS-Optimized", "Clean Typography", "Minimal Design"],
  },
];
