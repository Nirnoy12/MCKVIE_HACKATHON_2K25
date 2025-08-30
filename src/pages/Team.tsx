import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Github, Linkedin, Mail, Users } from 'lucide-react';

const Team = () => {
  const members = [
    {
      name: "Dr. Spooky Singh",
      role: "Faculty Coordinator",
      bio: "Guiding the spooky spirits of innovation with wisdom and mentorship.",
      image: "👨‍🏫",
      github: "https://github.com/spooky-singh",
      linkedin: "https://linkedin.com/in/spooky-singh",
      email: "spooky.singh@mckvie.edu.in",
      tags: ["Mentor", "Leader"]
    },
    {
      name: "Phantom Patel",
      role: "Student Coordinator",
      bio: "Ensures smooth hauntings… I mean operations, keeping the hackathon alive and kicking.",
      image: "🧑‍💻",
      github: "https://github.com/phantom-patel",
      linkedin: "https://linkedin.com/in/phantom-patel",
      email: "phantom.patel@student.mckvie.edu.in",
      tags: ["Organizer", "Manager"]
    },
    {
      name: "Ghoulish Gupta",
      role: "Technical Lead",
      bio: "Architect of eerie algorithms and the mastermind behind the tech stack.",
      image: "🧙‍♂️",
      github: "https://github.com/ghoulish-gupta",
      linkedin: "https://linkedin.com/in/ghoulish-gupta",
      email: "ghoulish.gupta@mckvie.edu.in",
      tags: ["Developer", "Tech"]
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-spooky text-gradient-neon mb-6 animate-glow">
            Meet the Team
          </h1>
          <p className="text-xl text-spooky-muted max-w-3xl mx-auto leading-relaxed">
            Behind every spooky hackathon, there’s a team of ghosts, ghouls, and geeks
            working tirelessly to bring the magic to life.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <Card 
              key={index} 
              className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:glow-orange p-8 text-center animate-float"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="text-6xl mb-4">{member.image}</div>
              <h3 className="text-2xl font-heading text-halloween-orange">{member.name}</h3>
              <p className="text-spooky-light font-medium mb-2">{member.role}</p>
              <p className="text-sm text-spooky-muted mb-4">{member.bio}</p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {member.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary" className="bg-halloween-orange/20 text-halloween-orange">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-5 mt-2">
                {member.github && (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-spooky-muted hover:text-white transition">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-spooky-muted hover:text-blue-400 transition">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.email && (
                  <a href={`mailto:${member.email}`} className="text-spooky-muted hover:text-halloween-orange transition">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Closing Note */}
        <div className="text-center mt-20">
          <Users className="w-10 h-10 text-halloween-orange mx-auto mb-4" />
          <h2 className="text-3xl font-spooky text-gradient-halloween mb-2">
            And many more volunteers...
          </h2>
          <p className="text-spooky-muted max-w-2xl mx-auto">
            From mentors to organizers, our entire community is the real magic
            that powers the MCKVIE Halloween Hackathon.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
