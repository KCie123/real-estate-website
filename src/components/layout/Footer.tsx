import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const isRent = router.pathname.includes('/rentals');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--header-bg)] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Global Real Estate Consultants Co.</h3>
            <p className="text-gray-300 mb-4">{isRent ? 'ALE' : t('appName')}</p>
            <p className="text-gray-300 mb-4">{t('footerAbout')}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footerNavigation')}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/buy-or-sell" className="text-gray-300 hover:text-white transition-colors">
                  {t('footerForSale')}
                </Link>
              </li>
              <li>
                <Link href="/rentals" className="text-gray-300 hover:text-white transition-colors">
                  {t('footerForRent')}
                </Link>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  {t('footerTestimonials')}
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
                  {t('footerContact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('footerContact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="mr-3 text-[var(--brand-accent)] text-lg">
                  <FaPhone />
                </div>
                <span>{isRent ? '(773) 544.8188' : '(773) 775.5500'}</span>
              </li>
              <li className="flex items-center">
                <div className="mr-3 text-[var(--brand-accent)] text-lg">
                  <FaEnvelope />
                </div>
                <a href={`mailto:${isRent ? 'yourALEconsultant@gmail.com' : 'annakawa69@gmail.com'}`} className="hover:underline">
                  {isRent ? 'yourALEconsultant@gmail.com' : 'annakawa69@gmail.com'}
                </a>
              </li>
              <li className="flex items-start">
                <div className="mr-3 text-[var(--brand-accent)] text-lg mt-1">
                  <FaMapMarkerAlt />
                </div>
                <span>
                  {isRent ? '6946 W. Higgins Avenue' : '6946 W. Higgins Avenue'}<br />
                  {isRent ? 'Chicago, IL 60656' : 'Chicago, IL 60656'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>2025 Global Real Estate Consultants Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
