import { ResumeData } from "@/types/resume-data";

export function FaangReadyTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      className="bg-white p-4 text-[6px] text-gray-900 h-full leading-tight"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="text-center mb-2">
        <div className="text-[14px] font-bold">
          {data.personalInfo.fullName || "Michael Zhang"}
        </div>
        <div className="text-[5px] flex justify-center gap-1.5 text-gray-600">
          <span>{data.personalInfo.email || "michael.zhang@email.com"}</span> •
          <span>{data.personalInfo.phone || "(628) 555-0199"}</span> •
          <span>{data.personalInfo.linkedin || "linkedin.com/in/mzhang"}</span>{" "}
          •<span>{data.personalInfo.github || "github.com/mzhang"}</span>
        </div>
      </div>

      {/* Experience */}
      <section className="mb-2">
        <div className="text-[7px] font-bold bg-gray-100 px-1.5 py-0.5">
          EXPERIENCE
        </div>
        {data.experience?.map((exp, i) => (
          <div key={i} className="mt-1">
            <div className="flex justify-between text-[6px]">
              <span className="font-semibold">
                {exp.company} — {exp.role}
              </span>
              <span>
                {exp.startDate} – {exp.endDate}
              </span>
            </div>
            <ul className="list-disc ml-2 text-[5px] mt-0.5 space-y-0.5">
              {exp.description.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-2">
        <div className="text-[7px] font-bold bg-gray-100 px-1.5 py-0.5">
          EDUCATION
        </div>
        {data.education?.map((edu, i) => (
          <div key={i} className="mt-1 flex justify-between text-[5px]">
            <span>
              <b>{edu.school}</b> — {edu.degree}
            </span>
            <span>{edu.endDate}</span>
          </div>
        ))}
      </section>

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mb-2">
          <div className="text-[7px] font-bold bg-gray-100 px-1.5 py-0.5">
            PROJECTS
          </div>
          {data.projects.map((proj, i) => (
            <div key={i} className="mt-1 text-[6px]">
              <span className="font-semibold">{proj.title}</span>
              {proj.tech && <span className="text-[5px]"> | {proj.tech}</span>}
              <ul className="list-disc ml-2 text-[5px] mt-0.5 space-y-0.5">
                {proj.description.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <div className="text-[7px] font-bold bg-gray-100 px-1.5 py-0.5">
            SKILLS
          </div>
          <ul className="list-disc ml-2 text-[5px] mt-1 space-y-0.5">
            {data.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
