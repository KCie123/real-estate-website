import Link from 'next/link';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Logo and About */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-heading font-bold text-white hover:text-accent transition-colors inline-block mb-4">
              {t('appName')}
            </Link>
            <p className="text-gray-300 mb-6">
              {t('footerAbout')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-accent hover:text-primary p-2 rounded-full transition-colors duration-200" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" className="bg-white/10 hover:bg-accent hover:text-primary p-2 rounded-full transition-colors duration-200" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="#" className="bg-white/10 hover:bg-accent hover:text-primary p-2 rounded-full transition-colors duration-200" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" className="bg-white/10 hover:bg-accent hover:text-primary p-2 rounded-full transition-colors duration-200" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              <span className="after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-12 after:bg-accent after:-mb-3 after:rounded-full">
                {t('footerNavigation')}
              </span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="nav-link inline-block py-1 hover:translate-x-1 transition-transform">
                  {t('footerHome')}
                </Link>
              </li>
              <li>
                <Link href="/?type=buy" className="nav-link inline-block py-1 hover:translate-x-1 transition-transform">
                  {t('footerForSale')}
                </Link>
              </li>
              <li>
                <Link href="/?type=rent" className="nav-link inline-block py-1 hover:translate-x-1 transition-transform">
                  {t('footerForRent')}
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="nav-link inline-block py-1 hover:translate-x-1 transition-transform">
                  {t('footerTestimonials')}
                </Link>
              </li>
              <li>
                <Link href="#contact" className="nav-link inline-block py-1 hover:translate-x-1 transition-transform">
                  {t('footerContact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              <span className="after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-12 after:bg-accent after:-mb-3 after:rounded-full">
                {t('footerContact')}
              </span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="bg-white/10 p-2 rounded-full mr-3 text-accent">
                  <FaPhone />
                </div>
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <div className="bg-white/10 p-2 rounded-full mr-3 text-accent">
                  <FaEnvelope />
                </div>
                <a href="mailto:info@dwellrealty.com" className="nav-link hover:underline">info@dwellrealty.com</a>
              </li>
              <li className="flex items-start">
                <div className="bg-white/10 p-2 rounded-full mr-3 text-accent mt-1">
                  <FaMapMarkerAlt />
                </div>
                <span>123 Real Estate Blvd.<br />New York, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-6 relative">
              <span className="after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-12 after:bg-accent after:-mb-3 after:rounded-full">
                {t('footerNewsletter')}
              </span>
            </h3>
            <p className="text-gray-300 mb-4">
              {t('footerNewsletterSub')}
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder={t('footerNewsletterPlaceholder')}
                className="bg-white/10 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-accent w-full"
                aria-label="Email for newsletter"
              />
              <button 
                type="submit" 
                className="bg-accent text-primary px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors"
                aria-label="Subscribe to newsletter"
              >
                {t('footerNewsletterButton')}
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>{t('footerCopyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
