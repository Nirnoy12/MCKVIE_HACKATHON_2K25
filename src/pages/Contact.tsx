import React from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react"; 
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Clock,
  Users,
  Globe
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { FaInstagram, FaEnvelope } from "react-icons/fa";

const Contact = () => {
  const spcontact = [
    {
      name: "Mr. Debayan Ghosh",
      phone: "+916291873010", // No spaces or symbols for the URL
    },
    {
      name: "Mr. Indrajit Biswas ",
      phone: "+918617204007",
    },
    {
      name: "Mr. Kevin Steve Domingo",
      phone: "+919088998444",
    }
  ];

  const contactMethods = [
    {
      icon: FaEnvelope,
      label: "Email Us",
      value: "mckvie.hackathon.2k25",
      description: "Click the mail icon to email us directly",
      action: "mailto:mckvie.hackathon.2k25@gmail.com"
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      value: "mckvie_hackathon",
      description: "Follow us for the latest updates",
      action: "https://www.instagram.com/mckvie_hackathon2k25?igsh=c21nbXJkanVldm1v"
    },
    {
      icon: SiWhatsapp,
      label: "Whatsapp Group",
      value: "Official Hackathon Whatsapp Group",
      description: "Follow the MCKVIE HACKATHON channel on WhatsApp to be updated about all the latest news about our hackathon.",
      action: "https://whatsapp.com/channel/0029VbAyI53EKyZ9SIq9a50u"
    },
    {
      icon: Globe,
      label: "Website",
      value: "www.mckvie.edu.in",
      description: "Visit our official Institute website for any details about our college.",
      action: "https://www.mckvie.edu.in"
    }
  ];

  const faqs = [
  {
    question: "How can I register for MCKVIE Hackathon 2K25?",
    answer: "You can register through the official event portal.",
  },
  {
    question: "Can I participate across different departments and years?",
    answer: "Yes, participation across departments and years is allowed.",
  },
  {
    question: "Can I participate across different colleges?",
    answer: "Yes, participation from different colleges is permitted.",
  },
  {
    question: "What is the registration fee for the hackathon?",
    answer: "There is registration fee! You can view the details on the registration page.",
  },
  {
    question: "What is the last day to register?",
    answer: "The last date for registration is October 9th, 2025.",
  },

  {
    question: "What should I bring to the hackathon?",
    answer: "Bring your laptop, charger, government-issued ID, and lots of enthusiasm! We'll provide meals, snacks, and all the spooky vibes you need.",
  },


  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-spooky text-gradient-neon text-transparent bg-clip-text mb-6 animate-glow">
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
            <h2 className="text-3xl font-spooky text-gradient-ghoul text-transparent bg-clip-text mb-6">
              Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <Card
                  key={index}
                  className="bg-card border-orange-600 hover:border-orange-400 transition-all duration-300 hover:shadow-[0_0_15px_#ff3b3b] p-6 cursor-pointer animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                  onClick={() => method.action.startsWith('http') ? window.open(method.action, '_blank') : window.location.href = method.action}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12  rounded-full flex items-center justify-center animate-bob">
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-heading text-gradient-spooky mb-1">
                        {method.label}
                      </h3>
                      {method.value && (
                        <p className="text-halloween-orange font-bold mb-1">
                          {method.value}
                        </p>
                      )}
                      <p className="text-sm text-spooky-muted">
                        {method.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              {/* Map */}
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-3xl font-spooky text-gradient-ghoul text-transparent bg-clip-text mb-6">
                  Our Location
                </h2>
                <Card className="bg-card border-red-600 p-2 overflow-hidden shadow-lg">
                  <div className="relative p-2 bg-black rounded-xl shadow-[0_0_20px_5px_rgba(255,0,0,0.7)]">
                    <iframe
                      title="MCKVIE Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1179.9289977725145!2d88.34797474294864!3d22.61976036850415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89d65da7b3775%3A0x30915f7e98f1b0d5!2sMCKV%20Institute%20of%20Engineering!5e0!3m2!1sen!2sin!4v1756609585992!5m2!1sen!2sin"
                      width="100%"
                      height="438"
                      className="border-2 border-red-500 rounded-xl shadow-[0_0_30px_5px_rgba(255,0,0,0.8)]"
                      style={{ filter: "grayscale(100%) sepia(100%) saturate(500%) hue-rotate(-50deg)" }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>

                    <div className="absolute bottom-2 right-2 text-spooky-orange font-creepster text-sm drop-shadow-[0_0_8px_#b30000]">
                      🔥 Haunted Map 🔥
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Social Links */}
            <Card className="bg-card border-orange-600 p-6 shadow-lg">
              <h3 className="text-2xl font-spooky text-gradient-ghoul text-transparent bg-clip-text mb-4">
                Call Us
              </h3>
              <div className="space-y-4"> {/* Use space-y for vertical stacking */}
                {spcontact.map((spcontact) => (
                  <div
                    key={spcontact.name}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-halloween-purple-muted"
                  >
                    {/* Organizer Name */}
                    <span className="font-semibold text-spooky-light">{spcontact.name}</span>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                      {/* WhatsApp Icon */}
                      <a
                        href={`https://wa.me/${spcontact.phone}`} // Creates the WhatsApp link
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Chat with ${spcontact.phone} on WhatsApp`}
                        className="text-spooky-muted hover:text-green-500 transition-colors"
                      >
                        <SiWhatsapp className="w-5 h-5 text-neon-green" />
                      </a>

                      {/* Phone Icon */}
                      <a
                        href={`tel:${spcontact.phone}`} // Creates the call link
                        aria-label={`Call ${spcontact.name}`}
                        className="text-spooky-muted hover:text-halloween-orange transition-colors"
                      >
                        <Phone className="w-5 h-5 text-neon-orange" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Info */}
            <Card className="bg-gradient-to-br from-red-600 to-red-900 p-6 text-center shadow-lg">
              <h3 className="text-2xl font-spooky text-gradient-ghoul mb-4">
                Quick Info
              </h3>
              <div className="space-y-4 text-white">
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
            <Card className="bg-card border-red-600 p-6 shadow-lg">
              <h3 className="text-2xl font-spooky text-gradient-ghoul text-transparent bg-clip-text mb-4">
                Quick FAQs
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="text-sm text-neon-orange font-semibold  mb-1">
                      {faq.question}
                    </h4>
                    <p className="text-xs text-halloween-muted leading-relaxed">
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
