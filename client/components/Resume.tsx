import ResumeTemplate from "@/components/ResumeTemplate";

const resumeData = {
  fullName: "Abhishek Parmar",
  title: "Full-Stack Developer",
  email: "abhi@example.com",
  phone: "+91 9876543210",
  location: "Delhi, India",
  summary:
    "Passionate MERN Stack Developer with experience in building scalable web apps and APIs.",
  experience: [
    {
      role: "Full Stack Developer",
      company: "Credenc",
      years: "2023 - Present",
      description: "Worked on MERN applications with real-time features.",
    },
    {
      role: "Frontend Intern",
      company: "XYZ Tech",
      years: "2022 - 2023",
      description: "Built responsive UI with React and Tailwind CSS.",
    },
  ],
  education: [
    {
      degree: "B.Tech in Computer Science",
      institution: "Delhi University",
      years: "2019 - 2023",
    },
  ],
  skills: ["React.js", "Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
};

export default function Resume() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-10">
      <ResumeTemplate data={resumeData} />
    </div>
  );
}
