import { ResumeData } from "@/types/resume-data";

export function JakeTaylorTemplate({ data }: { data: ResumeData }) {
  return (
    <div
      className="bg-white p-4 text-[6px] text-gray-900 h-full leading-tight"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="mb-2">
        <div className="text-[14px] font-bold">
          {data.personalInfo.fullName || "Jake Taylor"}
        </div>
        <div className="text-[5px] text-gray-600 mt-0.5">
          {data.personalInfo.phone || "012 345 6789"} |{" "}
          {data.personalInfo.email || "jaketaylor@ut.edu"} |{" "}
          {data.personalInfo.linkedin || "linkedin.com/in/j-taylor"} |{" "}
          {data.personalInfo.github || "github.com/jake"}
        </div>
      </div>

      {/* Education */}
      <section className="mb-2">
        <div className="text-[7px] font-bold uppercase tracking-widest border-b border-gray-400 pb-0.5 mb-1">
          Education
        </div>
        {data.education?.map((edu, i) => (
          <div key={i} className="mb-1">
            <div className="flex justify-between text-[6px]">
              <span className="font-bold">{edu.degree}</span>
              <span>{edu.endDate}</span>
            </div>
            <div className="flex justify-between text-[5px] text-gray-600">
              <span>{edu.school}</span>
              <span>{edu.location}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="mb-2">
        <div className="text-[7px] font-bold uppercase tracking-widest border-b border-gray-400 pb-0.5 mb-1">
          Work Experience
        </div>
        {data.experience?.map((exp, i) => (
          <div key={i} className="mb-1.5">
            <div className="flex justify-between text-[6px]">
              <span className="font-bold">{exp.role}</span>
              <span>
                {exp.startDate} – {exp.endDate}
              </span>
            </div>
            <div className="flex justify-between text-[5px] text-gray-600">
              <span>{exp.company}</span>
              <span>{exp.location}</span>
            </div>
            <ul className="list-disc ml-2 text-[5px] mt-0.5 space-y-0.5">
              {exp.description.map((d, idx) => (
                <li key={idx}>{d}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section>
          <div className="text-[7px] font-bold uppercase tracking-widest border-b border-gray-400 pb-0.5 mb-1">
            Technical Skills
          </div>
          <ul className="list-disc ml-2 text-[5px] space-y-0.5">
            {data.skills.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
