// /components/templates/JakeRyan.tsx
import React from "react";
import { ResumeData } from "@/types/resume-data";

interface JakeRyanProps {
  data: ResumeData; // Pass dynamic resume data if needed
}

export const JakeRyan: React.FC<JakeRyanProps> = ({ data }) => {
  return (
    <div
      className="bg-white p-4 text-[6px] text-gray-900 h-full leading-tight"
      style={{ fontFamily: "Times New Roman, serif" }}
    >
      {/* Header */}
      <div className="text-center mb-2">
        <div className="text-[12px] font-bold tracking-wide uppercase">
          Jake Ryan
        </div>
        <div className="text-[5px] mt-0.5 flex items-center justify-center gap-1 flex-wrap">
          <span>123-456-7890</span>
          <span>|</span>
          <span className="text-blue-700 underline">jake@su.edu</span>
          <span>|</span>
          <span className="text-blue-700 underline">linkedin.com/in/jake</span>
          <span>|</span>
          <span className="text-blue-700 underline">github.com/jake</span>
        </div>
      </div>

      {/* Education */}
      <div className="border-b border-gray-900 mb-1">
        <div className="text-[7px] font-bold uppercase">Education</div>
      </div>
      <div className="mb-1.5">
        <div className="flex justify-between text-[6px]">
          <span className="font-bold">Southwestern University</span>
          <span>Georgetown, TX</span>
        </div>
        <div className="flex justify-between italic text-[5px]">
          <span>Bachelor of Arts in Computer Science, Minor in Business</span>
          <span>Aug. 2018 – May 2021</span>
        </div>
      </div>
      <div className="mb-1.5">
        <div className="flex justify-between text-[6px]">
          <span className="font-bold">Blinn College</span>
          <span>Bryan, TX</span>
        </div>
        <div className="flex justify-between italic text-[5px]">
          <span>Associate's in Liberal Arts</span>
          <span>Aug. 2014 – May 2018</span>
        </div>
      </div>

      {/* Experience */}
      <div className="border-b border-gray-900 mb-1">
        <div className="text-[7px] font-bold uppercase">Experience</div>
      </div>
      <div className="mb-1.5">
        <div className="flex justify-between text-[6px]">
          <span className="font-bold">Undergraduate Research Assistant</span>
          <span>June 2020 – Present</span>
        </div>
        <div className="flex justify-between italic text-[5px]">
          <span>Texas A&M University</span>
          <span>College Station, TX</span>
        </div>
        <ul className="list-disc ml-2 text-[5px] mt-0.5 space-y-0.5">
          <li>
            Developed a REST API using FastAPI and PostgreSQL to store data from
            learning management systems
          </li>
          <li>
            Developed a full-stack web application using Flask, React,
            PostgreSQL and Docker to analyze GitHub data
          </li>
          <li>
            Explored ways to visualize GitHub collaboration in a classroom
            setting
          </li>
        </ul>
      </div>
      <div className="mb-1.5">
        <div className="flex justify-between text-[6px]">
          <span className="font-bold">
            Information Technology Support Specialist
          </span>
          <span>Sep. 2018 – Present</span>
        </div>
        <div className="flex justify-between italic text-[5px]">
          <span>Southwestern University</span>
          <span>Georgetown, TX</span>
        </div>
        <ul className="list-disc ml-2 text-[5px] mt-0.5 space-y-0.5">
          <li>
            Communicate with managers to set up campus computers used on campus
          </li>
          <li>
            Assess and troubleshoot computer problems brought by students,
            faculty and staff
          </li>
          <li>
            Maintain upkeep of computers, classroom equipment, and 200 printers
            across campus
          </li>
        </ul>
      </div>

      {/* Projects */}
      <div className="border-b border-gray-900 mb-1">
        <div className="text-[7px] font-bold uppercase">Projects</div>
      </div>
      <div className="mb-1">
        <div className="text-[6px]">
          <span className="font-bold">Gitlytics</span>
          <span className="italic">
            {" "}
            | Python, Flask, React, PostgreSQL, Docker
          </span>
        </div>
        <ul className="list-disc ml-2 text-[5px] mt-0.5 space-y-0.5">
          <li>
            Developed a full-stack web application with Flask serving a REST API
            and React as the frontend
          </li>
          <li>Implemented GitHub OAuth to get data from user's repositories</li>
          <li>Visualized GitHub data to show collaboration</li>
          <li>Used Celery and Redis for asynchronous tasks</li>
        </ul>
      </div>

      {/* Technical Skills */}
      <div className="border-b border-gray-900 mb-1">
        <div className="text-[7px] font-bold uppercase">Technical Skills</div>
      </div>
      <div className="text-[5px] space-y-0.5">
        <div>
          <span className="font-bold">Languages:</span> Java, Python, C/C++, SQL
          (Postgres), JavaScript, HTML/CSS, R
        </div>
        <div>
          <span className="font-bold">Frameworks:</span> React, Node.js, Flask,
          JUnit, WordPress, Material-UI, FastAPI
        </div>
        <div>
          <span className="font-bold">Developer Tools:</span> Git, Docker,
          TravisCI, Google Cloud Platform, VS Code, PyCharm, IntelliJ, Eclipse
        </div>
        <div>
          <span className="font-bold">Libraries:</span> pandas, NumPy,
          Matplotlib
        </div>
      </div>
    </div>
  );
};
