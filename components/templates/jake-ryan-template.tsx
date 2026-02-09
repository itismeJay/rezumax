// components/resume/JakeRyanResume.tsx
import React from "react";
import { ResumeData, ResumeSection } from "@/types/resume-data";

interface JakeRyanResumeProps {
  data: ResumeData;
}

export default function JakeRyanResume({ data }: JakeRyanResumeProps) {
  // ⭐ Get only visible sections in correct order
  const visibleSections = data.sections
    .filter((s) => s.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <div className="flex justify-center min-h-screen">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "816px",
          height: "1056px",
          padding: "50px 60px",
          fontFamily: '"Computer Modern Roman", "Latin Modern Roman", serif',
          fontSize: "11pt",
          lineHeight: "1.3",
          color: "#000",
        }}
      >
        {/* HEADING */}
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
            {data.personalInfo?.phone || ""}{" "}
            <a
              href={`mailto:${data.personalInfo?.email || ""}`}
              style={{ color: "#000", textDecoration: "underline" }}
            >
              {data.personalInfo?.email || ""}
            </a>{" "}
            <a
              href={`https://linkedin.com/in/${data.personalInfo?.linkedin || ""}`}
              style={{ color: "#000", textDecoration: "underline" }}
            >
              {data.personalInfo?.linkedin || ""}
            </a>{" "}
            <a
              href={`https://github.com/${data.personalInfo?.github || ""}`}
              style={{ color: "#000", textDecoration: "underline" }}
            >
              {data.personalInfo?.github || ""}
            </a>
          </div>
        </div>

        {/* ⭐ RENDER SECTIONS DYNAMICALLY IN ORDER */}
        {visibleSections.map((section) => {
          switch (section.type) {
            case "education":
              return (
                <EducationSection
                  key={section.id}
                  title={section.title}
                  data={section.data}
                />
              );
            case "experience":
              return (
                <ExperienceSection
                  key={section.id}
                  title={section.title}
                  data={section.data}
                />
              );
            case "projects":
              return (
                <ProjectsSection
                  key={section.id}
                  title={section.title}
                  data={section.data}
                />
              );
            case "skills":
              return (
                <SkillsSection
                  key={section.id}
                  title={section.title}
                  data={section.data}
                />
              );
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

// ⭐ EDUCATION SECTION COMPONENT
function EducationSection({ title, data }: { title: string; data: any[] }) {
  // ✅ Render only if at least one field has content
  if (!data?.some((edu) => Object.values(edu).some((v) => v))) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: "bold",
          letterSpacing: "1px",
          fontVariant: "small-caps",
          marginBottom: "3px",
          paddingBottom: "2px",
          borderBottom: "0.75px solid #000",
        }}
      >
        {title.toUpperCase()}
      </h2>
      {data.map((edu, index) => (
        <div
          key={edu.id || index}
          style={{
            marginTop: "5px",
            marginBottom: "5px",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        >
          <div className="flex justify-between" style={{ marginBottom: "1px" }}>
            <div style={{ fontWeight: "bold", fontSize: "11pt" }}>
              {edu.school || ""}
            </div>
            <div style={{ fontSize: "11pt" }}>{edu.location || ""}</div>
          </div>
          <div
            className="flex justify-between"
            style={{ fontSize: "10pt", fontStyle: "italic" }}
          >
            <div>
              {edu.degree || ""} {edu.gpa ? `(GPA: ${edu.gpa})` : ""}
            </div>
            <div>
              {edu.startDate || edu.graduateDate
                ? `${edu.startDate || ""}${
                    edu.startDate && edu.graduateDate ? " – " : ""
                  }${edu.graduateDate || ""}`
                : ""}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ⭐ EXPERIENCE SECTION COMPONENT
function ExperienceSection({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((exp) => Object.values(exp).some((v) => v))) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: "bold",
          letterSpacing: "1px",
          fontVariant: "small-caps",
          marginBottom: "3px",
          paddingBottom: "2px",
          borderBottom: "0.75px solid #000",
        }}
      >
        {title.toUpperCase()}
      </h2>
      {data.map((exp, index) => (
        <div
          key={exp.id || index}
          style={{
            marginTop: "5px",
            marginBottom: "7px",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        >
          <div className="flex justify-between" style={{ marginBottom: "1px" }}>
            <div style={{ fontWeight: "bold", fontSize: "11pt" }}>
              {exp.position || ""}
            </div>
            <div style={{ fontSize: "11pt" }}>
              {exp.startDate || exp.endDate
                ? `${exp.startDate || ""}${
                    exp.startDate && exp.endDate ? " – " : ""
                  }${exp.endDate || ""}`
                : ""}
            </div>
          </div>
          <div
            className="flex justify-between"
            style={{
              fontSize: "10pt",
              fontStyle: "italic",
              marginBottom: "3px",
            }}
          >
            <div>{exp.company || ""}</div>
            <div>{exp.location || ""}</div>
          </div>
          {exp.bullets?.length > 0 &&
            exp.bullets.some((b: string) => b.trim()) && (
              <ul
                style={{
                  listStyleType: "disc",
                  marginLeft: "15px",
                  fontSize: "10pt",
                  lineHeight: "1.3",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              >
                {exp.bullets
                  .filter((b: string) => b.trim())
                  .map((bullet: string, i: number) => (
                    <li
                      key={i}
                      style={{ marginBottom: "1.5px", paddingLeft: "2px" }}
                    >
                      {bullet.trim()}
                    </li>
                  ))}
              </ul>
            )}
        </div>
      ))}
    </div>
  );
}

// ⭐ PROJECTS SECTION COMPONENT
function ProjectsSection({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((p) => Object.values(p).some((v) => v))) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: "bold",
          letterSpacing: "1px",
          fontVariant: "small-caps",
          marginBottom: "3px",
          paddingBottom: "2px",
          borderBottom: "0.75px solid #000",
        }}
      >
        {title.toUpperCase()}
      </h2>
      {data.map((project, index) => (
        <div
          key={project.id || index}
          style={{
            marginTop: "5px",
            marginBottom: "7px",
            paddingLeft: "12px",
            paddingRight: "12px",
          }}
        >
          <div className="flex justify-between" style={{ marginBottom: "3px" }}>
            <div style={{ fontSize: "10pt" }}>
              <span style={{ fontWeight: "bold" }}>{project.name}</span>
              {project.projectLink && (
                <span>
                  {" "}
                  (
                  <a
                    href={
                      project.projectLink.startsWith("http")
                        ? project.projectLink
                        : `https://${project.projectLink}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "underline" }}
                  >
                    link
                  </a>
                  )
                </span>
              )}
              <span style={{ fontStyle: "italic" }}>
                {project.technologies ? ` | ${project.technologies}` : ""}
              </span>
            </div>
            <div style={{ fontSize: "10pt" }}>
              {project.startDate || ""}
              {project.endDate ? ` – ${project.endDate}` : ""}
            </div>
          </div>
          {project.bullets?.length > 0 &&
            project.bullets.some((b: string) => b.trim()) && (
              <ul
                style={{
                  listStyleType: "disc",
                  marginLeft: "15px",
                  fontSize: "10pt",
                  lineHeight: "1.3",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              >
                {project.bullets.map((bullet: string, i: number) => (
                  <li
                    key={i}
                    style={{ marginBottom: "1.5px", paddingLeft: "2px" }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
        </div>
      ))}
    </div>
  );
}

// ⭐ SKILLS SECTION COMPONENT
function SkillsSection({ title, data }: { title: string; data: any }) {
  if (!data || !Object.values(data).some((v) => v)) return null;

  return (
    <div style={{ marginTop: "10px" }}>
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: "bold",
          letterSpacing: "1px",
          fontVariant: "small-caps",
          marginBottom: "3px",
          paddingBottom: "2px",
          borderBottom: "0.75px solid #000",
        }}
      >
        {title.toUpperCase()}
      </h2>
      <div
        style={{
          fontSize: "10pt",
          lineHeight: "1.35",
          marginTop: "5px",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
      >
        {data.languages && (
          <div>
            <strong>Languages</strong>: {data.languages}
          </div>
        )}
        {data.frameworks && (
          <div>
            <strong>Frameworks</strong>: {data.frameworks}
          </div>
        )}
        {data.developerTools && (
          <div>
            <strong>Developer Tools</strong>: {data.developerTools}
          </div>
        )}
        {data.libraries && (
          <div>
            <strong>Libraries</strong>: {data.libraries}
          </div>
        )}
      </div>
    </div>
  );
}
