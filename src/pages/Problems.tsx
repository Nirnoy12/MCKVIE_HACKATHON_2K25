import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Code } from 'lucide-react';

const Problems = () => {
  const problemCategories = [
    {
      id: 1,
      title: "Web Development Spook",
      difficulty: "Beginner",
      duration: "6 hours",
      teamSize: "2-4 members",
      description: "Create a haunted web application that showcases innovative UI/UX design with Halloween themes. Perfect for frontend enthusiasts!",
      techStack: ["React", "JavaScript", "CSS", "HTML"],
      prizes: ["₹15,000", "₹10,000", "₹5,000"]
    },
    {
      id: 2,
      title: "AI Phantom Challenge",
      difficulty: "Intermediate", 
      duration: "8 hours",
      teamSize: "2-3 members",
      description: "Develop an AI-powered solution that can identify and classify spooky objects, sounds, or behaviors using machine learning.",
      techStack: ["Python", "TensorFlow", "OpenCV", "Scikit-learn"],
      prizes: ["₹25,000", "₹15,000", "₹8,000"]
    },
    {
      id: 3,
      title: "Blockchain Boo",
      difficulty: "Advanced",
      duration: "10 hours", 
      teamSize: "3-5 members",
      description: "Create a decentralized application (DApp) for a Halloween-themed marketplace or gaming platform using blockchain technology.",
      techStack: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
      prizes: ["₹40,000", "₹25,000", "₹15,000"]
    },
    {
      id: 4,
      title: "Mobile Monster Maker",
      difficulty: "Intermediate",
      duration: "8 hours",
      teamSize: "2-4 members", 
      description: "Build a cross-platform mobile application with Halloween features like AR filters, spooky games, or social sharing.",
      techStack: ["React Native", "Flutter", "Firebase", "AR Kit"],
      prizes: ["₹20,000", "₹12,000", "₹6,000"]
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
          <h1 className="text-6xl md:text-8xl font-spooky text-gradient-halloween mb-6 animate-glow">
            Problem Statements
          </h1>
          <p className="text-xl text-spooky-muted max-w-3xl mx-auto leading-relaxed">
            Choose your Halloween challenge! Each problem statement offers unique opportunities 
            to showcase your coding skills while embracing the spooky spirit of the season.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center space-x-2 text-spooky-light">
              <Clock className="w-5 h-5 text-halloween-orange animate-flicker" />
              <span>Registration Deadline: Oct 8th</span>
            </div>
            <div className="flex items-center space-x-2 text-spooky-light">
              <Trophy className="w-5 h-5 text-neon-green animate-glow" />
              <span>Total Prizes: ₹2,00,000+</span>
            </div>
          </div>
        </div>

        {/* Problem Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                    <h3 className="text-2xl font-spooky text-gradient-halloween mb-2">
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
                        className="border-halloween-purple text-spooky-light hover:bg-halloween-purple-muted"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Prizes */}
                <div>
                  <h4 className="text-sm font-semibold text-neon-green mb-2 animate-glow">
                    Prize Pool:
                  </h4>
                  <div className="flex space-x-4">
                    {problem.prizes.map((prize, idx) => (
                      <Badge 
                        key={idx}
                        className={`${idx === 0 ? 'bg-neon-orange' : idx === 1 ? 'bg-halloween-orange' : 'bg-halloween-purple'} text-spooky-dark font-bold`}
                      >
                        {idx + 1}st: {prize}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-halloween p-8 rounded-xl shadow-lg glow-orange">
            <h2 className="text-3xl font-spooky text-spooky-dark mb-4">
              Ready to Accept the Challenge?
            </h2>
            <p className="text-spooky-dark mb-6 text-lg">
              Form your team and register now to secure your spot in this spine-tingling hackathon!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="neon" size="xl" className="text-lg">
                Register Your Team
              </Button>
              <Button 
                variant="ghost_spooky" 
                size="xl"
                className="bg-spooky-dark border-spooky-dark text-spooky-light hover:bg-spooky-light hover:text-spooky-dark"
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