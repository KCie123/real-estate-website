import { useEffect } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import PropertyExplorer from '@/components/property/PropertyExplorer';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { PropertyCardProps } from '@/components/property/PropertyCard';
import { getAllProperties } from '@/utils/dataService';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useBrand } from '@/context/BrandContext';

const RentalsPage: NextPage = () => {
  const { t } = useTranslation('common');
  const { setBrand } = useBrand();
  const allProperties = getAllProperties().filter(p => p.service === 'ALE');
  
  // Set brand to 'rent' on component mount
  useEffect(() => {
    setBrand('rent');
  }, [setBrand]);

  return (
    <Layout 
      brand="rent"
      title="ALE Rentals | Temporary Accommodations"
      description="Find temporary accommodations while your home is being repaired. ALE Rentals offers quality housing solutions for insurance claims."
    >
      {/* Hero Section */}
      <section className="bg-primary py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('rentalsHeroTitle')}
            </h1>
            <h2 className="text-2xl md:text-3xl font-medium text-[var(--accent-red)] mb-8">
              {t('rentalsHeroSubtitle')}
            </h2>
            <a href="#rentals-explorer" className="btn btn-primary">
              {t('rentalsHeroCta')}
            </a>
          </div>
        </div>
      </section>
      
      {/* QR Code Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-2">{t('qrCodeAleTitle')}</h3>
            <p className="mb-4">{t('qrCodeAleSubtitle')}</p>
            <a href="/assets/vcards/ale.vcf" download>
              <img 
                src="/assets/qr-ale.png"
                alt={t('qrCodeAleAlt')}
                className="w-40 h-40 mx-auto"
              />
            </a>
          </div>
        </div>
      </section>
      
      {/* Services List */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">{t('rentalsServiceTitle')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-lg mb-6">
              <li>{t('rentalsService1')}</li>
              <li>{t('rentalsService2')}</li>
              <li>{t('rentalsService3')}</li>
              <li>{t('rentalsService4')}</li>
              <li>{t('rentalsService5')}</li>
            </ul>
            
            <p className="text-sm text-gray-600 mb-8">
              {t('rentalsOptionsText')}
            </p>
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-[var(--accent-red)]">
                {t('rentalsCompanyName')}
              </h3>
              <p className="text-lg">
                {t('rentalsCompanyTagline')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Rentals Explorer */}
      <section id="rentals-explorer" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">{t('rentalsExplorerTitle')}</h2>
          <PropertyExplorer 
            allProperties={allProperties}
            propertyType="rent"
            showServiceBadge={true}
          />
        </div>
      </section>
      
      {/* Special Call-out */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-card">
            <h3 className="text-2xl font-bold mb-4">{t('rentalsCalloutTitle')}</h3>
            <p className="mb-6">
              {t('rentalsCalloutText')} <span className="font-bold text-[var(--accent-red)]">ALE Rentals</span> {t('rentalsCalloutHelp')}
            </p>
            <a href="#contact" className="btn btn-primary">
              {t('rentalsCalloutCta')}
            </a>
          </div>
        </div>
      </section>
      
      {/* Customized Contact Form with ALE contact info */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('contactTitle')}</h2>
              <p className="text-xl text-gray-600">{t('contactSubtitle')}</p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              {/* Contact Information */}
              <div className="md:w-1/3">
                <div className="bg-white p-6 rounded-lg shadow-card h-full">
                  <h3 className="text-xl font-bold mb-6 text-[var(--accent-red)]">{t('rentalsContactTitle')}</h3>
                  <p className="font-bold text-lg mb-4">Anna Kawa</p>
                  <div className="space-y-4">
                    <p>
                      <span className="font-semibold">{t('detailAgentPhone')}:</span> 
                      <a href="tel:+17735448188" className="text-[var(--accent-red)] ml-2">+1.773.544.8188</a>
                    </p>
                    <p>
                      <span className="font-semibold">{t('rentalsTollFreeFax')}:</span> 
                      <a href="tel:18006252615" className="text-[var(--accent-red)] ml-2">1.800.625.2615</a>
                    </p>
                    <p>
                      <span className="font-semibold">{t('detailAgentEmail')}:</span> 
                      <a href="mailto:yourALEconsultant@gmail.com" className="ml-2">yourALEconsultant@gmail.com</a>
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h4 className="font-bold mb-2">{t('rentalsCompanyName')}</h4>
                    <p className="text-sm text-gray-600">
                      {t('rentalsCompanyTagline')}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div className="md:w-2/3">
                <div className="bg-white p-6 rounded-lg shadow-card">
                  <h3 className="text-xl font-bold mb-6">{t('contactTitle')}</h3>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contactFullName')}
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          className="form-input w-full"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contactEmail')}
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="form-input w-full"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contactPhone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          className="form-input w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="intent" className="block text-sm font-medium text-gray-700 mb-1">
                          {t('contactLookingTo')}
                        </label>
                        <select id="intent" className="form-input w-full">
                          <option value="rent">{t('contactIntentRent')}</option>
                          <option value="other">{t('contactIntentOther')}</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        {t('contactMessage')}
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        className="form-input w-full resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="btn btn-primary w-full"
                      >
                        {t('contactSend')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
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

export default RentalsPage; 