import { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  location?: string;
  imageUrl?: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const TestimonialCarousel = ({ testimonials }: TestimonialCarouselProps) => {
  const { t } = useTranslation('common');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToPrevious = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToNext = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  // Auto-advance slides every 7 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (!isAnimating) {
        goToNext();
      }
    }, 7000);
    
    return () => clearInterval(slideInterval);
  }, [currentIndex, isAnimating]);

  if (!testimonials.length) return null;

  return (
    <section id="testimonials" className="section-padding bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">{t('testimonialTitle')}</h2>
        <div className="w-20 h-1 bg-accent mx-auto mb-12"></div>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Slide */}
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-card">
            <div className="flex justify-center mb-6">
              <div className="bg-accent/10 p-4 rounded-full">
                <FaQuoteLeft className="text-accent text-4xl" />
              </div>
            </div>
            
            <blockquote className="text-center mb-6">
              <p className="text-lg md:text-xl italic mb-6 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </p>
              <footer className="text-gray-600">
                <cite className="not-italic font-medium text-lg">
                  {testimonials[currentIndex].name}
                </cite>
                {testimonials[currentIndex].role && (
                  <span className="block text-sm mt-1 text-gray-500">{testimonials[currentIndex].role}</span>
                )}
              </footer>
            </blockquote>
          </div>
          
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full bg-white text-primary p-3 rounded-full shadow-md hover:bg-accent hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={t('testimonialPrevious')}
            disabled={isAnimating}
          >
            <FaChevronLeft size={20} />
          </button>
          
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 md:translate-x-full bg-white text-primary p-3 rounded-full shadow-md hover:bg-accent hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent"
            aria-label={t('testimonialNext')}
            disabled={isAnimating}
          >
            <FaChevronRight size={20} />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => !isAnimating && setCurrentIndex(index)}
                className={`w-3 h-3 mx-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-accent w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={t('testimonialGoTo', { index: index + 1 })}
                aria-current={index === currentIndex ? 'true' : 'false'}
                disabled={isAnimating}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
