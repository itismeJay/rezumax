// components/pdf/jake-ryan-pdf.tsx
// React-PDF version of the Jake Ryan resume template.
// Mirrors the HTML preview template exactly so the downloaded PDF matches.

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Link,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume-data";

// ─── Register fonts (Times New Roman equivalents from Google Fonts) ────
// Using "Times New Roman" via system-available serif fallback isn't reliable
// in react-pdf, so we register open-source equivalents.

// ─── Styles ────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 38,
    fontFamily: "Times-Roman",
    fontSize: 10.5,
    lineHeight: 1.3,
    color: "#000",
    backgroundColor: "#fff",
  },

  // Header
  headerWrap: { textAlign: "center", marginBottom: 6 },
  fullName: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    letterSpacing: 0.5,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  contactLine: { fontSize: 10, marginTop: 2 },
  link: { color: "#000", textDecoration: "underline" },

  // Sections
  sectionWrap: { marginTop: 1, marginBottom: 1 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginTop: 0,
    marginBottom: 2,
    paddingBottom: 2,
    borderBottomWidth: 0.75,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
  },

  // Rows
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  bold11: { fontFamily: "Times-Bold", fontSize: 10.5 },
  normal11: { fontSize: 10.5 },
  italic10: { fontSize: 10, fontStyle: "italic" },
  normal10: { fontSize: 10 },
  content: { paddingHorizontal: 10 },
  entryWrap: { marginBottom: 4, paddingHorizontal: 10 },
  entryWrapLarge: { marginBottom: 5, paddingHorizontal: 10 },

  // Bullets
  bulletList: { marginLeft: 2, paddingHorizontal: 5 },
  bulletItem: {
    fontSize: 10,
    lineHeight: 1.3,
    marginBottom: 1.5,
    paddingLeft: 2,
  },

  // Skills
  skillLine: { fontSize: 10, lineHeight: 1.35 },

  // Publications inline
  pubWrap: {
    marginBottom: 4,
    paddingHorizontal: 10,
    fontSize: 10,
    lineHeight: 1.3,
  },

  // Credential / small
  small9: { fontSize: 9, color: "#555" },
});

// ─── Helpers ───────────────────────────────────────────────────────────

function SectionHeader({ title }: { title: string }) {
  return <Text style={s.sectionTitle}>{title.toUpperCase()}</Text>;
}

function BulletList({ items }: { items: string[] }) {
  const filtered = items.filter((b) => b.trim());
  if (filtered.length === 0) return null;
  return (
    <View style={s.bulletList}>
      {filtered.map((bullet, i) => (
        <View key={i} style={{ flexDirection: "row", marginBottom: 1.5 }}>
          <Text style={{ fontSize: 10, marginRight: 4 }}>•</Text>
          <Text style={s.bulletItem}>{bullet.trim()}</Text>
        </View>
      ))}
    </View>
  );
}

function DateRange({
  start,
  end,
  size = 11,
}: {
  start?: string;
  end?: string;
  size?: number;
}) {
  if (!start && !end) return null;
  const text = `${start || ""}${start && end ? " – " : ""}${end || ""}`;
  return <Text style={{ fontSize: size }}>{text}</Text>;
}

// ─── Section components ────────────────────────────────────────────────

function SummaryPdf({ title, data }: { title: string; data: any }) {
  if (!data?.summary?.trim()) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      <View style={s.content}>
        <Text style={{ fontSize: 10, lineHeight: 1.35, textAlign: "justify" }}>
          {data.summary}
        </Text>
      </View>
    </View>
  );
}

function EducationPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((e) => e.school || e.degree)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((e) => e.school || e.degree)
        .map((edu, i) => (
          <View key={edu.id || i} style={s.entryWrap}>
            <View style={s.row}>
              <Text style={s.bold11}>{edu.school || ""}</Text>
              <Text style={s.normal11}>{edu.location || ""}</Text>
            </View>
            <View style={s.row}>
              <Text style={s.italic10}>
                {edu.degree || ""}
                {edu.gpa ? ` (GPA: ${edu.gpa})` : ""}
              </Text>
              <DateRange
                start={edu.startDate}
                end={edu.graduateDate}
                size={10}
              />
            </View>
            {edu.coursework && (
              <Text style={s.normal10}>
                <Text style={{ fontFamily: "Times-Bold" }}>
                  Relevant Coursework:{" "}
                </Text>
                {edu.coursework}
              </Text>
            )}
          </View>
        ))}
    </View>
  );
}

function ExperiencePdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((e) => e.position || e.company)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((e) => e.position || e.company)
        .map((exp, i) => (
          <View key={exp.id || i} style={s.entryWrapLarge}>
            <View style={s.row}>
              <Text style={s.bold11}>{exp.position || ""}</Text>
              <DateRange start={exp.startDate} end={exp.endDate} />
            </View>
            <View style={{ ...s.row, marginBottom: 3 }}>
              <Text style={s.italic10}>{exp.company || ""}</Text>
              <Text style={s.italic10}>{exp.location || ""}</Text>
            </View>
            {exp.bullets?.length > 0 && <BulletList items={exp.bullets} />}
          </View>
        ))}
    </View>
  );
}

function ProjectsPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((p) => p.name)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((p) => p.name)
        .map((project, i) => (
          <View key={project.id || i} style={s.entryWrapLarge}>
            <View style={{ ...s.row, marginBottom: 3 }}>
              <Text style={s.normal10}>
                <Text style={{ fontFamily: "Times-Bold" }}>{project.name}</Text>
                {project.projectLink && (
                  <Text>
                    {" ("}
                    <Link
                      src={
                        project.projectLink.startsWith("http")
                          ? project.projectLink
                          : `https://${project.projectLink}`
                      }
                      style={s.link}
                    >
                      link
                    </Link>
                    {")"}
                  </Text>
                )}
                {project.technologies && (
                  <Text style={{ fontStyle: "italic" }}>
                    {" "}
                    | {project.technologies}
                  </Text>
                )}
              </Text>
              <DateRange
                start={project.startDate}
                end={project.endDate}
                size={10}
              />
            </View>
            {project.bullets?.length > 0 && (
              <BulletList items={project.bullets} />
            )}
          </View>
        ))}
    </View>
  );
}

function SkillsPdf({ title, data }: { title: string; data: any }) {
  if (!data || !Object.values(data).some((v) => v)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      <View style={s.content}>
        {data.languages && (
          <Text style={s.skillLine}>
            <Text style={{ fontFamily: "Times-Bold" }}>Languages: </Text>
            {data.languages}
          </Text>
        )}
        {data.frameworks && (
          <Text style={s.skillLine}>
            <Text style={{ fontFamily: "Times-Bold" }}>Frameworks: </Text>
            {data.frameworks}
          </Text>
        )}
        {data.developerTools && (
          <Text style={s.skillLine}>
            <Text style={{ fontFamily: "Times-Bold" }}>Developer Tools: </Text>
            {data.developerTools}
          </Text>
        )}
        {data.libraries && (
          <Text style={s.skillLine}>
            <Text style={{ fontFamily: "Times-Bold" }}>Libraries: </Text>
            {data.libraries}
          </Text>
        )}
      </View>
    </View>
  );
}

function CertificationsPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((c) => c.name)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((c) => c.name)
        .map((cert, i) => (
          <View key={cert.id || i} style={s.entryWrap}>
            <View style={s.row}>
              <Text style={s.normal10}>
                <Text style={{ fontFamily: "Times-Bold" }}>{cert.name}</Text>
                {cert.issuer && (
                  <Text style={{ fontStyle: "italic" }}> - {cert.issuer}</Text>
                )}
              </Text>
              <Text style={s.normal10}>{cert.date || ""}</Text>
            </View>
            {cert.credentialId && (
              <Text style={s.small9}>Credential ID: {cert.credentialId}</Text>
            )}
          </View>
        ))}
    </View>
  );
}

function AwardsPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((a) => a.title)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((a) => a.title)
        .map((award, i) => (
          <View key={award.id || i} style={s.entryWrap}>
            <View style={s.row}>
              <Text style={s.normal10}>
                <Text style={{ fontFamily: "Times-Bold" }}>{award.title}</Text>
                {award.issuer && (
                  <Text style={{ fontStyle: "italic" }}> - {award.issuer}</Text>
                )}
              </Text>
              <Text style={s.normal10}>{award.date || ""}</Text>
            </View>
            {award.description && (
              <Text style={{ fontSize: 10, marginTop: 2, lineHeight: 1.3 }}>
                {award.description}
              </Text>
            )}
          </View>
        ))}
    </View>
  );
}

function LeadershipPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((r) => r.role || r.organization)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((r) => r.role || r.organization)
        .map((role, i) => (
          <View key={role.id || i} style={s.entryWrapLarge}>
            <View style={s.row}>
              <Text style={s.bold11}>{role.role || ""}</Text>
              <DateRange start={role.startDate} end={role.endDate} />
            </View>
            <Text style={{ ...s.italic10, marginBottom: 3 }}>
              {role.organization || ""}
            </Text>
            {role.achievements?.length > 0 && (
              <BulletList items={role.achievements} />
            )}
          </View>
        ))}
    </View>
  );
}

function ResearchPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((r) => r.title)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((r) => r.title)
        .map((research, i) => (
          <View key={research.id || i} style={s.entryWrapLarge}>
            <View style={s.row}>
              <Text style={s.bold11}>{research.title}</Text>
              <DateRange start={research.startDate} end={research.endDate} />
            </View>
            <Text style={{ ...s.italic10, marginBottom: 3 }}>
              {research.institution || ""}
              {research.advisor && ` | Advisor: ${research.advisor}`}
            </Text>
            {research.summary && (
              <Text style={{ fontSize: 10, marginTop: 2, lineHeight: 1.3 }}>
                {research.summary}
              </Text>
            )}
          </View>
        ))}
    </View>
  );
}

function PublicationsPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((p) => p.title)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((p) => p.title)
        .map((pub, i) => (
          <View key={pub.id || i} style={s.pubWrap}>
            <Text>
              {pub.authors && (
                <Text style={{ fontStyle: "italic" }}>{pub.authors}. </Text>
              )}
              <Text style={{ fontFamily: "Times-Bold" }}>{pub.title}.</Text>
              {pub.publisher && (
                <Text style={{ fontStyle: "italic" }}> {pub.publisher}</Text>
              )}
              {pub.date && <Text>, {pub.date}</Text>}
              {pub.link && (
                <Text>
                  {" "}
                  <Link
                    src={
                      pub.link.startsWith("http")
                        ? pub.link
                        : `https://${pub.link}`
                    }
                    style={s.link}
                  >
                    [Link]
                  </Link>
                </Text>
              )}
            </Text>
          </View>
        ))}
    </View>
  );
}

function VolunteerPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((v) => v.role || v.organization)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((v) => v.role || v.organization)
        .map((vol, i) => (
          <View key={vol.id || i} style={s.entryWrapLarge}>
            <View style={s.row}>
              <Text style={s.bold11}>{vol.role || ""}</Text>
              <DateRange start={vol.startDate} end={vol.endDate} />
            </View>
            <Text style={{ ...s.italic10, marginBottom: 3 }}>
              {vol.organization || ""}
            </Text>
            {vol.description &&
              (Array.isArray(vol.description) ? (
                <BulletList items={vol.description} />
              ) : (
                <Text style={{ fontSize: 10, marginTop: 2, lineHeight: 1.3 }}>
                  {vol.description}
                </Text>
              ))}
          </View>
        ))}
    </View>
  );
}

function LanguagesPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((l) => l.name)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      <View style={s.content}>
        {data
          .filter((l) => l.name)
          .map((lang, i) => (
            <Text key={lang.id || i} style={{ fontSize: 10, marginBottom: 2 }}>
              <Text style={{ fontFamily: "Times-Bold" }}>{lang.name}: </Text>
              {lang.proficiency || ""}
            </Text>
          ))}
      </View>
    </View>
  );
}

