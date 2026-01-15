import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useScrollPosition } from '@/utils/hooks';

const ScrollToTopButton = () => {
  const { isScrolled, scrollToTop } = useScrollPosition(300);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isScrolled);
  }, [isScrolled]);

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed right-6 bottom-6 bg-accent text-primary p-3 rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 z-40 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <FaArrowUp />
    </button>
  );
};

export default ScrollToTopButton;
