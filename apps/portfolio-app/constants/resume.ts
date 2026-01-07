export type ExperienceItem = {
  title: string;
  company: string;
  period: string; // e.g., "Jan 2022 — Present"
  location?: string;
  description: string;
  stack?: string[];
  highlights?: string[];
};

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: "Senior Software Engineer",
    company: "GEP Worldwide",
    period: "March 2025 – Present",
    location: "Navi Mumbai, India",
    description:
      "Leading backend and platform improvements across microservices with a focus on resiliency, scalability, and developer velocity.",
    stack: [
      "Azure",
      "Kubernetes",
      "REST APIs",
      "Kafka",
      "CI/CD",
      "TDD",
      "Aspose",
    ],
    highlights: [
      "Developed scalable RESTful APIs, improving system resilience by 25% and reducing production downtime.",
      "Deployed cloud-ready microservices on Azure with Kubernetes, reducing build-release times by ~30%.",
      "Implemented facade design pattern to cut backend maintenance effort by ~20%.",
      "Built PDF/Word export features with Aspose, accelerating report generation by up to 50%.",
      "Mentored junior engineers and drove adoption of Agile, TDD, and CI/CD for higher code quality and faster delivery.",
      "Integrated Kafka for asynchronous event processing between microservices, improving scalability and reducing coupling.",
    ],
  },
  {
    title: "Software Engineer",
    company: "GEP Worldwide",
    period: "June 2022 – Feb 2025",
    location: "Navi Mumbai, India",
    description:
      "Delivered data-heavy features and UI modules; optimized ingestion pipelines and reliability across the platform.",
    stack: [
      "Angular",
      "Highcharts",
      "RxJS",
      "Lodash",
      "Node.js",
      "New Relic",
      "Kibana",
    ],
    highlights: [
      "Built a configurable Scheduler API automating monthly reports and market index alerts, boosting efficiency and accuracy by ~30%.",
      "Created interactive, performant UI modules (Angular, Highcharts, RxJS, Lodash) improving data interpretation by ~20%.",
      "Optimized memory management for large Excel ingestion (>1M rows) with ~50% processing time improvement.",
      "Resolved high-severity production issues, significantly improving platform stability using New Relic and Kibana.",
    ],
  },
  {
    title: "Associate - Software Engineer",
    company: "GEP Worldwide",
    period: "Jan 2022 – May 2022",
    location: "Navi Mumbai, India",
    description: "Assisted in developing and testing software features, gaining hands-on experience with full software development lifecycle.",
    stack: ["JavaScript", ".Net Core", "MySQL", "Git"],
    highlights: [
      "Contributed to backend feature development using JavaScript and .Net framework, enhancing application functionality.",
        "Participated in code reviews and testing, ensuring high-quality software delivery.",
        "Collaborated with cross-functional teams to understand requirements and deliver solutions.",
    ],
    
  }
];

export type CertificationItem = {
  name: string;
  issuer: string;
  issueDate: string; // e.g., "Aug 2024"
  credentialId?: string;
  credentialUrl?: string;
};

export const CERTIFICATIONS: CertificationItem[] = [
  // TODO: Replace with real certifications from resume PDF
  // Example:
  {
    name: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    issueDate: "Aug 2024",
    credentialId: "ABC123",
    credentialUrl: "https://verify.aws.training/...",
  },
];
