import React from "react";
import { ResumeData } from "@/types/resume-data";

interface JakeRyanResumeProps {
  data: ResumeData;
}

export default function JakeRyanResume({ data }: JakeRyanResumeProps) {
  return (
    <div className="flex justify-center min-h-screen ">
      <div
        className="bg-white shadow-lg"
        style={{
          width: "816px",
          height: "1056px",
          padding: "50px 60 px",
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

        {/* EDUCATION */}
        {data.education?.length > 0 && (
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
              {data.sectionNames?.education || "EDUCATION"}
            </h2>
            {data.education.map((edu, index) => (
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
                      ? `${edu.startDate || ""}${edu.startDate && edu.graduateDate ? " – " : ""}${edu.graduateDate || ""}`
                      : ""}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCE */}
        {data.experience?.length > 0 && (
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
              {data.sectionNames?.experience || "EXPERIENCE"}
            </h2>
            {data.experience.map((exp, index) => (
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
                      ? `${exp.startDate || ""}${exp.startDate && exp.endDate ? " – " : ""}${exp.endDate || ""}`
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
                {exp.bullets?.length > 0 && (
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
                      .filter((b) => b.trim())
                      .map((bullet, i) => (
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
        )}

        {/* PROJECTS */}
        {data.projects?.length > 0 && (
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
              {data.sectionNames?.projects || "PROJECTS"}
            </h2>
            {data.projects.map((project) => (
              <div
                key={project.id}
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
                {project.bullets?.length > 0 && (
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
                    {project.bullets.map((bullet, i) => (
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
        )}

        {/* SKILLS */}
        {(data.skills?.languages ||
          data.skills?.frameworks ||
          data.skills?.developerTools ||
          data.skills?.libraries) && (
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
              {data.sectionNames?.skills || "TECHNICAL SKILLS"}
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
              {data.skills?.languages && (
                <div>
                  <strong>Languages</strong>: {data.skills.languages}
                </div>
              )}
              {data.skills?.frameworks && (
                <div>
                  <strong>Frameworks</strong>: {data.skills.frameworks}
                </div>
              )}
              {data.skills?.developerTools && (
                <div>
                  <strong>Developer Tools</strong>: {data.skills.developerTools}
                </div>
              )}
              {data.skills?.libraries && (
                <div>
                  <strong>Libraries</strong>: {data.skills.libraries}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
