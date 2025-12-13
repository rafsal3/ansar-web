import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
    images: string[];
}

const ImageSlider = ({ images }: ImageSliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    if (!images || images.length === 0) {
        return (
            <div className="h-96 bg-gray-200 w-full relative flex items-center justify-center rounded-xl overflow-hidden">
                <div className="text-gray-400">
                    <span className="text-sm">No Images Available</span>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[400px] w-full relative group rounded-xl overflow-hidden bg-gray-100">
            <div className="w-full h-full relative">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-opacity duration-500"
                />
            </div>

            {/* Left Arrow */}
            {images.length > 1 && (
                <button
                    onClick={prevSlide}
                    className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] left-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-colors backdrop-blur-sm"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {/* Right Arrow */}
            {images.length > 1 && (
                <button
                    onClick={nextSlide}
                    className="hidden group-hover:block absolute top-[50%] -translate-y-[50%] right-5 text-2xl rounded-full p-2 bg-black/30 text-white cursor-pointer hover:bg-black/50 transition-colors backdrop-blur-sm"
                >
                    <ChevronRight size={24} />
                </button>
            )}

            {/* Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, slideIndex) => (
                        <button
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`transition-all duration-300 rounded-full shadow-sm ${currentIndex === slideIndex
                                    ? "bg-white w-3 h-3"
                                    : "bg-white/50 w-2 h-2 hover:bg-white/75"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageSlider;
