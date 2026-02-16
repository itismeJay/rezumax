// components/resume/JakeRyanResume.tsx

import React, { useEffect, useRef, useState } from "react";
import { ResumeData } from "@/types/resume-data";
import * as JakeRyanSections from "./sections/jake-ryan-sections";

interface JakeRyanResumeProps {
  data: ResumeData;
}

const PAGE_HEIGHT = 1056; // Letter size: 11 inches * 96 DPI
const PAGE_WIDTH = 816; // Letter size: 8.5 inches * 96 DPI
const PADDING_TOP = 40;
const PADDING_BOTTOM = 40;
const PADDING_HORIZONTAL = 50;
const CONTENT_HEIGHT = PAGE_HEIGHT - PADDING_TOP - PADDING_BOTTOM; // Usable content area

export default function JakeRyanResume({ data }: JakeRyanResumeProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number>(1);

  const visibleSections = data.sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  // Calculate number of pages needed
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver(() => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        const pagesNeeded = Math.ceil(contentHeight / CONTENT_HEIGHT);
        setPages(Math.max(1, pagesNeeded));
      }
    });

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [data]);

  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: pages }).map((_, pageIndex) => (
        <div
          key={pageIndex}
          style={{
            width: `${PAGE_WIDTH}px`,
            height: `${PAGE_HEIGHT}px`,
            padding: `${PADDING_TOP}px ${PADDING_HORIZONTAL}px ${PADDING_BOTTOM}px ${PADDING_HORIZONTAL}px`,
            fontFamily: '"Times New Roman", "Georgia", serif',
            fontSize: "11pt",
            lineHeight: "1.3",
            color: "#000",
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: `${PADDING_TOP}px`,
              left: `${PADDING_HORIZONTAL}px`,
              right: `${PADDING_HORIZONTAL}px`,
              height: `${CONTENT_HEIGHT}px`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                transform: `translateY(-${pageIndex * CONTENT_HEIGHT}px)`,
              }}
            >
              <div ref={pageIndex === 0 ? contentRef : undefined}>
                {/* HEADER */}
                <div style={{ textAlign: "center", marginBottom: "6px" }}>
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
                    {data.personalInfo?.phone &&
                      `${data.personalInfo.phone} · `}
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
                          style={{
                            color: "#000",
                            textDecoration: "underline",
                          }}
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
                          style={{
                            color: "#000",
                            textDecoration: "underline",
                          }}
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

                {/* DYNAMIC SECTIONS */}
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
          </div>
        </div>
      ))}
    </div>
  );
}

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
