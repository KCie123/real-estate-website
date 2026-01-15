import { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/ui/Preloader';
import { useBrand, BrandType } from '@/context/BrandContext';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  brand?: BrandType;
  forceBrand?: boolean;
}

const Layout = ({ 
  children, 
  title = 'Global Real Estate Consultants Co. | Real Estate Agency', 
  description = 'Global Real Estate Consultants Co. is a full-service real estate brokerage specializing in residential properties for sale and rent.',
  brand,
  forceBrand = false
}: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const { brand: contextBrand, setBrand } = useBrand();
  
  // If brand is passed as prop and forceBrand is true, update the context
  useEffect(() => {
    if (brand && forceBrand) {
      setBrand(brand);
    }
  }, [brand, forceBrand, setBrand]);

  // Determine which brand to use for data-attribute
  const activeBrand = brand || contextBrand;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Preloader isLoading={isLoading} />
      <div 
        data-brand={activeBrand}
        className={`flex flex-col min-h-screen transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <Header />
        <main id="main-content" className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
