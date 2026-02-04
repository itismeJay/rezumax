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
          padding: "50px 60px",
          fontFamily:
            '"Computer Modern Serif", "Times New Roman", Georgia, serif',
          fontSize: "10.5pt",
          lineHeight: "1.18",
          color: "#000",
        }}
      >
        {/* HEADING */}
        <div className="text-center" style={{ marginBottom: "6px" }}>
          <h1
            style={{
              fontSize: "28pt",
              fontWeight: "normal",
              letterSpacing: "0.5px",
              marginBottom: "1px",
              fontVariant: "small-caps",
            }}
          >
            {data.personalInfo?.fullName || "First Last"}
          </h1>
          <div style={{ fontSize: "9.5pt", marginTop: "1px" }}>
            {data.personalInfo?.phone || "123-456-7890"} |{" "}
            <a
              href={`mailto:${data.personalInfo?.email || "jake@su.edu"}`}
              style={{ color: "#000", textDecoration: "underline" }}
            >
              {data.personalInfo?.email || "jake@su.edu"}
            </a>{" "}
            |{" "}
            <a
              href={`https://linkedin.com/in/${data.personalInfo?.linkedin || "jake"}`}
              style={{ color: "#000", textDecoration: "underline" }}
            >
              {data.personalInfo?.linkedin || "linkedin.com/in/jake"}
            </a>{" "}
            |{" "}
            <a
              href={`https://github.com/${data.personalInfo?.github || "jake"}`}
              style={{ color: "#000", textDecoration: "underline" }}
            >
              {data.personalInfo?.github || "github.com/jake"}
            </a>
          </div>
        </div>
        {/* EDUCATION SECTION */}
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "normal",
              letterSpacing: "1px",
              fontVariant: "small-caps",
              marginBottom: "3px",
              paddingBottom: "2px",
              borderBottom: "0.75px solid #000",
            }}
          >
            {data.sectionNames?.education || "Education"}
          </h2>

          {data?.education?.map((edu, index) => (
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
                <div style={{ fontWeight: "bold", fontSize: "10.5pt" }}>
                  {edu.school || "University Name"}
                </div>
                <div style={{ fontSize: "10.5pt" }}>
                  {edu.location || "Georgetown, TX"}
                </div>
              </div>
              <div
                className="flex justify-between"
                style={{ fontSize: "9.5pt", fontStyle: "italic" }}
              >
                <div>
                  {edu.degree || "Bachelor of Arts in Computer Science"}{" "}
                  {edu.gpa ? `(GPA: ${edu.gpa})` : ""}
                </div>
                <div>
                  {edu.startDate || "Aug. 2018"} –{" "}
                  {edu.graduateDate || "May 2021"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* EXPERIENCE SECTION */}
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "normal",
              letterSpacing: "1px",
              fontVariant: "small-caps",
              marginBottom: "3px",
              paddingBottom: "2px",
              borderBottom: "0.75px solid #000",
            }}
          >
            {data.sectionNames?.experience || "Experience"}
          </h2>

          {/* Map through all experience entries */}
          {data.experience?.map((exp, index) => (
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
                <div style={{ fontWeight: "bold", fontSize: "10.5pt" }}>
                  {exp.position || "Software Engineer Intern"}
                </div>
                <div style={{ fontSize: "10.5pt" }}>
                  {exp.startDate || "June 2020"} – {exp.endDate || "Present"}
                </div>
              </div>
              <div
                className="flex justify-between"
                style={{
                  fontSize: "9.5pt",
                  fontStyle: "italic",
                  marginBottom: "3px",
                }}
              >
                <div>{exp.company || "Texas A&M University"}</div>
                <div>{exp.location || "College Station, TX"}</div>
              </div>
              <ul
                style={{
                  listStyleType: "disc",
                  marginLeft: "15px",
                  fontSize: "9.5pt",
                  lineHeight: "1.25",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              >
                {exp.bullets?.filter((bullet) => bullet.trim()).length > 0 ? (
                  exp.bullets
                    ?.filter((bullet) => bullet.trim())
                    .map((bullet, bulletIndex) => (
                      <li
                        key={bulletIndex}
                        style={{ marginBottom: "1.5px", paddingLeft: "2px" }}
                      >
                        {bullet.trim()}
                      </li>
                    ))
                ) : (
                  <>
                    <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                      Developed a REST API using FastAPI and PostgreSQL to store
                      data from learning management systems
                    </li>
                    <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                      Developed a full-stack web application using Flask, React,
                      PostgreSQL and Docker to analyze GitHub data
                    </li>
                    <li style={{ marginBottom: "1.5px", paddingLeft: "2px" }}>
                      Explored ways to visualize GitHub collaboration in a
                      classroom setting
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>

        {/* PROJECTS SECTION */}
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "normal",
              letterSpacing: "1px",
              fontVariant: "small-caps",
              marginBottom: "3px",
              paddingBottom: "2px",
              borderBottom: "0.75px solid #000",
            }}
          >
            {data.sectionNames?.projects || "Projects"}
          </h2>

          {data.projects?.map((project) => (
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
                <div style={{ fontSize: "9.5pt" }}>
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

                <div style={{ fontSize: "9.5pt" }}>
                  {project.startDate || ""}
                  {project.endDate ? ` – ${project.endDate}` : ""}
                </div>
              </div>

              <ul
                style={{
                  listStyleType: "disc",
                  marginLeft: "15px",
                  fontSize: "9.5pt",
                  lineHeight: "1.25",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                }}
              >
                {project.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    style={{ marginBottom: "1.5px", paddingLeft: "2px" }}
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TECHNICAL SKILLS SECTION */}
        <div style={{ marginTop: "10px" }}>
          <h2
            style={{
              fontSize: "11pt",
              fontWeight: "normal",
              letterSpacing: "1px",
              fontVariant: "small-caps",
              marginBottom: "3px",
              paddingBottom: "2px",
              borderBottom: "0.75px solid #000",
            }}
          >
            {data.sectionNames?.skills || "Technical Skills"}
          </h2>

          <div
            style={{
              fontSize: "9.5pt",
              lineHeight: "1.35",
              marginTop: "5px",
              marginLeft: "0px",
              paddingLeft: "12px",
              paddingRight: "12px",
            }}
          >
            <div style={{ marginBottom: "2px" }}>
              <span style={{ fontWeight: "bold" }}>Languages</span>:{" "}
              {data.skills?.languages ||
                "Java, Python, JavaScript, TypeScript, SQL, HTML, CSS"}
            </div>
            <div style={{ marginBottom: "2px" }}>
              <span style={{ fontWeight: "bold" }}>Frameworks</span>:{" "}
              {data.skills?.frameworks ||
                "React, Node.js, Flask, JUnit, WordPress, Material-UI, FastAPI"}
            </div>
            <div style={{ marginBottom: "2px" }}>
              <span style={{ fontWeight: "bold" }}>Developer Tools</span>:{" "}
              {data.skills?.developerTools ||
                "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse"}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>Libraries</span>:{" "}
              {data.skills?.libraries || "pandas, NumPy, Matplotlib"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
