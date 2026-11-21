/**
 * Education registry. The PhD is ongoing study and must never be presented as
 * a completed degree. Dates follow the corrected CV exactly.
 */

export interface EducationEntry {
  credential: string;
  field: string;
  institution: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  note?: string;
}

export const education: EducationEntry[] = [
  {
    credential: "PhD Student in Machine Learning / AI",
    field: "Machine Learning and AI",
    institution: "Carnegie Mellon University",
    startDate: "2026",
    endDate: "Ongoing",
    ongoing: true,
    note: "Research focus: deep learning. Displayed as ongoing study, not a completed degree.",
  },
  {
    credential: "MS in Software Engineering",
    field: "Software Engineering (online program)",
    institution: "Drexel University",
    startDate: "2022",
    endDate: "2024",
    ongoing: false,
  },
  {
    credential: "BS in Computer Science",
    field: "Computer Science",
    institution: "Temple University",
    startDate: "2019",
    endDate: "2021",
    ongoing: false,
  },
  {
    credential: "AS in Computer Science",
    field: "Computer Science",
    institution: "Community College of Philadelphia",
    startDate: "2017",
    endDate: "2019",
    ongoing: false,
  },
];
