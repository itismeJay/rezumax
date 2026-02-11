// components/resume/sections/jake-ryan-sections.tsx

import React from "react";

/**
 * Shared Props for all section components
 */
interface SectionProps {
  title: string;
  data: any;
}

/**
 * Shared section header - keeps styling consistent
 */
function SectionHeader({ title }: { title: string }) {
  return (
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
  );
}

// ==========================================
// SUMMARY SECTION
// ==========================================
export function SummarySection({ title, data }: SectionProps) {
  if (!data?.summary?.trim()) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      <div
        style={{
          fontSize: "10pt",
          lineHeight: "1.35",
          marginTop: "5px",
          paddingLeft: "12px",
          paddingRight: "12px",
          textAlign: "justify",
        }}
      >
        {data.summary}
      </div>
    </div>
  );
}

// ==========================================
// EDUCATION SECTION
// ==========================================
export function EducationSection({ title, data }: SectionProps) {
  if (!data?.some((edu: any) => edu.school || edu.degree)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((edu: any) => edu.school || edu.degree)
        .map((edu: any, index: number) => (
          <div
            key={edu.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
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
            {edu.coursework && (
              <div style={{ fontSize: "10pt", marginTop: "2px" }}>
                <strong>Relevant Coursework:</strong> {edu.coursework}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

// ==========================================
// EXPERIENCE SECTION
// ==========================================
export function ExperienceSection({ title, data }: SectionProps) {
  if (!data?.some((exp: any) => exp.position || exp.company)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((exp: any) => exp.position || exp.company)
        .map((exp: any, index: number) => (
          <div
            key={exp.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
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

// ==========================================
// PROJECTS SECTION
// ==========================================
export function ProjectsSection({ title, data }: SectionProps) {
  if (!data?.some((p: any) => p.name)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((project: any) => project.name)
        .map((project: any, index: number) => (
          <div
            key={project.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "3px" }}
            >
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
                  {project.bullets
                    .filter((b: string) => b.trim())
                    .map((bullet: string, i: number) => (
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

// ==========================================
// SKILLS SECTION
// ==========================================
export function SkillsSection({ title, data }: SectionProps) {
  if (!data || !Object.values(data).some((v) => v)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
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
            <strong>Languages:</strong> {data.languages}
          </div>
        )}
        {data.frameworks && (
          <div>
            <strong>Frameworks:</strong> {data.frameworks}
          </div>
        )}
        {data.developerTools && (
          <div>
            <strong>Developer Tools:</strong> {data.developerTools}
          </div>
        )}
        {data.libraries && (
          <div>
            <strong>Libraries:</strong> {data.libraries}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// CERTIFICATIONS SECTION
// ==========================================
export function CertificationsSection({ title, data }: SectionProps) {
  if (!data?.some((cert: any) => cert.name)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((cert: any) => cert.name)
        .map((cert: any, index: number) => (
          <div
            key={cert.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontSize: "10pt" }}>
                <strong>{cert.name}</strong>
                {cert.issuer && (
                  <span style={{ fontStyle: "italic" }}> - {cert.issuer}</span>
                )}
              </div>
              <div style={{ fontSize: "10pt" }}>{cert.date || ""}</div>
            </div>
            {cert.credentialId && (
              <div style={{ fontSize: "9pt", color: "#555" }}>
                Credential ID: {cert.credentialId}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

// ==========================================
// AWARDS SECTION
// ==========================================
export function AwardsSection({ title, data }: SectionProps) {
  if (!data?.some((award: any) => award.title)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((award: any) => award.title)
        .map((award: any, index: number) => (
          <div
            key={award.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontSize: "10pt" }}>
                <strong>{award.title}</strong>
                {award.issuer && (
                  <span style={{ fontStyle: "italic" }}> - {award.issuer}</span>
                )}
              </div>
              <div style={{ fontSize: "10pt" }}>{award.date || ""}</div>
            </div>
            {award.description && (
              <div
                style={{
                  fontSize: "10pt",
                  marginTop: "2px",
                  lineHeight: "1.3",
                }}
              >
                {award.description}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

// ==========================================
// LEADERSHIP SECTION
// ==========================================
export function LeadershipSection({ title, data }: SectionProps) {
  if (!data?.some((role: any) => role.role || role.organization)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((role: any) => role.role || role.organization)
        .map((role: any, index: number) => (
          <div
            key={role.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "11pt" }}>
                {role.role || ""}
              </div>
              <div style={{ fontSize: "11pt" }}>
                {role.startDate || role.endDate
                  ? `${role.startDate || ""}${
                      role.startDate && role.endDate ? " – " : ""
                    }${role.endDate || ""}`
                  : ""}
              </div>
            </div>
            <div
              style={{
                fontSize: "10pt",
                fontStyle: "italic",
                marginBottom: "3px",
              }}
            >
              {role.organization || ""}
            </div>
            {role.achievements?.length > 0 &&
              role.achievements.some((a: string) => a.trim()) && (
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
                  {role.achievements
                    .filter((a: string) => a.trim())
                    .map((achievement: string, i: number) => (
                      <li
                        key={i}
                        style={{ marginBottom: "1.5px", paddingLeft: "2px" }}
                      >
                        {achievement.trim()}
                      </li>
                    ))}
                </ul>
              )}
          </div>
        ))}
    </div>
  );
}

// ==========================================
// RESEARCH SECTION
// ==========================================
export function ResearchSection({ title, data }: SectionProps) {
  if (!data?.some((research: any) => research.title)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((research: any) => research.title)
        .map((research: any, index: number) => (
          <div
            key={research.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "11pt" }}>
                {research.title}
              </div>
              <div style={{ fontSize: "11pt" }}>
                {research.startDate || research.endDate
                  ? `${research.startDate || ""}${
                      research.startDate && research.endDate ? " – " : ""
                    }${research.endDate || ""}`
                  : ""}
              </div>
            </div>
            <div
              style={{
                fontSize: "10pt",
                fontStyle: "italic",
                marginBottom: "3px",
              }}
            >
              {research.institution || ""}
              {research.advisor && ` | Advisor: ${research.advisor}`}
            </div>
            {research.summary && (
              <div
                style={{
                  fontSize: "10pt",
                  marginTop: "2px",
                  lineHeight: "1.3",
                }}
              >
                {research.summary}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

// ==========================================
// PUBLICATIONS SECTION
// ==========================================
export function PublicationsSection({ title, data }: SectionProps) {
  if (!data?.some((pub: any) => pub.title)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((pub: any) => pub.title)
        .map((pub: any, index: number) => (
          <div
            key={pub.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "5px",
              paddingLeft: "12px",
              paddingRight: "12px",
              fontSize: "10pt",
              lineHeight: "1.3",
            }}
          >
            {pub.authors && (
              <span style={{ fontStyle: "italic" }}>{pub.authors}. </span>
            )}
            <strong>{pub.title}.</strong>
            {pub.publisher && (
              <span style={{ fontStyle: "italic" }}> {pub.publisher}</span>
            )}
            {pub.date && `, ${pub.date}`}
            {pub.link && (
              <>
                {" "}
                <a
                  href={
                    pub.link.startsWith("http")
                      ? pub.link
                      : `https://${pub.link}`
                  }
                  style={{ textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  [Link]
                </a>
              </>
            )}
          </div>
        ))}
    </div>
  );
}

// ==========================================
// VOLUNTEER SECTION
// ==========================================
export function VolunteerSection({ title, data }: SectionProps) {
  if (!data?.some((vol: any) => vol.role || vol.organization)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      {data
        .filter((vol: any) => vol.role || vol.organization)
        .map((vol: any, index: number) => (
          <div
            key={vol.id || index}
            style={{
              marginTop: "5px",
              marginBottom: "7px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div
              className="flex justify-between"
              style={{ marginBottom: "1px" }}
            >
              <div style={{ fontWeight: "bold", fontSize: "11pt" }}>
                {vol.role || ""}
              </div>
              <div style={{ fontSize: "11pt" }}>
                {vol.startDate || vol.endDate
                  ? `${vol.startDate || ""}${
                      vol.startDate && vol.endDate ? " – " : ""
                    }${vol.endDate || ""}`
                  : ""}
              </div>
            </div>
            <div
              style={{
                fontSize: "10pt",
                fontStyle: "italic",
                marginBottom: "3px",
              }}
            >
              {vol.organization || ""}
            </div>
            {vol.description && (
              <div
                style={{
                  fontSize: "10pt",
                  marginTop: "2px",
                  lineHeight: "1.3",
                }}
              >
                {vol.description}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}

// ==========================================
// LANGUAGES SECTION
// ==========================================
export function LanguagesSection({ title, data }: SectionProps) {
  if (!data?.some((lang: any) => lang.name)) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      <div
        style={{
          fontSize: "10pt",
          marginTop: "5px",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
      >
        {data
          .filter((lang: any) => lang.name)
          .map((lang: any, index: number) => (
            <div key={lang.id || index} style={{ marginBottom: "2px" }}>
              <strong>{lang.name}:</strong> {lang.proficiency || ""}
            </div>
          ))}
      </div>
    </div>
  );
}

// ==========================================
// INTERESTS SECTION
// ==========================================
export function InterestsSection({ title, data }: SectionProps) {
  const hasContent = Array.isArray(data)
    ? data.some((item: any) => item.name?.trim())
    : data?.interests?.trim();

  if (!hasContent) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      <div
        style={{
          fontSize: "10pt",
          lineHeight: "1.35",
          marginTop: "5px",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
      >
        {Array.isArray(data)
          ? data
              .filter((item: any) => item.name)
              .map((item: any) => item.name)
              .join(", ")
          : data.interests}
      </div>
    </div>
  );
}

// ==========================================
// CUSTOM SECTION
// ==========================================
export function CustomSection({ title, data }: SectionProps) {
  if (!data?.content?.trim()) return null;

  return (
    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
      <SectionHeader title={title} />
      <div
        style={{
          fontSize: "10pt",
          lineHeight: "1.35",
          marginTop: "5px",
          paddingLeft: "12px",
          paddingRight: "12px",
        }}
      >
        {data.content}
      </div>
    </div>
  );
}
