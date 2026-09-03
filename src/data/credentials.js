import awsCert from '../assets/images/aws_cert_mockup.png';
import oracleCert from '../assets/images/oracle_cert_mockup.png';
import nvidiaCert from '../assets/images/nvidia_cert_mockup.png';
import deeplearningCert from '../assets/images/deeplearning_cert_mockup.png';

export const CERTIFICATIONS = [
  {
    title: "AWS Academy Machine Learning Foundations",
    issuer: "AWS Academy",
    date: "2025",
    credentialId: "AWS-ML-FND",
    image: awsCert,
    skills: ["AWS", "Machine Learning", "Cloud"],
    description: "AWS Academy Graduate - Machine Learning Foundations.",
    verifyUrl: "#",
    brandColor: "#ff9900",
    brandColorRgb: "255, 153, 0"
  },
  {
    title: "Web Development",
    issuer: "Udemy",
    date: "2025",
    credentialId: "UDEMY-WEB-DEV",
    image: deeplearningCert,
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js"],
    description: "Complete full-stack web development bootcamp covering frontend and backend technologies.",
    verifyUrl: "#",
    brandColor: "#a435f0",
    brandColorRgb: "164, 53, 240"
  },
  {
    title: "Java Programming: Beginner to Master",
    issuer: "Udemy",
    date: "2025",
    credentialId: "UDEMY-JAVA",
    image: oracleCert,
    skills: ["Java", "OOP", "Data Structures"],
    description: "Comprehensive Java programming course covering core concepts to advanced features.",
    verifyUrl: "#",
    brandColor: "#a435f0",
    brandColorRgb: "164, 53, 240"
  },
  {
    title: "AI Infrastructure and Operations Fundamentals",
    issuer: "NVIDIA (Coursera)",
    date: "Jul 28, 2026",
    credentialId: "2BFXUY0E92VK",
    image: nvidiaCert,
    skills: ["AI", "Infrastructure", "MLOps", "NVIDIA", "Coursera"],
    description: "Completed NVIDIA's AI Infrastructure and Operations Fundamentals course on Coursera, covering AI infrastructure, GPU computing, deployment workflows, and operational fundamentals for AI systems.",
    verifyUrl: "https://coursera.org/verify/2BFXUY0E92VK",
    brandColor: "#76b900",
    brandColorRgb: "118, 185, 0"
  }
];

export const ACADEMIC_HONORS = [
  {
    title: "B.Tech in Computer Science and Engineering",
    institution: "IILM University, Greater Noida",
    detail: "Expected Graduation: Aug 2027",
    year: "2023 – 2027"
  }
];

export const SKILL_BADGES = [
  { name: "Full-Stack Web Development", level: "Advanced", icon: "🌐" },
  { name: "Machine Learning (Python)", level: "Proficient", icon: "🤖" },
  { name: "Java & OOP", level: "Expert", icon: "☕" },
  { name: "Database Management", level: "Proficient", icon: "🗄️" },
];
