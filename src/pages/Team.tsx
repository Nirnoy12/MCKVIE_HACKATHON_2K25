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
    bio: "Ensures smooth hauntings… I mean from coding to managing, keeping the hackathon alive and kicking.",
    image: "/src/assets/Debayan.jpg",
    github: "https://github.com/Debayan-Ghosh2005",
    linkedin: "https://www.linkedin.com/in/myself-debayan-ghosh/",
    tags: ["Organizer", "Manager","Coder"]
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
    role: "Database Developer",
    bio: "Building the bones of our infrastructure with robust APIs and databases.",
    image: "src/assets/SoumyajitChatterjee.jpg",
    github: "https://github.com/Soumyajit-Chatterjee",
    linkedin: "https://www.linkedin.com/in/soumyajit-chatterjee-ad",
    tags: ["Database", "API"]
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
    email: "kevindomingo1800@gmail.com",
    linkedin: "https://www.linkedin.com/in/kevin-domingo-8587862a6",
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
    linkedin: "https://www.linkedin.com/in/aditya-sing-716502331",
    tags: ["Content", "Writing"]
  },
  {
    name: "Suchetana Mukherjee ",
    role: "Designer",
    bio: "Crafting spooky user experiences with dark magic and pixel perfection.",
    image: "src/assets/SuchetanaMukherjee.jpg",
    github: "https://github.com/mukherjeesuchetana514-maker",
    linkedin: "https://www.linkedin.com/in/suchetana-mukherjee-5a7873366",
    tags: ["Designer"]
  },
  {
    name: "Sohan Kundu",
    role: "Content Creator",
    bio: "Transforming our message into content that pulls people in and doesn’t let go.",
    image: "/src/assets/SOUL.png",
    github: "https://github.com/Code-WithSohan",
    linkedin: "https://www.linkedin.com/in/sohan-kundu-6b012b315",
    tags: ["Video Editing","Media"]
  },
];

// --- ADD THIS ABOVE your existing `SkewedTeamPage` (only this block) ---
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768); // tailwind md breakpoint
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="bg-spooky-dark rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
      <img
        src={member.image}
        alt={member.name}
        className="w-24 h-24 rounded-full object-cover border-4 border-halloween-orange mb-4"
      />
      <h3 className="text-xl font-bold text-gradient-neon">{member.name}</h3>
      <p className="text-halloween-orange font-semibold">{member.role}</p>
      <p className="text-spooky-muted text-sm mt-2">{member.bio}</p>

      <div className="flex flex-wrap justify-center gap-2 my-4">
        {member.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-halloween-orange/20 text-halloween-orange text-sm rounded-full border border-halloween-orange/30"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-4">
        {member.github && (
          <a href={member.github} target="_blank" rel="noopener noreferrer">
            <Github className="w-5 h-5 text-spooky-muted hover:text-white transition" />
          </a>
        )}
        {member.linkedin && (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin className="w-5 h-5 text-spooky-muted hover:text-blue-400 transition" />
          </a>
        )}
        {member.email && (
          <a href={`mailto:${member.email}`}>
            <Mail className="w-5 h-5 text-spooky-muted hover:text-halloween-orange transition" />
          </a>
        )}
      </div>
    </div>
  );
}

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
  const [showLightBulb, setShowLightBulb] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const headerRef = useRef<HTMLElement>(null);
  const image1Ref = useRef<HTMLImageElement>(null);
  const image2Ref = useRef<HTMLImageElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // --- INSERT THIS LINE inside your `Team` component, right after your other useState hooks ---
  const isMobile = useIsMobile();

  // Header parallax
  useEffect(() => {
    if (!showLightBulb && headerRef.current && image1Ref.current && image2Ref.current) {
      const images = [image1Ref.current, image2Ref.current];

      const handleScroll = () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const headerHeight = headerRef.current?.offsetHeight || windowHeight;

        const scrollProgress = Math.min(scrollY / (headerHeight * 0.5), 1);

        images.forEach((el, index) => {
          const direction = index % 2 === 0 ? 1 : -1;
          const translateX = scrollProgress * 100 * direction;
          el.style.transform = `translateX(${translateX}%)`;
        });
      };

      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showLightBulb]);

  // Scroll-driven page calculation
  useEffect(() => {
    if (showLightBulb || !scrollContainerRef.current) return;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { top, height } = container.getBoundingClientRect();
      const scrollableHeight = height - window.innerHeight;

      const progress = Math.max(0, Math.min(1, -top / (scrollableHeight || 1)));
      const newPage = Math.floor(progress * team.length) + 1;
      setCurrentPage(Math.min(newPage, team.length));
    };

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
      <div className="relative bg-black">
        {/* Animated Header with Split Images */}
        <header
          ref={headerRef}
          className="relative w-full min-h-screen overflow-x-hidden flex justify-center items-center"
        >
          <img
            ref={image1Ref}
            src="public/ghost-org1.jpg"
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-1000"
            style={{
              clipPath: 'polygon(100% 100%, 0% 100%, 100% 0)',
            }}
          />
          <img
            ref={image2Ref}
            src="public/ghost-org1.jpg"
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

        {/* --- REPLACED CONTENT SECTION --- */}
        <div className="relative z-20 bg-gradient-spooky">
          <p className="px-6 md:px-12 py-8 md:py-16 text-lg md:text-xl text-neon-orange leading-relaxed max-w-6xl mx-auto text-center">
            Every great hackathon project begins with a team that dares to dream, build, and innovate together.
            Our team brings together diverse skill sets, creative thinking, and a passion for solving real-world problems with technology.
            Together, we are more than just a hackathon team — we are curious minds, builders, and dreamers.
          </p>

          {isMobile ? (
            /* Mobile: Card layout */
            <div className="px-4 pb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {team.map((member, index) => (
                  <TeamCard key={index} member={member} />
                ))}
              </div>
            </div>
          ) : (
            /* Desktop/Laptop: original skewed scroll layout */
            <>
              <div
                ref={scrollContainerRef}
                style={{ height: `${team.length * 100}vh` }}
                className="relative"
              >
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
              </div>

              {/* Navigation Indicators (desktop only) */}
              <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-2">
                {team.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // jump to page by setting currentPage; scroll sync effect will handle visual
                      setCurrentPage(index + 1);
                      // smooth scroll to container top so selected page becomes visible
                      scrollContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      currentPage === index + 1
                        ? 'bg-halloween-orange scale-125'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Scroll Instructions (desktop only) */}
              <div className="fixed bottom-8 left-8 z-50 text-white/60 text-sm">
                <p>Scroll to navigate</p>
              </div>
            </>
          )}
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