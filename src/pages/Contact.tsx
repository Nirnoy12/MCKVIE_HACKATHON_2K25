import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Instagram,
  Twitter,
  Clock,
  Users
} from 'lucide-react';

const Contact = () => {
  const organizers = [
    {
      name: "Dr. Spooky Singh",
      role: "Faculty Coordinator",
      email: "spooky.singh@mckvie.edu.in",
      phone: "+91 98765 43210",
      image: "👨‍💻"
    },
    {
      name: "Phantom Patel",
      role: "Student Coordinator", 
      email: "phantom.patel@student.mckvie.edu.in",
      phone: "+91 87654 32109",
      image: "👩‍💻"
    },
    {
      name: "Ghoulish Gupta",
      role: "Technical Lead",
      email: "ghoulish.gupta@mckvie.edu.in", 
      phone: "+91 76543 21098",
      image: "🧙‍♂️"
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email Us",
      value: "hackathon@mckvie.edu.in",
      description: "Primary communication channel",
      action: "mailto:hackathon@mckvie.edu.in"
    },
    {
      icon: Phone,
      label: "Call Us",
      value: "+91 98765 43210",
      description: "Available 9 AM - 6 PM",
      action: "tel:+919876543210"
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: "MCKV Institute of Engineering",
      description: "243 G.T. Road (North), Liluah, Howrah - 711204",
      action: "https://maps.google.com"
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.mckvie.edu.in",
      description: "Official institute website",
      action: "https://www.mckvie.edu.in"
    }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com/mckvie-hackathon", color: "hover:text-white" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com/school/mckvie", color: "hover:text-blue-400" },
    { icon: Instagram, label: "Instagram", url: "https://instagram.com/mckvie_official", color: "hover:text-pink-400" },
    { icon: Twitter, label: "Twitter", url: "https://twitter.com/mckvie_official", color: "hover:text-blue-300" }
  ];

  const faqs = [
    {
      question: "What should I bring to the hackathon?",
      answer: "Bring your laptop, charger, government-issued ID, and lots of enthusiasm! We'll provide meals, snacks, and all the spooky vibes you need."
    },
    {
      question: "Can I participate if I'm a beginner?",
      answer: "Absolutely! We have problem statements for all skill levels. Our mentors will be available to guide beginners throughout the event."
    },
    {
      question: "Is there any registration fee?",
      answer: "No! The MCKVIE Halloween Hackathon is completely free to participate. We believe in making coding accessible to everyone."
    },
    {
      question: "What if I don't have a team?",
      answer: "Don't worry! We'll have a team formation session during registration where you can find like-minded teammates."
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-heading text-gradient-halloween mb-6 animate-glow">
            Get in Touch
          </h1>
          <p className="text-xl text-spooky-muted max-w-3xl mx-auto leading-relaxed">
            Have questions about the Halloween hackathon? Our spooky support team is here to help! 
            Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Contact Methods */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-3xl font-spooky text-gradient-halloween mb-6">
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <Card 
                  key={index}
                  className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:glow-orange p-6 cursor-pointer animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => method.action.startsWith('http') ? window.open(method.action, '_blank') : window.location.href = method.action}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-halloween rounded-full flex items-center justify-center animate-bob">
                        <method.icon className="w-6 h-6 text-spooky-dark" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-spooky-light mb-1">
                        {method.label}
                      </h3>
                      <p className="text-halloween-orange font-medium mb-1">
                        {method.value}
                      </p>
                      <p className="text-sm text-spooky-muted">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Organizers */}
            <div className="mt-12">
              <h2 className="text-3xl font-spooky text-gradient-halloween mb-6">
                Meet the Organizers
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {organizers.map((organizer, index) => (
                  <Card 
                    key={index}
                    className="bg-card border-halloween-purple-muted hover:border-halloween-orange transition-all duration-300 hover:glow-orange p-6 text-center animate-float"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <div className="text-6xl mb-4 animate-bob">
                      {organizer.image}
                    </div>
                    <h3 className="text-xl font-semibold text-spooky-light mb-2">
                      {organizer.name}
                    </h3>
                    <Badge className="bg-halloween-orange text-spooky-dark mb-3">
                      {organizer.role}
                    </Badge>
                    <div className="space-y-2 text-sm text-spooky-muted">
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="w-4 h-4 text-halloween-orange" />
                        <span>{organizer.email}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="w-4 h-4 text-halloween-orange" />
                        <span>{organizer.phone}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Social Links */}
            <Card className="bg-card border-halloween-purple-muted p-6 shadow-lg">
              <h3 className="text-2xl font-spooky text-gradient-halloween mb-4">
                Follow Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost_spooky"
                    size="sm"
                    className={`justify-start ${social.color} transition-colors duration-300`}
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <social.icon className="w-4 h-4 mr-2" />
                    {social.label}
                  </Button>
                ))}
              </div>
            </Card>

            {/* Quick Info */}
            <Card className="bg-gradient-halloween p-6 text-center shadow-lg glow-orange">
              <h3 className="text-xl font-spooky text-spooky-dark mb-4">
                Quick Info
              </h3>
              <div className="space-y-4 text-spooky-dark">
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Response Time</p>
                    <p className="text-sm">Within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Users className="w-5 h-5" />
                  <div>
                    <p className="font-semibold">Support Available</p>
                    <p className="text-sm">9 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* FAQs */}
            <Card className="bg-card border-halloween-purple-muted p-6 shadow-lg">
              <h3 className="text-xl font-spooky text-gradient-halloween mb-4">
                Quick FAQs
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-semibold text-halloween-orange mb-1">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-spooky-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;