import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Trophy, Users, Zap } from 'lucide-react';

const Schedule = () => {
  const events = [
    {
  date: "Before October 9, 2025",
  title: "Idea Submission & Registration",
  type: "Online",
  events: [
    {
      time: "All Day",
      title: "Registration & First Idea Submission",
      description: "Submit your team registration and initial project idea before the deadline",
      icon: Users,
      location: "Online Portal"
    }
  ]
},
{
  date: "October 13-14, 2025",
  title: "Online Screening Phase",
  type: "Online",
  events: [
    {
      time: "9.30 AM - 5.00 PM",
      title: "Screening & Evaluation",
      description: "Online screening of submitted ideas by judges",
      icon: Zap,
      location: "GOOGLE MEET"
    }
  ]
},
{
  date: "October 17, 2025",
  title: "Main Hackathon Day",
  type: "Offline",
  events: [
    {
      time: "8:30 AM",
      title: "Registration & Check-in",
      description: "Check-in and complete the registration process",
      icon: Users,
      location: "3rd Floor - A BLOCK"
    },
    {
      time: "9:00 AM",
      title: "Hackathon Begins!",
      description: "Start coding your spooky solutions",
      icon: Clock,
      location: "A317 and A318"
    },
    {
      time: "10:00 AM",
      title: "Breakfast Break",
      description: "Breakfast with networking opportunities",
      icon: MapPin,
      location: "Institute Cafeteria"
    },
    {
      time: "1:00 PM",
      title: "Lunch Break",
      description: "Lunch with networking opportunities",
      icon: MapPin,
      location: "Institute Cafeteria"
    },
    {
      time: "5:00 PM",
      title: "Final Submission Deadline",
      description: "Submit your projects and prepare for presentations",
      icon: Clock,
      location: "Online Portal"
    },
    {
      time: "5:30 PM",
      title: "Project Presentations",
      description: "Present your  projects to judges",
      icon: Zap,
      location: "Departmental Library (A307A)"
    },
    {
      time: "6:00 PM",
      title: "Evening Snack",
      description: "Snack break and Judge Discussions",
      icon: Users,
      location: "A317 and A318"
    },
    {
      time: "6:30 PM",
      title: "Results & Closing Ceremony",
      description: "Winner announcement and prize distribution",
      icon: Trophy,
      location: "SIT HALL"
    }
  ]
}

  ];

  const getEventTypeColor = (type: string) => {
    return type === "Online" 
      ? "bg-neon-green text-spooky-dark"
      : "bg-neon-green text-spooky-dark";
  };

  return (
    
    <Layout>
      
      <div className="bg-[url('/spooky-bg-2.png')] bg-cover bg-center bg-fixed" >
      
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-spooky text-gradient-neon mb-6 animate-glow">
            Event Schedule
          </h1>
          <p className="text-xl text-spooky-orange max-w-3xl mx-auto leading-relaxed">
            Your complete guide to the Halloween hackathon timeline. 
            From spooky registration to spine-chilling presentations!
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {events.map((phase, phaseIndex) => (
            <div key={phaseIndex} className="mb-16">
              {/* Phase Header */}
              <div className="flex flex-col md:flex-row items-center justify-between mb-8">
                <div>
                  <h2 className="text-4xl font-spooky text-gradient-ghoul mb-2">
                    {phase.title}
                  </h2>
                  <p className="text-xl text-spooky-light">{phase.date}</p>
                </div>
                <Badge className={getEventTypeColor(phase.type)}>
                  {phase.type}
                </Badge>
              </div>

              {/* Events */}
              <div className="space-y-6">
                {phase.events.map((event, eventIndex) => (
                  <Card 
                    key={eventIndex}
                    className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:glow-orange p-6 animate-float"
                    style={{ animationDelay: `${(phaseIndex * phase.events.length + eventIndex) * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-halloween rounded-full flex items-center justify-center animate-bob">
                          <event.icon className="w-6 h-6 text-spooky-dark" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                          <h3 className="text-xl font-heading text-neon-orange">
                            {event.title}
                          </h3>
                          <div className="flex items-center space-x-2 text-halloween-orange font-medium">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        
                        <p className="text-spooky-muted mb-3 leading-relaxed">
                          {event.description}
                        </p>
                        
                        <div className="flex items-center space-x-2 text-sm text-gradient-ghoul">
                          <MapPin className="w-4 h-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="mt-16">
          <Card className="bg-gradient-halloween p-8 text-center shadow-lg glow-orange">
            <h3 className="text-6xl font-spooky text-gradient-ghoul mb-4">
              Important Reminders
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-spooky-dark">
              <div>
                <Users className="w-8 h-8 mx-auto mb-2 text-spooky-light" />
                <h4 className="font-semibold text-spooky-light mb-1">Team Size</h4>
                <p className="text-spooky-light">2 members per team</p>
              </div>
              <div>
                <Clock className="w-8 h-8 mx-auto mb-2 text-spooky-light" />
                <h4 className="font-semibold text-spooky-light mb-1">Duration</h4>
                <p className="text-spooky-light">10 hours of coding time</p>
              </div>
              <div>
                <Trophy className="w-8 h-8 mx-auto mb-2 text-spooky-light" />
                <h4 className="font-semibold text-spooky-light mb-1">Prizes</h4>
                <p className="text-spooky-light">₹20,000+ in total rewards</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Schedule;