function InterestsPdf({ title, data }: { title: string; data: any }) {
  const text = Array.isArray(data)
    ? data
        .filter((item: any) => item.interest?.trim())
        .map((item: any) => item.interest)
        .join(", ")
    : data?.interests?.trim() || "";

  if (!text) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      <View style={s.content}>
        <Text style={{ fontSize: 10, lineHeight: 1.35 }}>{text}</Text>
      </View>
    </View>
  );
}

function CustomPdf({ title, data }: { title: string; data: any[] }) {
  if (!data?.some((e) => e.title)) return null;
  return (
    <View style={s.sectionWrap}>
      <SectionHeader title={title} />
      {data
        .filter((e) => e.title)
        .map((entry, i) => (
          <View key={entry.id || i} style={s.entryWrapLarge}>
            <View style={s.row}>
              <Text style={s.bold11}>{entry.title || ""}</Text>
              <DateRange start={entry.startDate} end={entry.endDate} />
            </View>
            {(entry.subtitle || entry.location) && (
              <Text style={{ ...s.italic10, marginBottom: 3 }}>
                {entry.subtitle || ""}
                {entry.subtitle && entry.location ? " • " : ""}
                {entry.location || ""}
              </Text>
            )}
            {entry.description &&
              (Array.isArray(entry.description) ? (
                <BulletList items={entry.description} />
              ) : (
                <Text style={{ fontSize: 10, marginTop: 2, lineHeight: 1.3 }}>
                  {entry.description}
                </Text>
              ))}
          </View>
        ))}
    </View>
  );
}

// ─── Section component map ─────────────────────────────────────────────

const PDF_SECTION_MAP: Record<
  string,
  React.ComponentType<{ title: string; data: any }>
> = {
  summary: SummaryPdf,
  education: EducationPdf,
  experience: ExperiencePdf,
  projects: ProjectsPdf,
  skills: SkillsPdf,
  certifications: CertificationsPdf,
  awards: AwardsPdf,
  leadership: LeadershipPdf,
  research: ResearchPdf,
  publications: PublicationsPdf,
  volunteer: VolunteerPdf,
  languages: LanguagesPdf,
  interests: InterestsPdf,
  custom: CustomPdf,
};

// ─── Main Document ─────────────────────────────────────────────────────

export function JakeRyanPdfDocument({ data }: { data: ResumeData }) {
  const visibleSections = data.sections
    .filter((sec) => sec.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <Document>
      <Page size="LETTER" style={s.page}>
        {/* HEADER */}
        <View style={s.headerWrap}>
          <Text style={s.fullName}>{data.personalInfo?.fullName || ""}</Text>
          <Text style={s.contactLine}>
            {data.personalInfo?.phone && `${data.personalInfo.phone} · `}
            {data.personalInfo?.email && (
              <Link src={`mailto:${data.personalInfo.email}`} style={s.link}>
                {data.personalInfo.email}
              </Link>
            )}
            {data.personalInfo?.linkedin && (
              <Text>
                {" · "}
                <Link
                  src={
                    data.personalInfo.linkedin.startsWith("http")
                      ? data.personalInfo.linkedin
                      : `https://linkedin.com/in/${data.personalInfo.linkedin}`
                  }
                  style={s.link}
                >
                  {data.personalInfo.linkedin
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </Link>
              </Text>
            )}
            {data.personalInfo?.github && (
              <Text>
                {" · "}
                <Link
                  src={
                    data.personalInfo.github.startsWith("http")
                      ? data.personalInfo.github
                      : `https://github.com/${data.personalInfo.github}`
                  }
                  style={s.link}
                >
                  {data.personalInfo.github
                    .replace(/^https?:\/\/(www\.)?/, "")
                    .replace(/\/$/, "")}
                </Link>
              </Text>
            )}
          </Text>
        </View>

        {/* DYNAMIC SECTIONS */}
        {visibleSections.map((section) => {
          const SectionComponent = PDF_SECTION_MAP[section.type];
          if (!SectionComponent) return null;
          return (
            <SectionComponent
              key={section.id}
              title={section.title}
              data={section.data}
            />
          );
        })}
      </Page>
    </Document>
  );
}
