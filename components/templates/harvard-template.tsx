// import { ResumeData } from "@/types/resume-data";

// export function HarvardTemplate({ data }: { data: ResumeData }) {
//   return (
//     <div
//       className="bg-white p-4 text-[6px] text-gray-900 h-full leading-tight"
//       style={{ fontFamily: "Georgia, serif" }}
//     >
//       <div className="text-center border-b-2 border-gray-900 pb-2 mb-2">
//         <div className="text-[14px] font-bold tracking-wide">
//           {data.personalInfo.fullName || "Sarah Johnson"}
//         </div>
//         <div className="text-[5px] text-gray-700 mt-0.5">
//           {data.personalInfo.location || "San Francisco, CA"} •{" "}
//           {data.personalInfo.phone || "(415) 555-0123"} •{" "}
//           {data.personalInfo.email || "sarah.johnson@email.com"}
//         </div>
//         <div className="text-[5px] text-gray-700">
//           {data.personalInfo.linkedin || "linkedin.com/in/sarahjohnson"} •{" "}
//           {data.personalInfo.github || "github.com/sjohnson"}
//         </div>
//       </div>

//       {/* Education */}
//       <section className="mb-2">
//         <div className="text-[7px] font-bold uppercase tracking-wider border-b border-gray-400 mb-1">
//           Education
//         </div>
//         {data.education?.map((edu, i) => (
//           <div key={i} className="mb-1">
//             <div className="flex justify-between text-[6px]">
//               <span className="font-semibold">{edu.school}</span>
//               <span>{edu.endDate}</span>
//             </div>
//             <div className="flex justify-between italic text-[5px]">
//               <span>{edu.degree}</span>
//               <span>
//                 {edu.startDate} – {edu.endDate}
//               </span>
//             </div>
//             {edu.details && (
//               <div className="text-[5px] text-gray-600 mt-0.5">
//                 {edu.details}
//               </div>
//             )}
//           </div>
//         ))}
//       </section>

//       {/* Experience */}
//       <section className="mb-2">
//         <div className="text-[7px] font-bold uppercase tracking-wider border-b border-gray-400 mb-1">
//           Experience
//         </div>
//         {data.experience?.map((exp, i) => (
//           <div key={i} className="mb-1.5">
//             <div className="flex justify-between text-[6px]">
//               <span className="font-semibold">{exp.company}</span>
//               <span>{exp.location}</span>
//             </div>
//             <div className="flex justify-between italic text-[5px]">
//               <span>{exp.role}</span>
//               <span>
//                 {exp.startDate} – {exp.endDate}
//               </span>
//             </div>
//             <ul className="list-disc ml-2 text-[5px] mt-0.5 space-y-0.5">
//               {exp.description.map((d, idx) => (
//                 <li key={idx}>{d}</li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </section>

//       {/* Skills */}
//       {data.skills?.length > 0 && (
//         <section>
//           <div className="text-[7px] font-bold uppercase tracking-wider border-b border-gray-400 mb-1">
//             Skills
//           </div>
//           <ul className="list-disc ml-2 text-[5px] space-y-0.5">
//             {data.skills.map((skill, idx) => (
//               <li key={idx}>{skill}</li>
//             ))}
//           </ul>
//         </section>
//       )}
//     </div>
//   );
// }
