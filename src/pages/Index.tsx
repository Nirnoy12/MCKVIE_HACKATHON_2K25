import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Users,
  Trophy,
  MapPin,
  Clock,
  Zap,
  Code,
  Rocket,
  Star,
  Ghost
} from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/halloween-hero-bg.jpg';
import Countdown from '@/components/ui/countdown';

const Index = () => {
  const stats = [
    { icon: Users, label: "Participants", value: "200+", color: "text-neon-green" },
    { icon: Trophy, label: "Prize Pool", value: "₹2L+", color: "text-neon-orange" },
    { icon: Clock, label: "Coding Hours", value: "48", color: "text-halloween-orange" },
    { icon: Code, label: "Projects", value: "50+", color: "text-neon-green" }
  ];

  const features = [
    {
      icon: Zap,
      title: "Cutting-Edge Challenges",
      description: "Tackle real-world problems with AI, blockchain, web dev, and mobile tech"
    },
    {
      icon: Users,
      title: "Expert Mentorship",
      description: "Get guidance from industry professionals and experienced faculty"
    },
    {
      icon: Rocket,
      title: "Amazing Prizes",
      description: "Win cash prizes, internships, and exclusive tech goodies"
    },
    {
      icon: Star,
      title: "Networking Opportunities",
      description: "Connect with like-minded developers and potential employers"
    }
  ];

  const sponsors = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      name: "Amazon Web Services",
      description: "Empowering innovation with scalable cloud solutions"
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      name: "Microsoft",
      description: "Driving digital transformation with cutting-edge technology"
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Google_Cloud_logo.svg",
      name: "Google Cloud",
      description: "Building smarter solutions with AI, ML, and cloud computing"
    },
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/02/Intel_logo_%282020%29.svg",
      name: "Intel",
      description: "Powering performance and innovation in hardware and AI"
    }
  ];


  const timeline = [
    { date: "Oct 9-10", title: "First Screening", imageUrl: "/public/ghost plan.png" },
    { date: "Oct 17, 8 AM", title: "Hackathon Begins", imageUrl: "/public/ghost code.png" },
    { date: "Oct 17, 8 PM", title: "Results Announced", imageUrl:"/public/ghost plan.png" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 10, 25, 0.8), rgba(74, 27, 107, 0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Floating Halloween Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl animate-float">🎃</div>
          <div className="absolute top-40 right-20 text-4xl animate-bob" style={{ animationDelay: '1s' }}>👻</div>
          <div className="absolute bottom-32 left-20 text-5xl animate-float" style={{ animationDelay: '2s' }}>🦇</div>
          <div className="absolute top-60 left-1/2 text-3xl animate-bob" style={{ animationDelay: '3s' }}>🕷️</div>
          <div className="absolute bottom-20 right-32 text-4xl animate-float" style={{ animationDelay: '4s' }}>🕸️</div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">

            {/* Event Badge */}
            <Badge className="bg-neon-orange text-spooky-dark text-lg px-6 py-2 mb-8 animate-glow">
              <Calendar className="w-5 h-5 mr-2" />
              October 9-17, 2025
            </Badge>

            {/* Main Heading */}
            <h1 className="text-7xl md:text-10xl font-spooky text-gradient-neon mb-6 leading-none animate-glow">
              MCKVIE HACKATHON
              <br />
              <span className="text-5xl md:text-6xl">2025</span>
            </h1>

            {/* Subtitle */}
            <p className="text-2xl md:text-3xl text-spooky-light mb-4 font-light">
              Where Code Meets <span className="text-gradient-spooky font-bold animate-flicker">Spookiness</span>
            </p>

            <p className="text-lg text-spooky-muted mb-12 max-w-2xl mx-auto leading-relaxed">
              Join MCKV Institute of Engineering for the most spine-tingling hackathon of the year.
              Code, compete, and conquer in our Halloween-themed coding challenge!
            </p>

            {/*countdown timer */}
            <p className="text-2xl md:text-3xl text-[#A3FF03] mb-4 font-light">Event Starts In:</p>
            <Countdown />


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link to="/auth">
                <Button variant="neon" size="xl" className="text-xl px-12 py-4 animate-glow">
                  Register Now
                </Button>
              </Link>
              <Link to="/problems">
                <Button variant="ghost_spooky" size="xl" className="text-xl px-12 py-4">
                  View Challenges
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-float"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color} animate-bob`} />
                  <div className={`text-3xl font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-spooky-muted text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-spooky-darker">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-spooky text-gradient-ghoul mb-6">
              Event Timeline
            </h2>
            <p className="text-xl text-spooky-muted max-w-2xl mx-auto">
              Mark your calendars for these spine-chilling dates!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <Card
                key={index}
                className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:glow-orange p-8 text-center animate-float"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="w-16 h-16 bg-gradient-halloween rounded-full flex items-center justify-center mx-auto mb-6 animate-bob">
                  <img
                    src={item.imageUrl} // <-- IMPORTANT: 'imageUrl' should be a property in your timeline item
                    alt={item.title}    // Alt text for accessibility
                    className="w-8 h-8 object-contain" // Adjusted for images. 'object-contain' ensures the image fits within the bounds without cropping.
                  />
                </div>
                <h3 className="text-xl font-spooky text-gradient-spooky mb-2">
                  {item.title}
                </h3>
                <p className="text-halloween-orange font-bold text-lg">
                  {item.date}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-spooky text-gradient-ghoul mb-6">
              Why Join Our Hackathon?
            </h2>
            <p className="text-xl text-spooky-muted max-w-3xl mx-auto">
              Experience the perfect blend of competitive coding, learning opportunities,
              and Halloween fun at MCKV Institute of Engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:glow-orange p-8 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-halloween rounded-lg flex items-center justify-center animate-bob">
                      <feature.icon className="w-6 h-6 text-spooky-dark" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-heading text-neon-glow mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neon-green leading-relaxed mb-1">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      { /* sponsors section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-spooky text-gradient-ghoul mb-6">
              Our Great Sponsors
            </h2>
            <p className="text-xl text-spooky-muted max-w-3xl mx-auto">
              Without these amazing partners, this event would not have been possible.
              A big shoutout from our MCKVIE community for making this event a reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {sponsors.map((sponsor, index) => (
              <Card
                key={index}
                className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:glow-orange p-8 animate-float"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <img
                      src={sponsor.logo}
                      alt={sponsor.name}
                      className="w-20 h-20 object-contain rounded-lg bg-white p-2 shadow-md animate-bob"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-heading text-neon-glow mb-2">
                      {sponsor.name}
                    </h3>
                    <p className="text-neon-green leading-relaxed">
                      {sponsor.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-halloween">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-spooky text-gradient-ghoul mb-6">
              Ready to Join the Hunt?
            </h2>
            <p className="text-xl text-spooky-light mb-8 leading-relaxed">
              Don't let this opportunity vanish into the night! Register your team now
              and be part of the most exciting hackathon experience at MCKVIE.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/auth">
                <Button variant="haunted" size="xl" className="text-xl px-12 py-4 bg-spooky-dark border-spooky-dark text-spooky-light hover:bg-spooky-light hover:text-spooky-dark glow-green">
                  Register Your Team
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="ghost_spooky" size="xl" className="text-xl px-12 py-4 border-spooky-dark text-spooky-dark hover:bg-spooky-dark hover:text-spooky-light">
                  Contact Organizers
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
