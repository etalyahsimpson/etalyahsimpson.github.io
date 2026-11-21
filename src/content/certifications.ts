/**
 * Certifications with exact names and years from the corrected CV.
 * No verification URLs or credential IDs are published because none were
 * supplied: cards intentionally carry names and years only.
 */

export interface Certification {
  name: string;
  year: number;
  issuer: string;
}

export const certifications: Certification[] = [
  {
    name: "AWS Certified Solutions Architect – Associate",
    year: 2025,
    issuer: "Amazon Web Services",
  },
  {
    name: "Google Cloud Professional Machine Learning Engineer",
    year: 2024,
    issuer: "Google Cloud",
  },
  {
    name: "DeepLearning.AI Deep Learning Specialization",
    year: 2022,
    issuer: "Coursera",
  },
  {
    name: "AWS Machine Learning Foundations",
    year: 2021,
    issuer: "Amazon Web Services",
  },
  {
    name: "Salesforce Marketing Cloud",
    year: 2020,
    issuer: "Salesforce",
  },
];
