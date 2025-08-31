import Layout from '@/components/Layout';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, MapPin, Calendar } from 'lucide-react';

type GalleryItem = {
  id: number;
  place: string;
  title: string;
  title2: string;
  description: string;
  image: string;
  date: string;
  category: string;
};

const galleryData: GalleryItem[] = [
  {
    id: 1,
    place: 'Spooky Manor',
    title: 'HAUNTED',
    title2: 'HALLOWEEN',
    description: 'Experience the thrill of our haunted mansion where every corner holds a spooky surprise. Perfect for those who dare to explore the supernatural side of Halloween festivities.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'October 31st',
    category: 'Haunted House'
  },
  {
    id: 2,
    place: 'Pumpkin Patch',
    title: 'GOLDEN',
    title2: 'HARVEST',
    description: 'Wander through endless rows of glowing pumpkins under the harvest moon. Pick your perfect pumpkin and enjoy seasonal treats in this magical autumn setting.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'October 15-30',
    category: 'Pumpkin Festival'
  },
  {
    id: 3,
    place: 'Witch\'s Forest',
    title: 'ENCHANTED',
    title2: 'WOODS',
    description: 'Step into a mystical forest where ancient trees whisper secrets and magical creatures roam freely. A perfect escape for those seeking adventure and wonder.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'October 20-25',
    category: 'Forest Adventure'
  },
  {
    id: 4,
    place: 'Zombie Zone',
    title: 'APOCALYPSE',
    title2: 'SURVIVAL',
    description: 'Test your survival skills in our post-apocalyptic zombie zone. Navigate through abandoned buildings and face the undead in this thrilling interactive experience.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'October 28-29',
    category: 'Survival Game'
  },
  {
    id: 5,
    place: 'Ghost Town',
    title: 'PHANTOM',
    title2: 'PARADISE',
    description: 'Explore the eerie streets of our ghost town where spirits of the past still linger. Every building tells a story in this atmospheric Halloween destination.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'October 26-27',
    category: 'Ghost Tour'
  },
  {
    id: 6,
    place: 'Vampire Castle',
    title: 'NOCTURNAL',
    title2: 'NEXUS',
    description: 'Enter the realm of the night at our vampire castle. Experience the elegance and mystery of the undead in this sophisticated Halloween celebration.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'October 22-24',
    category: 'Vampire Ball'
  }
];

