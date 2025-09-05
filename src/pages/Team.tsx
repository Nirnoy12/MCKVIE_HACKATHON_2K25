import Layout from '@/components/Layout';
import { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Users } from 'lucide-react';
import LightBulbToggle from '@/components/LightBulbToggle';

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  tags: string[];
};

const team: TeamMember[] = [
  {
    name: "Debayan Ghosh",
    role: "Student Coordinator",
    bio: "Ensures smooth hauntings… I mean operations, keeping the hackathon alive and kicking.",
    image: "/src/assets/Debayan.jpg",
    github: "https://github.com/Debayan-Ghosh2005",
    linkedin: "https://www.linkedin.com/in/myself-debayan-ghosh/",
    tags: ["Organizer", "Manager"]
  },
  {
    name: "Nirnoy Chatterjee",
    role: "Technical Lead",
    bio: "Architect of eerie algorithms and the mastermind behind the tech stack.",
    image: "src/assets/NirnoyChatterjee.jpg",
    github: "https://github.com/Nirnoy12",
    linkedin: "https://www.linkedin.com/in/nirnoy-chatterjee-903431357",
    tags: ["Developer", "Tech"]
  },
  {
    name: "Soumyajit Chatterjee",
    role: "Backend Developer",
    bio: "Building the bones of our infrastructure with robust APIs and databases.",
    image: "src/assets/SoumyajitChatterjee.jpg",
    github: "https://github.com/Soumyajit-Chatterjee",
    linkedin: "https://www.linkedin.com/in/soumyajit-chatterjee-ad",
    tags: ["Backend", "API"]
  },
  {
    name: "Indrajit Biswas",
    role: "Design Lead",
    bio: "Crafting spooky user experiences with dark magic and pixel perfection.",
    image: "src/assets/IndrajitBiswas.png",
    github: "https://github.com/Indra-dev404",
    linkedin: "https://www.linkedin.com/in/indrajit-biswas404",
    tags: ["Designer","Canva"]
  },
  {
    name: "Soumodip Ghosh",
    role: "Frontend Developer",
    bio: "Crafting blood-red interfaces that make users' hearts skip a beat.",
    image: "src/assets/SoumodipGhosh.png",
    github: "https://github.com/soumodip-ghosh",
    linkedin: "https://www.linkedin.com/in/soumodipghosh",
    tags: ["Frontend", "React"]
  },
  {
    name: "Kevin Steve Domingo",
    role: "PR & Outreach",
    bio: "Driving Engagement Through Successful Promotions",
    image: "/src/assets/kevin.png",
    github: "",
    linkedin: "https://www.linkedin.com/in/kevin-domingo-8587862a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=an",
    tags: ["Promotion", "Marketing"]
  },
  {
    name: "Argha Kamal Saha",
    role: "PR & Outreach",
    bio: "Floating through the cloud, roads, and digital media ensuring seamless funds.",
    image: "/src/assets/ARGHAKAMALSAHA.png",
    github: "https://github.com/pushanargha23",
    linkedin: "https://www.linkedin.com/in/argha-kamal-saha-1a1318305/",
    tags: ["Promotion", "Marketing"]
  },
  {
    name: "Aditya Sing",
    role: "Lead Content Creator",
    bio: "Wrapping our message in engaging content that keeps everyone wrapped up.",
    image: "/src/assets/ADIOGRAPHY.jpeg",
    github: "http://github.com/adityastark10",
    linkedin: "https://www.linkedin.com/in/aditya-sing-716502331?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    tags: ["Content", "Writing"]
  },
  {
    name: "Suchetana Mukherjee ",
    role: "Designer",
    bio: "Crafting spooky user experiences with dark magic and pixel perfection.",
    image: "src/assets/SuchetanaMukherjee.png",
    github: "https://github.com/mukherjeesuchetana514-maker",
    linkedin: "https://www.linkedin.com/in/suchetana-mukherjee-5a7873366",
    tags: ["Designer"]
  },
  {
    name: "Sohan Kundu",
    role: "Content Creator",
    bio: "Transforming our message into content that pulls people in and doesn’t let go.",
    image: "/src/assets/SOUL.webp",
    github: "https://github.com/Code-WithSohan/Projects.-Exe?fbclid=PAdGRjcAMlf0ZleHRuA2FlbQIxMQABp90_IMSQquTcapJROdSV9BhyMuXc1wIeKa05UDwItyeun7efu3K023NfQedG_aem_wE8qcCOOycesEHu_1jUIgA",
    linkedin: "https://www.linkedin.com/in/sohan-kundu-6b012b315?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    tags: ["Video Editing","Media"]
  },
];

