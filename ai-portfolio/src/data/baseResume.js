// src/data/baseResume.js

export const baseResumeContent = `
Pari Goyal
[Your Contact Info: Email, LinkedIn, GitHub]

Summary:
Results-driven Computer Science student with a strong foundation in full-stack development, DevOps practices, and emerging AI technologies. Passionate about building innovative solutions and continuously learning new paradigms.

Experience:

Software Development Intern | Tech Solutions Inc. | May 2024 - Aug 2024
- Developed responsive web applications using React and Next.js, integrating RESTful APIs for data management.
- Collaborated with a team of 5 to design and manage MongoDB databases, ensuring data integrity and efficient querying for key features.
- Implemented CI/CD pipelines with GitLab CI/CD, which improved deployment frequency by 30% and reduced manual errors.

Project Lead | University Capstone Project | Sep 2023 - Dec 2023
- Led a team of 4 to develop a secure online voting system using MERN stack, ensuring end-to-end encryption.
- Coordinated task assignments and conducted code reviews, improving team efficiency by 20%.

Skills:
Languages: JavaScript (ES6+), Python, HTML, CSS, SQL, Bash
Frameworks/Libraries: React, Next.js, Node.js, Express, Langchain, Bootstrap
Databases: MongoDB, PostgreSQL
DevOps/Cloud: Docker, Linux, AWS (EC2, S3), Git, GitLab CI/CD, Ansible, Terraform
Concepts: OOP, OS, CN, DBMS, Generative AI, Prompt Engineering

Education:
Diploma in Computer Science | Thapar Polytechnic College | 2020-2023
B.E. in Computer Science | Thapar Institute of Engineering and Tech | 2023-2026 (Expected)

Achievements:
- Patent Pending: Smart Gut Breath Analyzer - Developed a novel device for early disease detection.
- Dean's List for academic excellence (multiple semesters).
`;

// You can also export just bullet points for the AI to focus on, if the full text is too much for context window.
// Let's use the full text for now, and the AI will extract/rephrase from it.
export const baseResumeBulletPoints = [
  "Developed responsive web applications using React and Next.js, integrating RESTful APIs.",
  "Designed and managed MongoDB databases, ensuring data integrity and efficient querying.",
  "Implemented CI/CD pipelines with GitLab CI/CD, improving deployment frequency by 30%.",
  "Contributed to open-source projects, collaborating on feature development and bug fixes.",
  "Explored Generative AI models using Python and Langchain for text summarization tasks.",
  "Participated in agile development sprints, delivering features on schedule.",
];