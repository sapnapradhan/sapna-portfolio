const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Profile Data API (Extracted from Sapna Pradhan's Resume)
const PROFILE_DATA = {
  name: "Sapna Pradhan",
  title: "Full Stack Developer & AI Engineer",
  email: "sapnapradhan104@gmail.com",
  phone: "+91 85389547745",
  location: "Dhanbad, Jharkhand / Bhubaneswar, Odisha",
  education: {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Institute of Technical Education and Research (ITER), SOA University",
    location: "Bhubaneswar, Odisha",
    cgpa: "8.43 / 10.0",
    years: "2024 - Present"
  },
  experience: [
    {
      id: "exp-1",
      role: "System Intern",
      company: "Bharat Coking Coal Limited (BCCL)",
      location: "Dhanbad, Jharkhand",
      period: "June 2026 - July 2026",
      tech: ["React.js", "Vite", "Supabase", "PostgreSQL", "Tailwind CSS", "GitHub", "Vercel"],
      highlights: [
        "Developed a web-based Employee Management System (HRMS) using React.js, Vite, Supabase, and PostgreSQL.",
        "Implemented authentication, role-based access control (RBAC), and core HR management modules.",
        "Collaborated with the Systems Department and deployed the application using GitHub and Vercel for live evaluation."
      ]
    },
    {
      id: "exp-2",
      role: "Web3 & Blockchain Fellow",
      company: "DoraHacks / DoraDAO Fellowship",
      location: "Remote",
      period: "July 2026 - August 2026",
      tech: ["Smart Contracts", "Solidity", "dApps", "Web3.js", "Ethereum"],
      highlights: [
        "Selected for a competitive fellowship focused on Web3 and blockchain technologies.",
        "Explored smart contracts, decentralized applications (dApps), and blockchain ecosystems.",
        "Collaborated with global peers on real-world Web3 use cases and emerging decentralized tech."
      ]
    }
  ],
  projects: [
    {
      id: "proj-1",
      title: "BCCL Employee Management System (HRMS)",
      category: "Full Stack Enterprise",
      poster: "/assets/bccl_poster.jpg",
      tags: ["React.js", "Supabase", "PostgreSQL", "Tailwind CSS", "RBAC", "RLS"],
      github: "https://github.com",
      live: "https://vercel.com",
      description: "Enterprise HRMS prototype for Bharat Coking Coal Limited to digitize employee records, attendance, leave management, and HR workflows with row-level security.",
      architecture: "React Frontend -> Supabase Auth & REST -> PostgreSQL Database with RLS Policies",
      challenges: "Implementing granular role-based permissions (Admin, HR, Employee) with real-time updates and strict PostgreSQL Row Level Security."
    },
    {
      id: "proj-2",
      title: "Django Blog REST API",
      category: "Backend Microservices",
      poster: "/assets/bccl_poster.jpg",
      tags: ["Python", "Django", "Django REST Framework", "PostgreSQL", "JWT", "Postman"],
      github: "https://github.com",
      live: "https://github.com",
      description: "High-performance RESTful Blog API supporting full CRUD operations for posts, nested comments, user management, and JWT token authentication.",
      architecture: "Django REST Framework -> Custom Serializers -> JWT Middleware -> PostgreSQL DB",
      challenges: "Optimizing database queries to eliminate N+1 problems on nested comments and implementing robust token refresh security."
    },
    {
      id: "proj-3",
      title: "Sapna AI OS & 3D Portfolio",
      category: "AI & 3D Interactive Web",
      poster: "/assets/hologram_avatar.jpg",
      tags: ["Next.js", "Three.js", "WebGL", "GSAP", "Tailwind CSS", "Node.js"],
      github: "https://github.com",
      live: "#",
      description: "Ultra-premium futuristic AI operating system developer portfolio featuring photorealistic 3D holographic avatar, 3D skill galaxy, and Jarvis AI assistant.",
      architecture: "Three.js Particle WebGL Engine -> Custom Shaders -> Speech Synth -> Express Analytics API",
      challenges: "Achieving smooth 60FPS WebGL performance on desktop and mobile while rendering thousands of volumetric particles and post-processing bloom."
    }
  ],
  skills: {
    languages: ["Java", "Python", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"],
    frontend: ["React.js", "Next.js", "Vite", "Tailwind CSS", "Responsive Web Design", "Three.js / WebGL"],
    backend: ["Django", "Django REST Framework (DRF)", "Node.js", "Express.js", "REST APIs", "JWT Auth"],
    databases: ["PostgreSQL", "MongoDB", "MySQL", "Supabase"],
    tools: ["Git", "GitHub", "Postman", "VS Code", "Vercel", "Figma"],
    coreCS: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks", "RBAC", "RLS"]
  }
};

// API Endpoints
app.get('/api/profile', (req, res) => {
  res.json(PROFILE_DATA);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received message from ${name} (${email}): ${message}`);
  res.json({ success: true, message: "Transmission received successfully. Sapna AI OS has dispatched your inquiry." });
});

app.post('/api/ai-chat', (req, res) => {
  const { question } = req.body;
  const q = (question || '').toLowerCase();
  
  let answer = "I am Sapna AI OS. I can tell you about Sapna's projects, experience at BCCL, education at SOA University, or technical skills in Java, Python, React, and Django.";
  
  if (q.includes('bccl') || q.includes('intern') || q.includes('experience')) {
    answer = "Sapna served as a System Intern at Bharat Coking Coal Limited (BCCL) in Dhanbad, where she built an enterprise Web-Based Employee Management System using React.js, Supabase, PostgreSQL, and RBAC.";
  } else if (q.includes('project') || q.includes('hrms') || q.includes('django')) {
    answer = "Sapna's top projects include the BCCL HRMS Platform (React, Supabase, PostgreSQL, RLS) and the Django REST Blog API with JWT Auth and complex PostgreSQL relations.";
  } else if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
    answer = "Sapna excels in Java, Python, JavaScript, TypeScript, React.js, Next.js, Django REST Framework, PostgreSQL, Supabase, MongoDB, Data Structures & Algorithms, and Web3/Smart Contracts.";
  } else if (q.includes('education') || q.includes('cgpa') || q.includes('iter') || q.includes('soa')) {
    answer = "Sapna is pursuing her B.Tech in Computer Science & Engineering at ITER, SOA University, Bhubaneswar with an impressive CGPA of 8.43/10.0.";
  } else if (q.includes('contact') || q.includes('email') || q.includes('hire')) {
    answer = "You can reach Sapna directly at sapnapradhan104@gmail.com or call +91 85389547745. She is available for Full Stack and AI Engineering opportunities!";
  }
  
  res.json({ answer, timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Sapna AI OS Backend running on http://localhost:${PORT}`);
});