function SkewedTeamPage({ member, index, isActive, isInactive }: { 
  member: TeamMember; 
  index: number; 
  isActive: boolean; 
  isInactive: boolean; 
}) {
  const isEven = index % 2 === 0;
  
  return (
    <div className={`skw-page skw-page-${index + 1} ${isActive ? 'active' : ''} ${isInactive ? 'inactive' : ''}`}>
      <div className="skw-page__half skw-page__half--left">
        <div className="skw-page__skewed">
          <div 
            className="skw-page__content"
            style={{
              backgroundImage: isEven ? `url(${member.image})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!isEven && (
              <div className="text-center">
                <h2 className="skw-page__heading text-gradient-neon">{member.name}</h2>
                <p className="skw-page__role text-halloween-orange font-semibold mb-4">{member.role}</p>
                <p className="skw-page__description text-spooky-muted mb-6">{member.bio}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {member.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-halloween-orange/20 text-halloween-orange text-sm rounded-full border border-halloween-orange/30">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {member.github && (
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-spooky-muted hover:text-white transition-colors duration-300 hover:scale-110"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-spooky-muted hover:text-blue-400 transition-colors duration-300 hover:scale-110"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-spooky-muted hover:text-halloween-orange transition-colors duration-300 hover:scale-110"
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="skw-page__half skw-page__half--right">
        <div className="skw-page__skewed">
          <div 
            className="skw-page__content"
            style={{
              backgroundImage: isEven ? 'none' : `url(${member.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {isEven && (
              <div className="text-center">
                <h2 className="skw-page__heading text-gradient-neon">{member.name}</h2>
                <p className="skw-page__role text-halloween-orange font-semibold mb-4">{member.role}</p>
                <p className="skw-page__description text-spooky-muted mb-6">{member.bio}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {member.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-halloween-orange/20 text-halloween-orange text-sm rounded-full border border-halloween-orange/30">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  {member.github && (
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-spooky-muted hover:text-white transition-colors duration-300 hover:scale-110"
                    >
                      <Github className="w-6 h-6" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-spooky-muted hover:text-blue-400 transition-colors duration-300 hover:scale-110"
                    >
                      <Linkedin className="w-6 h-6" />
                    </a>
                  )}
                  {member.email && (
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-spooky-muted hover:text-halloween-orange transition-colors duration-300 hover:scale-110"
                    >
                      <Mail className="w-6 h-6" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Team = () => {
  // REMOVED: scrollY and isScrolling state
  // const [scrollY, setScrollY] = useState(0);
  // const [isScrolling, setIsScrolling] = useState(false);

  const [showLightBulb, setShowLightBulb] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const headerRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);

  // NEW: ref for the tall scroll container that drives pages
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Header parallax (simplified, still uses window.scrollY)
  useEffect(() => {
    if (!showLightBulb && headerRef.current && image1Ref.current && image2Ref.current) {
      const images = [image1Ref.current, image2Ref.current];
      
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const headerHeight = headerRef.current?.offsetHeight || windowHeight;
        
        // Calculate scroll progress (0 to 1)
        const scrollProgress = Math.min(scrollY / (headerHeight * 0.5), 1);
        
        // Apply transform to each image
        images.forEach((el, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          const translateX = scrollProgress * 100 * direction;
          el.style.transform = `translateX(${translateX}%)`;
        });
      };

      window.addEventListener('scroll', handleScroll);
      
      // Initial call to set starting position
      handleScroll();
      
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showLightBulb]);

  // REPLACED: scroll-driven page calculation (no wheel/keydown)
  useEffect(() => {
    if (showLightBulb || !scrollContainerRef.current) return;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const { top, height } = container.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;
      
      // Calculate scroll progress within the container (0 to 1)
      const progress = Math.max(0, Math.min(1, -top / (scrollableHeight || 1)));
      
      // Determine the current page based on progress
      const newPage = Math.floor(progress * team.length) + 1;
      
      // Ensure we don't go beyond the last page
      setCurrentPage(Math.min(newPage, team.length));
    };

    // run once to sync
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, [showLightBulb, team.length]);


  const handleTeamButtonClick = () => {
    setShowLightBulb(false);
  };

  if (showLightBulb) {
    return <LightBulbToggle onTeamButtonClick={handleTeamButtonClick} />;
  }

  return (
    <Layout>
      <div className="relative bg-black"> {/* Removed min-h-screen and overflow-hidden as requested */}
        {/* Animated Header with Split Images */}
        <header 
          ref={headerRef}
          className="relative w-full min-h-screen overflow-x-hidden flex justify-center items-center"
        >
          <img 
            ref={image1Ref}
            src="https://images.unsplash.com/photo-1448518184296-a22facb4446f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000"
            style={{
              clipPath: 'polygon(100% 100%, 0% 100%, 100% 0)',
            }}
          />
          <img 
            ref={image2Ref}
            src="https://images.unsplash.com/photo-1448518184296-a22facb4446f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000"
            style={{
              clipPath: 'polygon(0 0, 0% 100%, 100% 0)',
            }}
          />
          <h1 className="relative z-10 text-6xl md:text-8xl font-spooky text-gradient-neon transform -rotate-12 font-extrabold">
            Meet the Team
          </h1>
        </header>

        {/* Content Section */}
        <div className="relative z-20 bg-gradient-spooky">
          <p className="px-12 py-16 text-xl text-neon-orange leading-relaxed max-w-6xl mx-auto">
            Every great hackathon project begins with a team that dares to dream, build, and innovate together.
            Our team brings together diverse skill sets, creative thinking, and a passion for solving real-world problems with technology.
            Together, we are more than just a hackathon team, we are a group of curious minds, builders, and dreamers who believe in creating solutions that matter.
          </p>

          {/* NEW: Scroll Container Wrapper */}
          <div
            ref={scrollContainerRef}
            // Set a height that gives us room to scroll through all members
            style={{ height: `${team.length * 100}vh` }} 
            className="relative"
          >
            {/* Skewed Pages Container is now sticky inside this wrapper */}
            <div className="skw-pages sticky top-0 h-screen">
              {team.map((member, index) => (
                <SkewedTeamPage
                  key={index}
                  member={member}
                  index={index}
                  isActive={currentPage === index + 1}
                  isInactive={currentPage !== index + 1}
                />
              ))}
            </div>

            {/* Navigation and instructions can stay, but they are inside the main layout flow now */}
          </div>

          {/* Navigation Indicators */}
          <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
            {team.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index + 1 
                    ? 'bg-halloween-orange scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Scroll Instructions */}
          <div className="fixed bottom-8 left-8 z-50 text-white/60 text-sm">
            <p>Scroll to navigate</p>
          </div>
        </div>

        {/* Closing Note */}
        <div className="relative z-20 text-center py-20 bg-black">
          <Users className="w-10 h-10 text-halloween-orange mx-auto mb-4" />
          <h2 className="text-3xl font-spooky text-gradient-ghoul mb-2">
            And many more volunteers...
          </h2>
          <p className="text-spooky-muted max-w-2xl mx-auto px-4">
            From mentors to organizers, our entire community is the real magic
            that powers the MCKVIE Halloween Hackathon.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Team;
