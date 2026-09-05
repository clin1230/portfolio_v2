export const profile = {
  name: "Charlotte Lin",
  role: "Software Engineer & Developer",
  location: "New York, NY",
  email: "clinn1230@gmail.com",
  
  // Hero section text (homepage)
  hero: {
    tagline: "Software Engineer with a builder's heart. I love turning ideas into products and shipping things that help people. Currently architecting cloud and AI systems as a Solutions Architect Intern at AWS.",
    about: "I'm a full-stack software engineer who loves learning new technologies, building end-to-end products, and turning complex problems into simple, reliable systems. My work spans C#, JavaScript, React, and AWS—blending front-end craft with back-end reliability. Along the way, I've shipped production systems for 30K+ users, earned four AWS certifications, and competed in hackathons.",
  },

  // Bio section (about page)
  bio: {
    short: "Building digital experiences that are thoughtfully designed and carefully engineered.",
    long: [
      "I'm Charlotte Lin, a full-stack developer based in New York passionate about building digital experiences that are thoughtfully conceived and refined in execution.",
      "I love building seamless, thoughtful web experiences. My work spans C#, JavaScript, React, and AWS—blending front-end aesthetics with back-end reliability.",
      "I'm passionate about creating tools that feel both beautiful and meaningful, and I'm always open to new opportunities for growth and collaboration.",
    ],
  },

  social: [
    { name: "LinkedIn", href: "https://linkedin.com/in/hsien-ying-lin/" },
    { name: "GitHub", href: "https://github.com/clin1230" },
    { name: "Instagram", href: "https://instagram.com/yourprofile" },
    { name: "Goodreads", href: "https://goodreads.com/yourprofile" },
  ],

  resume: "/resume.pdf",
};

export const experiences = [
  {
    role: "Solutions Architect Intern",
    company: "Amazon Web Services (AWS)",
    period: "May 2026 — Aug 2026",
    description: "Architecting distributed ML inference pipelines on SageMaker, S3, and Lambda for enterprise claims classification, and provisioning scalable cloud infrastructure with AWS CDK using Infrastructure-as-Code.",
  },
  {
    role: "Graduate Student Researcher",
    company: "Cornell Tech",
    period: "Oct 2025 — Present",
    description: "Building a systematic evaluation pipeline to detect and score deceptive design (dark patterns) and usability issues in AI-generated interfaces.",
  },
  {
    role: "Software Development Engineer",
    company: "Pxmart",
    period: "Feb 2024 — Jun 2025",
    description: "Architected microservices-based C#/.NET backend modules with SQL Server optimization—cutting API latency 15% and doubling peak-load throughput—and built full-stack KPI dashboards for 30K+ active users.",
  },
  {
    role: "Data Analyst",
    company: "Giorgio Armani",
    period: "May 2022 — Jun 2023",
    description: "Drove a 10% revenue increase through multi-country sales analysis (US, Canada, Brazil) and built Power BI dashboards and forecasting models that reduced inventory discrepancies by 15%.",
  },
];

export const education = [
  {
    school: "Cornell Tech, Cornell University",
    degree: "MS in Information Systems",
    detail: "Computer Science Certificate candidate · Merit-Based Scholarship Recipient · Student Ambassador",
    location: "New York, NY",
    period: "Aug 2025 — May 2027",
  },
];

export const certifications = [
  "AWS Certified Solutions Architect – Associate",
  "AWS Certified Machine Learning Engineer – Associate",
  "AWS Certified AI Practitioner",
  "AWS Certified Cloud Practitioner",
];

export const skills = {
  languages: ["Python", "JavaScript", "TypeScript", "C#", "Go", "Java", "C++", "SQL", "HTML", "CSS"],
  frontend: ["React", "Next.js", "Framer Motion", "Tailwind CSS"],
  backend: ["Node.js", "FastAPI", "Flask", ".NET", "REST APIs"],
  ai: ["OpenAI API", "LangChain", "LangGraph", "RAG", "Vector Databases", "Prompt Engineering", "Vertex AI", "Model Evaluation"],
  data: ["MySQL", "SQL Server", "PostgreSQL", "MongoDB", "DynamoDB", "Redis", "Power BI", "Tableau"],
  tools: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "CI/CD", "Git", "Datadog", "Prometheus", "Grafana", "Figma"],
};