function GalleryCard({ item, index, isActive, isVisible }: { 
  item: GalleryItem; 
  index: number; 
  isActive: boolean; 
  isVisible: boolean;
}) {
  const getCardPosition = () => {
    if (isActive) {
      return {
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        zIndex: 20,
        borderRadius: 0,
        transform: "translateX(0) translateY(0)",
        boxShadow: "0 0 50px rgba(255, 165, 0, 0.3)",
      };
    } else {
      const isMobile = window.innerWidth < 768;
      const cardWidth = isMobile ? "40vw" : "18vw";  // responsive width
      const cardHeight = isMobile ? "55vw" : "28vw"; // responsive height
      const gap = isMobile ? 4 : 2; // use rem instead of px
      const startX = isMobile ? 5 : 3; // spacing from left side
      const startY = window.innerHeight - (isMobile ? 60 : 120);

      return {
        width: "var(--card-width)",
        height: "var(--card-height)",
        top: `${startY}px`,
        left: `calc(${startX}rem + ${index} * (var(--card-width) + ${gap}rem))`,
        zIndex: 10,
        borderRadius: "1rem",
        transform: "translateX(0) translateY(0)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.6)",
      };
    }
  };

  const position = getCardPosition();

  return (
    <div
      className={`absolute transition-all duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        ...position,
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Card Content Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end ${
        isActive ? 'opacity-100' : 'opacity-70'
      }`}>
        <div className="text-white">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-halloween-orange" />
            <span className="text-sm font-medium">{item.place}</span>
          </div>
          <h3 className="text-lg font-bold mb-1">{item.title}</h3>
          <h4 className="text-lg font-bold text-halloween-orange mb-2">{item.title2}</h4>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-halloween-orange" />
            <span className="text-xs">{item.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryDetails({ item, isVisible }: { item: GalleryItem; isVisible: boolean }) {
  return (
    <div className={`absolute top-48 left-4 md:left-16 z-30 text-white transition-all duration-1000 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
    }`}>
      <div className="mb-6">
        <div className="h-12 overflow-hidden mb-2">
          <div className={`text-xl md:text-2xl font-medium transition-transform duration-700 ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}>
            {item.place}
          </div>
        </div>
        <div className="w-8 h-1 bg-white rounded-full mb-4"></div>
      </div>
      
      <div className="mb-6">
        <div className="h-16 md:h-24 overflow-hidden mb-2">
          <div className={`text-4xl md:text-6xl font-bold transition-transform duration-700 delay-100 ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}>
            {item.title}
          </div>
        </div>
        <div className="h-16 md:h-24 overflow-hidden">
          <div className={`text-4xl md:text-6xl font-bold text-halloween-orange transition-transform duration-700 delay-150 ${
            isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}>
            {item.title2}
          </div>
        </div>
      </div>
      
      <div className="mb-8 max-w-sm md:max-w-md">
        <div className={`transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-base md:text-lg leading-relaxed mb-4">{item.description}</p>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-halloween-orange/20 text-halloween-orange text-sm rounded-full border border-halloween-orange/30">
              {item.category}
            </span>
            <span className="text-sm text-gray-300">{item.date}</span>
          </div>
        </div>
      </div>
      
      <div className={`flex items-center gap-4 transition-all duration-700 delay-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <button className="w-10 h-10 bg-halloween-orange rounded-full flex items-center justify-center text-white hover:bg-halloween-orange/80 transition-colors">
          <Bookmark className="w-5 h-5" />
        </button>
        <button className="px-6 py-2 border border-white text-white rounded-full text-sm uppercase hover:bg-white hover:text-black transition-colors">
          Explore Location
        </button>
      </div>
    </div>
  );
}

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Show content after initial load
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-advance slides
    intervalRef.current = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % galleryData.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  return (
    <Layout>
      <div className="relative min-h-screen bg-black overflow-hidden">
        {/* Progress Indicator */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-halloween-orange z-50">
          <div 
            className="h-full bg-gradient-to-r from-halloween-orange to-yellow-400 transition-all duration-1000"
            style={{ width: `${((currentIndex + 1) / galleryData.length) * 100}%` }}
          />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-halloween-orange rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">🎃</span>
            </div>
            <span className="text-white font-medium uppercase tracking-wider">Spooky Gallery</span>
          </div>
          
          <div className="flex items-center gap-8 text-white text-sm font-medium">
            <span className="cursor-pointer hover:text-halloween-orange transition-colors">Home</span>
            <span className="cursor-pointer hover:text-halloween-orange transition-colors">Gallery</span>
            <span className="cursor-pointer hover:text-halloween-orange transition-colors">Events</span>
            <span className="cursor-pointer hover:text-halloween-orange transition-colors">Contact</span>
          </div>
        </nav>

        {/* Main Gallery Area */}
        <div className="relative w-full h-screen">
          {/* Cards */}
          {galleryData.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
              isActive={index === currentIndex}
              isVisible={isVisible}
            />
          ))}

          {/* Details Panel */}
          <GalleryDetails 
            item={galleryData[currentIndex]} 
            isVisible={isVisible && !isTransitioning}
          />

          {/* Pagination Controls */}
          <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 z-30 flex items-center gap-3 md:gap-6">
            {/* Arrow Controls */}
            <div className="flex items-center gap-2 md:gap-4">
              <button
                onClick={prevSlide}
                disabled={isTransitioning}
                className="w-10 h-10 md:w-12 md:h-12 border-2 border-white/50 rounded-full flex items-center justify-center text-white hover:border-halloween-orange hover:text-halloween-orange transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isTransitioning}
                className="w-10 h-10 md:w-12 md:h-12 border-2 border-white/50 rounded-full flex items-center justify-center text-white hover:border-halloween-orange hover:text-halloween-orange transition-colors disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-48 md:w-96 h-1 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-halloween-orange to-yellow-400 transition-all duration-1000"
                style={{ width: `${((currentIndex + 1) / galleryData.length) * 100}%` }}
              />
            </div>

            {/* Slide Numbers */}
            <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden">
              {galleryData.map((_, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center justify-center text-white font-bold text-xl md:text-2xl transition-transform duration-500 ${
                    index === currentIndex ? 'translate-y-0' : 'translate-y-full'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 md:bottom-8 right-4 md:right-8 z-30 flex gap-1 md:gap-2">
            {galleryData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-halloween-orange scale-125' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating Particles */}
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-halloween-orange rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                opacity: 0.3 + Math.random() * 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
