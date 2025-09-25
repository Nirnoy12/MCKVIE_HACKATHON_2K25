import { useState } from "react";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Trophy, Code, X } from 'lucide-react';
import { Link } from 'react-router-dom';

type ProblemCategory = {
  id: number;
  title: string;
  difficulty: string;
  duration: string;
  teamSize: string;
  description: string;
  details: string;
  techStack: string[];
  problemStatement?: string;
  requirements?: string[];
  constraints?: string[];
  useCases?: string[];
  evaluation?: string[];
};

const Problems = () => {
  const [openProblem, setOpenProblem] = useState<number | null>(null);

  const problemCategories: ProblemCategory[] = [
    {
      id: 1,
      title: "PS1 — Document Formatter & Exporter WebApp",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Create a web app to compose, import, standardize, and export documents with consistent templates and metadata.",
      problemStatement: "Build a web app that formats and exports documents (PDF/DOCX/MD/HTML) with consistent styles and metadata.",
      requirements: [
        "Rich-text editing with headings, lists, tables, and images",
        "Import DOCX/Markdown; export PDF/DOCX/Markdown/HTML",
        "Template-based styling and validation (heading hierarchy, captions)",
      ],
      constraints: [
        "Client-first processing; no server without consent",
        "Handle docs up to ~10MB; fast exports",
        "Latest Chrome/Edge/Firefox support",
      ],
      useCases: [
        "Student applies APA template and exports PDF",
        "HR standardizes resumes into corporate PDF",
      ],
      evaluation: [
        "Formatting fidelity between editor and exports",
        "Usability and accessibility",
        "Code quality and error handling",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 2,
      title: "PS2 — Resume Ranker (ATS-Friendly)",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Build a tool to parse resumes and job descriptions, then rank resumes based on match.",
      problemStatement: "Create an ATS-like web app that scores resumes against a JD and suggests improvements.",
      requirements: [
        "Upload resume (PDF/DOCX) and paste JD",
        "Extract skills, keywords, and experience",
        "Provide match score and actionable suggestions",
      ],
      constraints: [
        "All parsing on client where possible",
        "Privacy-first; no storing files by default",
      ],
      useCases: [
        "Candidate optimizes resume for a role",
        "Recruiter quickly screens multiple resumes",
      ],
      evaluation: [
        "Accuracy of extracted entities",
        "Clarity of suggestions",
        "Performance on varied resume formats",
      ],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 3,
      title: "PS3 — Event Planner Dashboard",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Plan events with tasks, schedules, budgets, and vendor management in one dashboard.",
      problemStatement: "Build a dashboard to organize event timelines, budgets, tasks, and stakeholders.",
      requirements: [
        "Task boards with deadlines and assignees",
        "Calendar view and reminders",
        "Budget tracking and vendor contacts",
      ],
      constraints: ["Offline-friendly local storage", "Responsive layout for mobile"],
      useCases: ["College fest planning", "Wedding vendor coordination"],
      evaluation: ["UX of planning flows", "Data persistence and reliability"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 4,
      title: "PS4 — Campus Navigator",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Interactive campus map with buildings, schedules, and route suggestions for newcomers.",
      problemStatement: "Create a campus guide with searchable locations, schedules, and optimal walking routes.",
      requirements: ["Map with POIs", "Search and filters", "Basic routing and ETA"],
      constraints: ["Work without GPS", "Accessible color contrast"],
      useCases: ["Freshers find classrooms", "Visitors locate facilities"],
      evaluation: ["Map usability", "Performance on low-end devices"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 5,
      title: "PS5 — Personal Budget Tracker",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Track expenses, set budgets, and visualize spending trends.",
      problemStatement: "Build a simple finance app to categorize expenses and monitor budgets.",
      requirements: ["Manual entry and CSV import", "Category tags", "Charts for trends"],
      constraints: ["Data encrypted locally", "Works offline"],
      useCases: ["Monthly expense tracking", "Budget alerts"],
      evaluation: ["Data viz clarity", "Edge case handling in imports"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 6,
      title: "PS6 — Fitness Logger",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Log workouts, track progress, and generate simple plans.",
      problemStatement: "Create a tracker for workouts with progress charts and plan templates.",
      requirements: ["Exercise library", "Workout templates", "Progress graphs"],
      constraints: ["Mobile-first UI", "No backend required"],
      useCases: ["Beginner strength plan", "Cardio tracking"],
      evaluation: ["Consistency of UX", "Data model simplicity"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 7,
      title: "PS7 — Recipe Manager",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Save recipes, auto-generate shopping lists, and plan meals.",
      problemStatement: "Build a cookbook app with tagging, shopping lists, and weekly plans.",
      requirements: ["Tagging and search", "Ingredient scaling", "Grocery list export"],
      constraints: ["Offline-ready PWA", "Image compression for photos"],
      useCases: ["Meal prep", "Share recipes"],
      evaluation: ["Search quality", "Offline behavior"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 8,
      title: "PS8 — Kanban Task Board",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Organize tasks with columns, drag-and-drop, and labels.",
      problemStatement: "Create a minimal Kanban with persistence and team-friendly features.",
      requirements: ["Columns and cards", "Drag and drop", "Labels and filters"],
      constraints: ["Local storage first", "Keyboard accessibility"],
      useCases: ["Project planning", "Personal backlog"],
      evaluation: ["DnD smoothness", "A11y compliance"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 9,
      title: "PS9 — Weather Dashboard",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "City-based weather with forecasts and alerts.",
      problemStatement: "Build a weather UI showing current conditions, hourly and 7-day forecasts.",
      requirements: ["Search city", "Favorites", "Charts for temp/precip"],
      constraints: ["API quota handling", "Caching results"],
      useCases: ["Daily planning", "Travel prep"],
      evaluation: ["Loading states", "Error handling"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 10,
      title: "PS10 — Minimal Chat App",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Realtime messages in rooms with presence indicators.",
      problemStatement: "Create a basic chat with rooms, typing indicators, and message history.",
      requirements: ["Rooms and users", "Typing indicators", "Persisted history"],
      constraints: ["Simple backend or mock server", "Rate limiting UI"],
      useCases: ["Study group chat", "Event coordination"],
      evaluation: ["Realtime UX", "Message rendering performance"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 11,
      title: "PS11 — Quiz Builder",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Create and take quizzes with scoring and analytics.",
      problemStatement: "Build a quiz creator with question types, timed tests, and results.",
      requirements: ["MCQ/short answer", "Timer", "Result breakdown"],
      constraints: ["Prevent accidental reload loss", "Keyboard-only flow"],
      useCases: ["Practice tests", "Classroom quizzes"],
      evaluation: ["Scoring correctness", "UX under time pressure"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 12,
      title: "PS12 — Developer Portfolio Builder",
      difficulty: "",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Problem Statement: ",
      details: "Generate a portfolio site from structured data and templates.",
      problemStatement: "Create a builder that turns project data into a themed portfolio with exports.",
      requirements: ["Sections: About/Projects/Contact", "Theme switcher", "Static export"],
      constraints: ["No server required", "SEO-friendly HTML"],
      useCases: ["Student portfolio", "Hackathon showcase"],
      evaluation: ["Theme quality", "Lighthouse scores"],
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },

  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-neon-green text-spooky-dark";
      case "Intermediate": return "bg-halloween-orange text-spooky-light";
      case "Advanced": return "bg-destructive text-spooky-light";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-spooky text-gradient-neon mb-6 animate-glow">
            Problem Statements
          </h1>
          <p className="text-xl text-spooky-muted max-w-3xl mx-auto leading-relaxed">
            Choose your Halloween challenge! Each problem statement offers unique opportunities
            to showcase your coding skills while embracing the spooky spirit of the season.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 text-spooky-light">
              <Clock className="w-5 h-5 text-halloween-orange animate-flicker" />
              <span>Registration Deadline: Oct 3rd</span>
            </div>
            <div className="flex items-center space-x-2 text-spooky-light">
              <Trophy className="w-5 h-5 text-neon-green animate-glow" />
              <span>Total Prizes: ₹20,000+</span>
            </div>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {problemCategories.map((problem, index) => (
            <Card
              key={problem.id}
              className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:shadow-lg hover:glow-orange p-8 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-heading text-gradient-ghoul ">
                      {problem.title}
                    </h3>

                    <Badge className={getDifficultyColor(problem.difficulty)}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <Code className="w-8 h-8 text-halloween-orange animate-bob" />
                </div>

                {/* Details Button */}
                <div>
                  <Button
                    onClick={() => setOpenProblem(problem.id)}
                    variant="ghost_spooky"
                    className="text-sm font-bold text-gradient-spooky border border-halloween-orange hover:bg-halloween-purple-muted hover:text-spooky-light animate-flicker"
                  >
                    Dive into details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Popup Modal */}
        {openProblem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div className="relative w-[90%] max-w-4xl 
              bg-[hsl(var(--card))] text-[hsl(var(--foreground))] 
              p-8 rounded-2xl shadow-[var(--shadow-card)] 
              border border-[hsl(var(--border))] 
              animate-burst glow-burst">

              {/* Close Button */}
              <button
                onClick={() => setOpenProblem(null)}
                className="absolute top-4 right-4 text-[hsl(var(--halloween-orange))] hover:text-[hsl(var(--neon-orange))] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Modal Title */}
              <h2 className="font-heading text-2xl text-gradient-ghoul mb-4 animate-glow">
                {problemCategories.find(p => p.id === openProblem)?.title}
              </h2>

              {/* Modal Content */}
              <div className="space-y-6 text-sm leading-relaxed">
                {(() => {
                  const selected = problemCategories.find((p) => p.id === openProblem);
                  if (!selected) return null;
                  return (
                    <div className="space-y-6">
                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Problem Statement</h3>
                        <p className="text-spooky-light">{selected.problemStatement || selected.details || selected.description}</p>
                      </section>

                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Requirements & Features</h3>
                        {Array.isArray(selected.requirements) ? (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            {selected.requirements.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            <li>Add key functional and non-functional requirements here.</li>
                            <li>List expected features, flows, or modules.</li>
                            <li>Note any integration points or libraries to consider.</li>
                          </ul>
                        )}
                      </section>

                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Constraints</h3>
                        {Array.isArray(selected.constraints) ? (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            {selected.constraints.map((c, i) => (
                              <li key={i}>{c}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            <li>State technical, time, or resource constraints.</li>
                            <li>Define supported browsers/devices or performance targets.</li>
                          </ul>
                        )}
                      </section>

                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Example Use Cases</h3>
                        {Array.isArray(selected.useCases) ? (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            {selected.useCases.map((u, i) => (
                              <li key={i}>{u}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            <li>Use Case 1: Briefly describe a primary user flow.</li>
                            <li>Use Case 2: Another representative scenario.</li>
                          </ul>
                        )}
                      </section>

                      <section>
                        <h3 className="text-base font-semibold text-halloween-orange mb-2">Evaluation Criteria</h3>
                        {Array.isArray(selected.evaluation) ? (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            {selected.evaluation.map((e, i) => (
                              <li key={i}>{e}</li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="list-disc pl-6 space-y-1 text-spooky-light">
                            <li>Functionality completeness and correctness.</li>
                            <li>UI/UX quality, performance, and accessibility.</li>
                            <li>Code quality, structure, and documentation.</li>
                          </ul>
                        )}
                      </section>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-halloween p-8 rounded-xl shadow-lg glow-orange">
            <h2 className="text-6xl font-spooky text-gradient-ghoul mb-4">
              Ready to Accept the Challenge?
            </h2>
            <p className="text-spooky-light mb-6 text-lg">
              Form your team and register now to secure your spot in this spine-tingling hackathon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="neon" size="xl" className="text-lg">
                  Register Your Team
                </Button>
              </Link>
              <Button
                variant="ghost_spooky"
                size="xl"
                className="bg-spooky-dark border-spooky-dark text-spooky-light hover:bg-spooky-light hover:text-spooky-dark"
                onClick={() => window.open('https://docs.google.com/document/d/1lwzWk2CWIpjDr25E2vpcS4pt4fCh-Mcac_pndgFD29o/edit?usp=sharing', '_blank')}
              >
                Download Detailed Rules
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Problems;
