import mudassirPhoto from "../assets/team/mudassir.jpeg";
import saklenPhoto from "../assets/team/saklen.jpeg";
import anasPhoto from "../assets/team/Anas.jpeg";
import subhanPhoto from "../assets/team/subhan.png";
import ayanPhoto from "../assets/team/Ayan.png";
import umairPhoto from "../assets/team/umair.jpeg";
import sufiyanPhoto from "../assets/team/sufiyan.png";

export const team = [
  {
    name: "Raquib Qadari",
    slug: "raquib-qadari",
    department: "Technology",
    title: "Software Engineer",
    photo: null,
    introduction:
      "Helps build and improve the technology behind MaverickIgnite's products.",
    about:
      "Raquib works across the stack to turn product requirements into working software, moving comfortably between frontend interfaces and the backend services that support them. He enjoys the practical side of engineering — debugging tricky issues, improving performance, and making sure what ships actually holds up in production.",
    expertise: ["Full-Stack Development", "APIs & Integrations", "Debugging & Performance"],
  },
  {
    name: "Arifa Chamanshaikh",
    slug: "arifa-chamanshaikh",
    department: "Operations",
    title: "Operations Associate",
    photo: null,
    introduction:
      "Keeps the day-to-day running smoothly so the rest of the team can focus on building.",
    about:
      "Arifa manages the operational details that keep projects on track — coordinating between teams, organizing schedules, and making sure nothing falls through the cracks. Her work is often invisible when it's going well, which is exactly the point.",
    expertise: ["Operations & Coordination", "Process Management", "Team Support"],
  },
  {
    name: "Mudassir Sanderwale",
    slug: "mudassir-sanderwale",
    department: "Engineering",
    title: "AI & Data Engineer",
    photo: mudassirPhoto,
    introduction:
      "Builds applications and intelligent systems across AI, data, and software — from backend services to the interfaces people actually use.",
    about:
      "Mudassir works across the AI and software stack, building backend services in Python and FastAPI, wiring up LLM-powered features, and building the React interfaces that sit on top of them. He's comfortable owning a feature end to end, from data pipeline to UI.",
    expertise: ["Python", "AI & LLMs", "FastAPI", "React", "Data Systems", "UI/UX Design", "Android Development"],
  },
  {
    name: "Saklen Sajjan",
    slug: "saklen-sajjan",
    department: "Technology",
    title: "Associate software engineer",
    photo: saklenPhoto,
    introduction:
      "Contributes to the software and technology behind MaverickIgnite's products.",
    about:
      "Saklen works on building and maintaining the software systems that support the team's products, with a focus on writing code that's easy to extend as requirements change.",
    expertise: ["Software Development", "Technology", "Systems"],
  },
  {
    name: "Anas Sanderwale",
    slug: "anas-sanderwale",
    department: "Technology",
    title: "Associate software engineer",
    photo: anasPhoto,
    introduction:
      "Works with the team to build practical technology and digital products.",
    about:
      "Anas focuses on turning ideas into working software, contributing across different parts of the stack depending on what a project needs.",
    expertise: ["Software Development", "Digital Products", "Technology"],
  },
  {
    name: "Subhan Sanderwale",
    slug: "subhan-sanderwale",
    department: "Technology",
    title: "Associate software engineer",
    photo: subhanPhoto,
    introduction:
      "Contributes to the development and evolution of MaverickIgnite's products.",
    about:
      "Subhan works on building and improving product features, with an eye for the small details that make software feel polished.",
    expertise: ["Software Development", "APP Development", "Technology"],
  },
  {
    name: "Asim Bage",
    slug: "asim-bage",
    department: "Technology",
    title: "Associate software engineer",
    photo: null,
    introduction:
      "Helps build technology and solutions across the MaverickIgnite ecosystem.",
    about:
      "Asim contributes to the technical work behind MaverickIgnite's products, helping build and maintain the systems that keep everything running.",
    expertise: ["Technology", "Development", "Problem Solving"],
  },

  // Interns
  {
    name: "Ayan Sajjan",
    slug: "ayan-sajjan",
    department: "Intern",
    title: "Software Engineer Trainee",
    photo: ayanPhoto,
    introduction:
      "Learning the ropes of software development while contributing to real projects.",
    about:
      "Ayan is an intern on the engineering team, working alongside senior developers to build hands-on experience with real-world software development.",
    expertise: ["Learning & Development", "Software Basics", "Collaboration"],
  },
  {
    name: "Umair Sanderwale",
    slug: "umair-sanderwale",
    department: "Intern",
    title: "Software Engineer Trainee",
    photo: umairPhoto,
    introduction:
      "Gaining practical experience across the software development lifecycle.",
    about:
      "Umair is building his technical foundations as an intern, picking up practical development skills by contributing to live projects under the team's guidance.",
    expertise: ["Learning & Development", "Software Basics", "Collaboration"],
  },
  {
    name: "Sufiyan Sanderwale",
    slug: "sufiyan-sanderwale",
    department: "Intern",
    title: "Software Engineer Trainee",
    photo: sufiyanPhoto,
    introduction:
      "Building foundational engineering skills through hands-on project work.",
    about:
      "Sufiyan is part of the internship program, working closely with the team to learn practical software development while contributing to ongoing projects.",
    expertise: ["Learning & Development", "Software Basics", "Collaboration"],
  },
];

export const getTeamMember = (slug) => team.find((person) => person.slug === slug);