import "dotenv/config";
import cors from "cors";
import express from "express";

import models, { sequelize } from "./models";
import { person, education, experience, skill, project } from "./routes";

const app = express();
app.set("trust proxy", true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/persons", person);
app.use("/educations", education);
app.use("/experiences", experience);
app.use("/skills", skill);
app.use("/projects", project);

app.get("/", (req, res) => {
  res.status(200).send("Resume API\n" + process.env.MESSAGE);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).send({
      error: "Bad Request: Validation failed.",
      messages: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).send({
      error: "Conflict: Resource already exists.",
      messages: err.errors.map((e) => e.message),
    });
  }

  res.status(500).send({
    error: "Something went wrong! Internal Server Error.",
    message: err.message,
  });
});

const port = process.env.PORT ?? 3000;
const eraseDatabaseOnSync = process.env.ERASE_DATABASE_ON_SYNC === "true";

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await seedDatabase();
  }

  app.listen(port, () =>
    console.log("Resume API listening on port " + port + "! " + process.env.MESSAGE)
  );
});

const seedDatabase = async () => {
  // --- Person 1: Hallason Matias ---
  const hallason = await models.Person.create({
    name: "Hallason Matias",
    email: "hms3@cin.ufpe.br",
    phone: null,
    linkedin: "https://linkedin.com/in/hallason-matias",
    github: "https://github.com/Hallason823",
    summary:
      "Full Stack Developer & AI Engineer with experience in REST APIs, NLP models with Transformers, and cloud infrastructure using Docker and Kubernetes.",
  });

  await models.Education.bulkCreate([
    {
      institution: "Universidade Católica de Pernambuco (UNICAP)",
      course: "Internet Systems",
      degree: "Technologist",
      startDate: "Jul 2024",
      endDate: "Dec 2026",
      description: "Web Programming, Software Engineering, AI, Database Systems",
      personId: hallason.id,
    },
    {
      institution: "Universidade Federal de Pernambuco (UFPE)",
      course: "Mechanical Engineering",
      degree: "Bachelor",
      startDate: "Feb 2019",
      endDate: "Mar 2025",
      description:
        "Mechatronics, Robotics, Control Systems. Exchange at ENSTA Bretagne, France.",
      personId: hallason.id,
    },
  ]);

  await models.Experience.bulkCreate([
    {
      company: "Leadfy Imob",
      role: "Full Stack Developer & AI Engineer",
      startDate: "Mar 2024",
      endDate: null,
      description:
        "APIs in Ruby, NLP models with Transformers, Docker/Kubernetes infrastructure, Prometheus/Grafana observability.",
      personId: hallason.id,
    },
    {
      company: "CEERMA-UFPE",
      role: "Researcher",
      startDate: "Mar 2024",
      endDate: "May 2025",
      description:
        "RUL prediction using deep learning: autoencoders, Siamese and Triplet networks for failure detection.",
      personId: hallason.id,
    },
    {
      company: "CIn/Motorola",
      role: "Researcher & QA Intern",
      startDate: "Jan 2023",
      endDate: "Mar 2025",
      description:
        "Android test automation, 6-DOF robot path heuristics, 3D printed components. 2nd Place Global Hackathon 2024 (243 teams).",
      personId: hallason.id,
    },
  ]);

  await models.Skill.bulkCreate([
    { name: "JavaScript", level: "advanced", category: "Backend", personId: hallason.id },
    { name: "Python", level: "advanced", category: "Backend", personId: hallason.id },
    { name: "Ruby", level: "intermediate", category: "Backend", personId: hallason.id },
    { name: "React", level: "advanced", category: "Frontend", personId: hallason.id },
    { name: "Next.js", level: "advanced", category: "Frontend", personId: hallason.id },
    { name: "Node.js", level: "advanced", category: "Backend", personId: hallason.id },
    { name: "PostgreSQL", level: "intermediate", category: "Database", personId: hallason.id },
    { name: "Docker", level: "intermediate", category: "DevOps", personId: hallason.id },
    { name: "Kubernetes", level: "beginner", category: "DevOps", personId: hallason.id },
    { name: "Git", level: "advanced", category: "Tools", personId: hallason.id },
  ]);

  await models.Project.bulkCreate([
    {
      name: "Resume Portfolio",
      description:
        "Personal portfolio built with Next.js (App Router) and Material UI, featuring GitHub API integration to dynamically load projects.",
      link: "https://github.com/Hallason823",
      technologies: "Next.js, React, Material-UI, GitHub REST API",
      personId: hallason.id,
    },
    {
      name: "Hangman Game",
      description: "Interactive Hangman game built with Next.js and custom hooks.",
      link: "https://github.com/Hallason823",
      technologies: "Next.js, React, JavaScript",
      personId: hallason.id,
    },
  ]);

  // --- Person 2: Lucas Andrade (fictional, inspired by Hallason) ---
  const lucas = await models.Person.create({
    name: "Lucas Andrade Ferreira",
    email: "lucas.andrade@cin.ufpe.br",
    phone: "+55 81 99876-5432",
    linkedin: "https://linkedin.com/in/lucas-andrade-dev",
    github: "https://github.com/lucasandrade-dev",
    summary:
      "Backend Developer and Data Engineer with experience in distributed systems, cloud-native applications, and database optimization.",
  });

  await models.Education.bulkCreate([
    {
      institution: "Universidade Católica de Pernambuco (UNICAP)",
      course: "Internet Systems",
      degree: "Technologist",
      startDate: "Aug 2024",
      endDate: "Dec 2026",
      description: "Web Programming, Software Engineering, AI, Database Systems",
      personId: lucas.id,
    },
    {
      institution: "Universidade Federal de Pernambuco (UFPE)",
      course: "Computer Science",
      degree: "Bachelor",
      startDate: "Mar 2020",
      endDate: "Dec 2024",
      description: "Algorithms, Data Structures, Computer Networks, Distributed Systems.",
      personId: lucas.id,
    },
  ]);

  await models.Experience.bulkCreate([
    {
      company: "FinTech Brasil",
      role: "Backend Developer",
      startDate: "Jun 2024",
      endDate: null,
      description:
        "Developed microservices with Node.js and PostgreSQL for a digital payments platform. Implemented CI/CD pipelines with GitHub Actions.",
      personId: lucas.id,
    },
    {
      company: "Samsung SIDIA",
      role: "QA Intern",
      startDate: "Feb 2023",
      endDate: "May 2024",
      description:
        "Automated testing for Android applications, contributed to test frameworks and bug reporting.",
      personId: lucas.id,
    },
  ]);

  await models.Skill.bulkCreate([
    { name: "Python", level: "advanced", category: "Backend", personId: lucas.id },
    { name: "Java", level: "intermediate", category: "Backend", personId: lucas.id },
    { name: "Node.js", level: "advanced", category: "Backend", personId: lucas.id },
    { name: "PostgreSQL", level: "advanced", category: "Database", personId: lucas.id },
    { name: "MongoDB", level: "intermediate", category: "Database", personId: lucas.id },
    { name: "Docker", level: "advanced", category: "DevOps", personId: lucas.id },
    { name: "AWS", level: "intermediate", category: "DevOps", personId: lucas.id },
    { name: "Git", level: "advanced", category: "Tools", personId: lucas.id },
  ]);

  await models.Project.bulkCreate([
    {
      name: "IoT Monitoring System",
      description:
        "Real-time sensor data dashboard with WebSocket integration and PostgreSQL storage.",
      link: "https://github.com/lucasandrade-dev/iot-monitor",
      technologies: "Node.js, PostgreSQL, WebSocket, Chart.js",
      personId: lucas.id,
    },
    {
      name: "Payment API",
      description:
        "RESTful API for digital payments with authentication, transaction history, and fraud detection.",
      link: "https://github.com/lucasandrade-dev/payment-api",
      technologies: "Node.js, Express, PostgreSQL, JWT",
      personId: lucas.id,
    },
  ]);

  console.log("Database seeded successfully!");
};

export default app;
