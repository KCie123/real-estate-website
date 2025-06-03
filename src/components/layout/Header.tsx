import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

const Header = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [propertiesDropdownOpen, setPropertiesDropdownOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
          ? 'bg-primary bg-opacity-95 shadow-md py-2' 
          : 'bg-primary bg-opacity-80 py-4'
      }`}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-heading font-bold text-white hover:text-accent transition-colors">
              {t('appName')}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <Link href="/" className="nav-link">
                  {t('navHome')}
                </Link>
              </li>
              <div className="relative group">
                <button 
                  className="nav-link flex items-center"
                  onClick={() => setPropertiesDropdownOpen(!propertiesDropdownOpen)}
                  onBlur={() => setTimeout(() => setPropertiesDropdownOpen(false), 100)}
                >
                  {t('navProperties')}
                  <svg className={`ml-1 h-4 w-4 transition-transform ${propertiesDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div className={`absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
                  propertiesDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  <div className="py-1">
                    <Link href="/?type=buy" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t('navForSale')}
                    </Link>
                    <Link href="/?type=rent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t('navForRent')}
                    </Link>
                    <Link href="/?type=all" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {t('navAllProperties')}
                    </Link>
                  </div>
                </div>
              </div>
              <li>
                <Link href="/#testimonials" className="nav-link">
                  {t('navTestimonials')}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="nav-link">
                  {t('navContact')}
                </Link>
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
                  {/* Display current language name */}
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
                      className={`block px-4 py-2 text-sm ${router.locale === 'en' ? 'font-bold text-accent' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      English
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="es"
                      className={`block px-4 py-2 text-sm ${router.locale === 'es' ? 'font-bold text-accent' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Español
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="uk"
                      className={`block px-4 py-2 text-sm ${router.locale === 'uk' ? 'font-bold text-accent' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                      Українська
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="pl"
                      className={`block px-4 py-2 text-sm ${router.locale === 'pl' ? 'font-bold text-accent' : 'text-gray-700 hover:bg-gray-100'}`}
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
                <Link href="/" className="nav-link block" onClick={toggleMenu}>
                  {t('navHome')}
                </Link>
              </li>
              <li>
                <Link href="/?type=buy" className="nav-link block">
                  {t('navForSale')}
                </Link>
              </li>
              <li>
                <Link href="/?type=rent" className="nav-link block">
                  {t('navForRent')}
                </Link>
              </li>
              <li>
                <Link href="/?type=all" className="nav-link block">
                  {t('navAllProperties')}
                </Link>
              </li>
              <li>
                <Link href="/#testimonials" className="nav-link block" onClick={toggleMenu}>
                  {t('navTestimonials')}
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="nav-link block" onClick={toggleMenu}>
                  {t('navContact')}
                </Link>
              </li>
              {/* Language Switcher - Mobile */}
              <li className="pt-4 border-t border-gray-700/50">
                <span className="nav-link block text-sm text-gray-400 mb-2">Language / Idioma:</span>
                 <div className="flex space-x-4 pl-2">
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="en"
                      className={`text-sm ${router.locale === 'en' ? 'font-bold text-accent' : 'text-white hover:text-accent'}`}
                      onClick={toggleMenu} 
                    >
                      English
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="es"
                      className={`text-sm ${router.locale === 'es' ? 'font-bold text-accent' : 'text-white hover:text-accent'}`}
                      onClick={toggleMenu}
                    >
                      Español
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="uk"
                      className={`text-sm ${router.locale === 'uk' ? 'font-bold text-accent' : 'text-white hover:text-accent'}`}
                      onClick={toggleMenu}
                    >
                      Українська
                    </Link>
                    <Link 
                      href={{ pathname, query }}
                      as={asPath}
                      locale="pl"
                      className={`text-sm ${router.locale === 'pl' ? 'font-bold text-accent' : 'text-white hover:text-accent'}`}
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
