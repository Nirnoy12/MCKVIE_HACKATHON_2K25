import { useState } from "react";
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Code, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Problems = () => {
  const [openProblem, setOpenProblem] = useState<number | null>(null);

  const problemCategories = [
    {
      id: 1,
      title: "Web Development Spook",
      difficulty: "Beginner",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Create a haunted web application that showcases innovative UI/UX design with Halloween themes. Perfect for frontend enthusiasts!",
      details: "In this problem, you’ll craft a spooky-themed web app with ghostly animations, neon glows, and chilling interactions. The challenge is to balance performance, accessibility, and creative UI/UX for a truly spine-tingling experience.",
      techStack: ["React", "JavaScript", "CSS", "HTML"],
    },
    {
      id: 2,
      title: "AI Phantom Challenge",
      difficulty: "Intermediate",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Develop an AI-powered solution that can identify and classify spooky objects, sounds, or behaviors using machine learning.",
      details: "This challenge focuses on AI models that detect and classify Halloween-themed datasets—like bats, pumpkins, or eerie sounds. Bonus points for creative applications such as real-time ghost detectors or spooky AR filters.",
      techStack: ["Python", "TensorFlow", "OpenCV", "Scikit-learn"],
    },
    {
      id: 3,
      title: "Blockchain Boo",
      difficulty: "Advanced",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Create a decentralized application (DApp) for a Halloween-themed marketplace or gaming platform using blockchain technology.",
      details: "Participants will build DApps leveraging smart contracts, ensuring security and transparency. Ideas could include NFT-based costumes, spooky token economies, or trustless ghost-hunting games.",
      techStack: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
    },
    {
      id: 4,
      title: "Mobile Monster Maker",
      difficulty: "Intermediate",
      duration: "10 hours",
      teamSize: "2 members",
      description: "Build a cross-platform mobile application with Halloween features like AR filters, spooky games, or social sharing.",
      details: "The goal is to create engaging mobile apps with interactive Halloween vibes. Use AR filters to make users look like zombies, add spooky mini-games, or implement haunted social sharing features.",
      techStack: ["React Native", "Flutter", "Firebase", "AR Kit"],
    }
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
              <span>Registration Deadline: Sep 27th</span>
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

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-spooky-muted">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-halloween-orange" />
                    <span>{problem.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-halloween-orange" />
                    <span>{problem.teamSize}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-spooky-light leading-relaxed">
                  {problem.description}
                </p>

                {/* Tech Stack */}
                <div>
                  <h4 className="text-sm font-semibold text-halloween-orange mb-2">
                    Suggested Tech Stack:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="border-halloween-orange text-spooky-light hover:bg-halloween-purple-muted"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
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
              <div className="space-y-4 text-sm leading-relaxed">
                <p>
                  {problemCategories.find(p => p.id === openProblem)?.details}
                </p>
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
