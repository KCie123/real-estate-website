import Link from 'next/link';
import { useTranslation } from 'next-i18next';

const HeroSection = () => {
  const { t } = useTranslation('common');

  return (
    <section className="relative h-screen max-h-[800px] min-h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {/* We'll use a placeholder image until we have actual assets */}
          <div className="absolute inset-0 bg-black/50 z-10" aria-hidden="true"></div>
          <div className="w-full h-full bg-gray-700">
            {/* This will be replaced with an actual image */}
            <div className="w-full h-full flex items-center justify-center text-white">
              {/* Placeholder for image */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white fade-in">
          <h1 className="font-bold mb-6 leading-tight">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            {t('heroSubtitle')}
          </p>
          <Link 
            href="#properties" 
            className="btn btn-primary text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
          >
            {t('heroButton')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
