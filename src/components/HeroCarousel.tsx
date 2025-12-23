import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    gradient: string;
}

const slides: Slide[] = [
    {
        id: 1,
        title: "Welcome to Ansar Higher Secondary School",
        subtitle: "Excellence in Education",
        image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&q=80",
        gradient: "from-blue-600 via-purple-600 to-indigo-700",
    },
    {
        id: 2,
        title: "State-of-the-Art Facilities",
        subtitle: "Modern Learning Environment",
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80",
        gradient: "from-emerald-600 via-teal-600 to-cyan-700",
    },
    {
        id: 3,
        title: "Shape Your Future",
        subtitle: "Achieve Your Dreams",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80",
        gradient: "from-orange-600 via-red-600 to-pink-700",
    },
];

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setIsAutoPlaying(false);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        setIsAutoPlaying(false);
    };

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
    };

    return (
        <div className="relative w-full h-[70vh] overflow-hidden mx-4 md:mx-8 lg:mx-16 mt-4 rounded-2xl">
            {/* Slides */}
            <div className="relative w-full h-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />

                        {/* Content */}
                        <div className="relative h-full flex items-center justify-center text-center px-4">
                            <div className="max-w-4xl">
                                <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                                    {slide.title}
                                </h1>
                                <p className="text-xl md:text-3xl text-white/90">
                                    {slide.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
                aria-label="Previous slide"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 z-20"
                aria-label="Next slide"
            >
                <ChevronRight size={32} />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/75"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default HeroCarousel;