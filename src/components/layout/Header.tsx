import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useBrand } from '@/context/BrandContext';

const Header = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const { brand, setBrand } = useBrand();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const isRent = pathname.includes('/rentals');
  const isBuy = pathname.includes('/buy-or-sell');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle smooth scrolling
  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to buy-or-sell first
    if (pathname !== '/buy-or-sell') {
      router.push('/buy-or-sell', undefined, { shallow: true }).then(() => {
        // Increase timeout to ensure the page has fully loaded
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 500); // Increased from 100ms to 500ms
      });
    } else {
      // If we're already on the buy-or-sell page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  // Handle header style change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--header-bg)] bg-opacity-95 shadow-md py-2' 
          : 'bg-[var(--header-bg)] bg-opacity-80 py-4'
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-3">
              {isBuy && (
                <div className="text-xl font-bold text-white">
                  ARHome Realty
                </div>
              )}
            <Link href="/" className="text-2xl font-heading font-bold text-white hover:text-accent transition-colors">
                Global Real Estate Consultants Co.
            </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link 
                  href="/rentals" 
                  className={`nav-link ${isRent ? 'active-link' : ''}`}
                  onClick={() => setBrand('rent')}
                >
                  {t('navRentals')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/buy-or-sell" 
                  className={`nav-link ${isBuy ? 'active-link' : ''}`}
                  onClick={() => setBrand('buy')}
                >
                  {t('navForSale')}
                </Link>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="nav-link"
                  onClick={(e) => handleSectionClick(e, 'testimonials')}
                >
                  {t('navTestimonials')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="nav-link"
                  onClick={(e) => handleSectionClick(e, 'contact')}
                >
                  {t('navContact')}
                </a>
              </li>
            </ul>

            {/* Language Switcher - Desktop */}
            <div className="hidden md:flex items-center ml-6">
              <div className="relative group">
                <button 
                  className="nav-link flex items-center"
                  onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                  onBlur={() => setTimeout(() => setLanguageDropdownOpen(false), 150)}
                  aria-haspopup="true"
                  aria-expanded={languageDropdownOpen}
                >
                  <FaGlobe className="mr-2" />
                  {router.locale === 'en' ? 'English' : 
                   router.locale === 'es' ? 'Español' : 
                   router.locale === 'uk' ? 'Українська' : 
                   router.locale === 'pl' ? 'Polski' : 'Language'}
                  <svg className={`ml-1 h-4 w-4 transition-transform ${languageDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  languageDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  <div className="py-1">
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="en"
                      className={`block px-4 py-2 text-sm ${router.locale === 'en' ? 'font-bold text-[var(--brand-accent)]' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      English
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="es"
                      className={`block px-4 py-2 text-sm ${router.locale === 'es' ? 'font-bold text-[var(--brand-accent)]' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Español
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="uk"
                      className={`block px-4 py-2 text-sm ${router.locale === 'uk' ? 'font-bold text-[var(--brand-accent)]' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Українська
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="pl"
                      className={`block px-4 py-2 text-sm ${router.locale === 'pl' ? 'font-bold text-[var(--brand-accent)]' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Polski
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 p-1 rounded"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100 mt-4 pb-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav>
            <ul className="flex flex-col space-y-4">
              <li>
                <Link 
                  href="/rentals" 
                  className={`nav-link block ${isRent ? 'active-link' : ''}`}
                  onClick={() => {
                    setBrand('rent');
                    toggleMenu();
                  }}
                >
                  {t('navRentals')}
                </Link>
              </li>
              <li>
                <Link 
                  href="/buy-or-sell" 
                  className={`nav-link block ${isBuy ? 'active-link' : ''}`}
                  onClick={() => {
                    setBrand('buy');
                    toggleMenu();
                  }}
                >
                  {t('navForSale')}
                </Link>
              </li>
              <li>
                <a 
                  href="#testimonials" 
                  className="nav-link block"
                  onClick={(e) => handleSectionClick(e, 'testimonials')}
                >
                  {t('navTestimonials')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="nav-link block"
                  onClick={(e) => handleSectionClick(e, 'contact')}
                >
                  {t('navContact')}
                </a>
              </li>
              {/* Language Switcher - Mobile */}
              <li className="pt-4 border-t border-gray-700/50">
                <span className="nav-link block text-sm text-gray-400 mb-2">Language / Idioma:</span>
                 <div className="flex space-x-4 pl-2">
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="en"
                      className={`text-sm ${router.locale === 'en' ? 'font-bold text-[var(--brand-accent)]' : 'text-white hover:text-accent'}`}
                      onClick={toggleMenu} 
                    >
                      English
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="es"
                      className={`text-sm ${router.locale === 'es' ? 'font-bold text-[var(--brand-accent)]' : 'text-white hover:text-accent'}`}
                      onClick={toggleMenu}
                    >
                      Español
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="uk"
                      className={`text-sm ${router.locale === 'uk' ? 'font-bold text-[var(--brand-accent)]' : 'text-white hover:text-accent'}`}
                      onClick={toggleMenu}
                    >
                      Українська
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="pl"
                      className={`text-sm ${router.locale === 'pl' ? 'font-bold text-[var(--brand-accent)]' : 'text-white hover:text-accent'}`}
                      onClick={toggleMenu}
                    >
                      Polski
                </Link>
                  </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Accessibility hint */}
      <div className="sr-only">Use tab to navigate through the menu items.</div>
    </header>
  );
};

export default Header;
