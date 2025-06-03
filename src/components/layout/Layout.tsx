import { ReactNode, useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Preloader from '@/components/ui/Preloader';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const Layout = ({ 
  children, 
  title = 'Dwell | Real Estate Agency', 
  description = 'Dwell is a full-service real estate brokerage specializing in residential properties for sale and rent.'
}: LayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

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
      <div className={`flex flex-col min-h-screen transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}>
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
