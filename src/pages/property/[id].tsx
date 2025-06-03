import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from '@/components/layout/Layout';
import { getPropertyById } from '@/utils/dataService';
import { PropertyCardProps } from '@/components/property/PropertyCard';
import { FaBed, FaBath, FaRulerCombined, FaHome, FaCalendarAlt, FaParking, FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPaths } from 'next';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

// Dynamically import the Map component
const MapDisplay = dynamic(() => import('@/components/map/MapDisplay'), {
  ssr: false, // Disable server-side rendering for this component
  // loading: () => <div style={{ height: '300px' }} className="bg-gray-200 animate-pulse rounded-lg"></div> // Remove loading placeholder
});

// Agent information (you can move this to a JSON file later)
const agent = {
  name: "Anna Kawa",
  phone: "(123) 456-7890",
  email: "AnnaKawa@temp.com",
  photo: "/images/agent.jpg",
  title: "agentTitle",
  experience: "agentExperience"
};

const PropertyDetails = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState<PropertyCardProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const propertyData = getPropertyById(id as string);
      if (propertyData) {
        setProperty(propertyData);
        setCurrentImageIndex(0);
      }
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">{t('detailNotFoundTitle')}</h1>
            <p className="mb-8">{t('detailNotFoundDesc')}</p>
            <Link href="/" className="btn btn-primary">
              {t('detailBackHome')}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Log property data before returning JSX
  console.log('Property Data before render:', property);
  console.log('Coords:', property?.latitude, property?.longitude);

  // ------ Define language keys AFTER property is guaranteed to exist ------
  const currentLocale = i18n.language;
  const descriptionLang = property.description?.[currentLocale] ? currentLocale : 'en';
  const featuresLang = property.features?.[currentLocale] ? currentLocale : 'en';

  // Image handling remains the same
  const images = property?.imageUrls && property.imageUrls.length > 0 
                 ? property.imageUrls 
                 : [property?.imageUrl || '/images/property-placeholder.jpg'];

  // Navigation functions remain the same
  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <Link href="/" className="text-primary hover:text-accent transition-colors">
            &larr; {t('detailBackToListings')}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Details - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              {/* Property Image */}
              <div className="relative h-80 bg-gray-200">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
                ></div>
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-2 rounded-md text-white font-medium ${property.forSale ? 'bg-green-600' : 'bg-blue-600'}`}>
                    {property.forSale ? t('detailForSale') : t('detailForRent')}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-4 py-2 rounded-md bg-primary text-white font-medium">
                    ${property.price.toLocaleString()}{!property.forSale && t('detailPricePerMonth')}
                  </span>
                </div>
              </div>

              {/* Property Info */}
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <p className="text-gray-600 mb-6">{property.address}</p>

                {/* Property Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="flex items-center">
                    <FaBed className="text-accent mr-2" />
                    <span>{property.bedrooms} {t('detailBedrooms')}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBath className="text-accent mr-2" />
                    <span>{property.bathrooms} {t('detailBathrooms')}</span>
                  </div>
                  <div className="flex items-center">
                    <FaRulerCombined className="text-accent mr-2" />
                    <span>{property.sqft.toLocaleString()} {t('detailSqft')}</span>
                  </div>
                  {property.levels && (
                    <div className="flex items-center">
                      <FaHome className="text-accent mr-2" />
                      <span>{property.levels} {property.levels > 1 ? t('detailLevels') : t('detailLevel')}</span>
                    </div>
                  )}
                </div>

                {/* Additional Details */}
                {property.yearBuilt && (
                  <div className="flex items-center mb-2">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <span>{t('detailBuiltIn', { year: property.yearBuilt })}</span>
                  </div>
                )}
                {property.parkingSpaces && (
                  <div className="flex items-center mb-6">
                    <FaParking className="text-gray-500 mr-2" />
                    <span>{property.parkingSpaces} {t('detailParking')}</span>
                  </div>
                )}

                {/* Description - Use defined descriptionLang */}
                <h2 className="text-xl font-bold mb-4">{t('detailDescription')}</h2>
                <p className="text-gray-700 mb-8">
                  {property.description?.[descriptionLang] || t('detailNoDescription')}
                </p>

                {/* Features List - Use defined featuresLang */}
                {property.features && property.features[featuresLang] && property.features[featuresLang].length > 0 && (
                  <>
                    <h2 className="text-xl font-bold mb-4">{t('detailFeatures')}</h2>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 mb-8">
                      {property.features[featuresLang].map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Agent Contact - 1/3 width on large screens */}
          <div>
            <div className="bg-white rounded-lg shadow-card p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">{t('detailContactAgent')}</h2>
              
              <div className="flex items-center mb-6">
                <div className="w-32 h-32 rounded-full bg-gray-200 mr-4 overflow-hidden flex-shrink-0">
                  <img 
                    src={agent.photo || '/images/agent-placeholder.jpg'} 
                    alt={agent.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/agent-placeholder.jpg';
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-bold">{agent.name}</h3>
                  <p className="text-gray-600 text-sm">{t(agent.title)}</p>
                  <p className="text-accent text-sm">{t(agent.experience)}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('detailAgentPhone')}</label>
                  <a 
                    href={`tel:${agent.phone}`} 
                    className="block w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    {agent.phone}
                  </a>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('detailAgentEmail')}</label>
                  <a 
                    href={`mailto:${agent.email}`} 
                    className="block w-full px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    {agent.email}
                  </a>
                </div>
              </div>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('detailFormName')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input w-full"
                    placeholder={t('detailFormNamePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('detailFormEmail')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input w-full"
                    placeholder={t('detailFormEmailPlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('detailFormMessage')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="form-input w-full resize-none"
                    placeholder={t('detailFormMessagePlaceholder', { propertyTitle: property.title })}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  {t('detailFormSend')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Map Display */}
        {property.latitude && property.longitude && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">{t('detailLocation')}</h2>
            <div className="h-80 rounded-lg overflow-hidden shadow-card">
              <MapDisplay 
                latitude={property.latitude} 
                longitude={property.longitude} 
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PropertyDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
