import { useState, useEffect } from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/ui/HeroSection';
import PropertyTypeSwitcher from '@/components/property/PropertyTypeSwitcher';
import PropertyExplorer from '@/components/property/PropertyExplorer';
import TestimonialCarousel from '@/components/testimonial/TestimonialCarousel';
import ContactForm from '@/components/ui/ContactForm';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { PropertyCardProps } from '@/components/property/PropertyCard';
import { Testimonial } from '@/components/testimonial/TestimonialCarousel';
import { useScrollPosition } from '@/utils/hooks';
import { getAllProperties, getTestimonials } from '@/utils/dataService';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Define the type for property state
type ActivePropertyType = 'buy' | 'rent' | 'all';

const Home: NextPage = () => {
  const router = useRouter();
  const [activePropertyType, setActivePropertyType] = useState<ActivePropertyType>('buy');
  const [allProperties, setAllProperties] = useState<PropertyCardProps[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const { scrollToSection } = useScrollPosition();

  // Load static data on component mount
  useEffect(() => {
    setAllProperties(getAllProperties());
    setTestimonials(getTestimonials());
  }, []);

  // Set active property type based on URL query parameter
  useEffect(() => {
    if (router.isReady) { 
      const typeFromQuery = router.query.type as ActivePropertyType;
      
      if (typeFromQuery === 'buy' || typeFromQuery === 'rent' || typeFromQuery === 'all') {
        setActivePropertyType(typeFromQuery);
        
        // *** Removed explicit scroll call here ***
        // Let the browser handle scrolling to the ID based on the rendered component

      } else {
        setActivePropertyType('buy'); 
      }
    }
  }, [router.isReady, router.query.type]); // Removed scrollToSection from dependencies

  // Handle property type change from the switcher
  const handlePropertyTypeChange = (type: ActivePropertyType) => {
    router.push(`/?type=${type}`, undefined, { shallow: true });
    
    // *** Removed explicit scroll call here ***
  };

  return (
    <Layout>
      <HeroSection />
      
      <PropertyTypeSwitcher 
        activeType={activePropertyType} 
        onTypeChange={handlePropertyTypeChange} 
      />
      
      <div id={activePropertyType === 'all' ? 'properties' : (activePropertyType === 'buy' ? 'for-sale' : 'for-rent')}>
        <PropertyExplorer 
          allProperties={allProperties}
          propertyType={activePropertyType}
        />
      </div>
      
      <TestimonialCarousel testimonials={testimonials} />
      
      <ContactForm />
      
      <ScrollToTopButton />
    </Layout>
  );
};

export default Home;

// Add getStaticProps to load translations
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common', // Load translations from common.json
      ])),
      // You can pass other props here if needed
    },
  };
};
