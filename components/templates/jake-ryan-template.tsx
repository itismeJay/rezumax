// components/resume/JakeRyanResume.tsx

import React from "react";
import { ResumeData } from "@/types/resume-data";
import * as JakeRyanSections from "./sections/jake-ryan-sections";

interface JakeRyanResumeProps {
  data: ResumeData;
}

/**
 * Jake Ryan Resume Template
 *
 * Clean, ATS-friendly design perfect for tech roles.
 * All section components are in jake-ryan-sections.tsx
 */
export default function JakeRyanResume({ data }: JakeRyanResumeProps) {
  const visibleSections = data.sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex justify-center min-h-screen">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "816px",
          minHeight: "1056px",
          padding: "50px 60px",
          fontFamily: '"Computer Modern Roman", "Latin Modern Roman", serif',
          fontSize: "11pt",
          lineHeight: "1.3",
          color: "#000",
        }}
      >
        {/* HEADER */}
        <div className="text-center" style={{ marginBottom: "6px" }}>
          <h1
            style={{
              fontSize: "22pt",
              fontWeight: "bold",
              letterSpacing: "0.5px",
              marginBottom: "1px",
              fontVariant: "small-caps",
            }}
          >
            {data.personalInfo?.fullName || ""}
          </h1>
          <div style={{ fontSize: "10pt", marginTop: "1px" }}>
            {data.personalInfo?.phone && `${data.personalInfo.phone} · `}
            {data.personalInfo?.email && (
              <a
                href={`mailto:${data.personalInfo.email}`}
                style={{ color: "#000", textDecoration: "underline" }}
              >
                {data.personalInfo.email}
              </a>
            )}
            {data.personalInfo?.linkedin && (
              <>
                {" · "}
                <a
                  href={
                    data.personalInfo.linkedin.startsWith("http")
                      ? data.personalInfo.linkedin
                      : `https://linkedin.com/in/${data.personalInfo.linkedin}`
                  }
                  style={{ color: "#000", textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.personalInfo.linkedin
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </a>
              </>
            )}
            {data.personalInfo?.github && (
              <>
                {" · "}
                <a
                  href={
                    data.personalInfo.github.startsWith("http")
                      ? data.personalInfo.github
                      : `https://github.com/${data.personalInfo.github}`
                  }
                  style={{ color: "#000", textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.personalInfo.github
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </a>
              </>
            )}
          </div>
        </div>

        {/* ✅ DYNAMIC SECTIONS - NO SWITCH! */}
        {visibleSections.map((section) => {
          const SectionComponent = getSectionComponent(section.type);
          if (!SectionComponent) return null;

          return (
            <SectionComponent
              key={section.id}
              title={section.title}
              data={section.data}
            />
          );
        })}
      </div>
    </div>
  );
}

/**
 * Map section type to component
 *
 * This replaces the switch statement with an object lookup.
 * Much cleaner and easier to maintain!
 */
function getSectionComponent(type: string) {
  const components: Record<string, React.ComponentType<any>> = {
    summary: JakeRyanSections.SummarySection,
    education: JakeRyanSections.EducationSection,
    experience: JakeRyanSections.ExperienceSection,
    projects: JakeRyanSections.ProjectsSection,
    skills: JakeRyanSections.SkillsSection,
    certifications: JakeRyanSections.CertificationsSection,
    awards: JakeRyanSections.AwardsSection,
    leadership: JakeRyanSections.LeadershipSection,
    research: JakeRyanSections.ResearchSection,
    publications: JakeRyanSections.PublicationsSection,
    volunteer: JakeRyanSections.VolunteerSection,
    languages: JakeRyanSections.LanguagesSection,
    interests: JakeRyanSections.InterestsSection,
    custom: JakeRyanSections.CustomSection,
  };

  return components[type];
}
