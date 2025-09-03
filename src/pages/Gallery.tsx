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
    place: 'Liluah, Howrah',
    title: 'Costume',
    title2: 'Code Jam',
    description: 'Join us for a thrilling coding event with spooky themes and creative costumes. Perfect for AI and ML enthusiasts.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'Oct 10, 2025',
    category: 'AI & ML Showcase'
  },
  {
    id: 2,
    place: 'Liluah, Howrah',
    title: 'Haunted',
    title2: 'Hackathon',
    description: 'Code your way through challenges with a spooky twist during our annual Halloween Hackathon.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'Oct 12, 2025',
    category: 'Hackathon'
  },
  {
    id: 3,
    place: 'Liluah, Howrah',
    title: 'AI & ML',
    title2: 'Showcase',
    description: 'Witness cutting-edge innovations in AI and ML as our students showcase their projects.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    date: 'Oct 14, 2025',
    category: 'Showcase'
  }
];

function GalleryCard({ item, isActive }: { item: GalleryItem; isActive: boolean }) {
  return (
    <div
      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        backgroundImage: `url(${item.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-6">
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span className="text-white text-sm">{item.place}</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{item.title}</h1>
        <h2 className="text-4xl md:text-6xl font-bold text-orange-500 mb-6">{item.title2}</h2>
        <p className="text-gray-300 max-w-xl mb-6">{item.description}</p>
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-orange-500" />
          <span className="text-sm text-gray-200">{item.date}</span>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white hover:bg-orange-600 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
          <button className="px-6 py-2 border border-white text-white rounded-full text-sm uppercase hover:bg-white hover:text-black transition-colors">
            Explore Location
          </button>
        </div>
      </div>
    </div>
  );
}

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryData.length);
    }, 5000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % galleryData.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + galleryData.length) % galleryData.length);

  return (
    <Layout>
      <div className="relative h-screen w-screen overflow-hidden">
        {galleryData.map((item, index) => (
          <GalleryCard key={item.id} item={item} isActive={index === currentIndex} />
        ))}

        {/* Controls */}
        <div className="absolute bottom-8 w-full flex justify-center items-center gap-6 z-30">
          <button
            onClick={prevSlide}
            className="w-10 h-10 border-2 border-white/50 rounded-full flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Indicators */}
          <div className="flex gap-3">
            {galleryData.map((_, index) => (
              <span
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === currentIndex ? 'bg-orange-500 scale-110' : 'bg-white/50'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 border-2 border-white/50 rounded-full flex items-center justify-center text-white hover:border-orange-500 hover:text-orange-500 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
