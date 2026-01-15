import { useEffect } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import PropertyExplorer from '@/components/property/PropertyExplorer';
import TestimonialCarousel from '@/components/testimonial/TestimonialCarousel';
import BuySellContactForm from '@/components/ui/BuySellContactForm';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { PropertyCardProps } from '@/components/property/PropertyCard';
import { Testimonial } from '@/components/testimonial/TestimonialCarousel';
import { getPropertiesByType, getTestimonials } from '@/utils/dataService';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useBrand } from '@/context/BrandContext';

const BuySellPage: NextPage = () => {
  const { t } = useTranslation('common');
  const { setBrand } = useBrand();
  // Only get properties for sale (not rentals)
  const properties = getPropertiesByType(true).filter(p => p.service !== 'ALE');
  const testimonials = getTestimonials();
  
  // Set brand to 'buy' on component mount
  useEffect(() => {
    setBrand('buy');
  }, [setBrand]);

  return (
    <Layout 
      brand="buy"
      title="Global Real Estate Consultants | Buy Your Home"
      description="Find your dream home with Global Real Estate Consultants. Professional service and expert guidance for all your real estate needs."
    >
      {/* Custom Hero */}
      <section className="bg-primary py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="md:w-2/3 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('heroTitle')}
              </h1>
              <p className="text-xl text-white mb-6">
                {t('heroSubtitle')}
              </p>
              <a href="#properties" className="btn btn-primary">
                {t('heroButton')}
              </a>
            </div>
            <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold mb-2">{t('qrCodeBuyTitle')}</h3>
              <p className="mb-4">{t('qrCodeBuySubtitle')}</p>
              <a href="/assets/vcards/buy.vcf" download>
                <img 
                  src="/assets/qr-buy.png"
                  alt={t('qrCodeBuyAlt')}
                  className="w-40 h-40 mx-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Properties Explorer */}
      <section id="properties" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('buySellExplorerTitle')}</h2>
          <PropertyExplorer 
            allProperties={properties}
            propertyType="buy"
          />
        </div>
      </section>
      
      {/* Testimonials */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>
      
      {/* Contact Form */}
      <section id="contact" className="py-16">
        <div className="container mx-auto px-4">
          <BuySellContactForm />
        </div>
      </section>
      
      <ScrollToTopButton />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default BuySellPage; 