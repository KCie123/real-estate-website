import { useTranslation } from 'next-i18next';

interface PreloaderProps {
  isLoading: boolean;
}

const Preloader = ({ isLoading }: PreloaderProps) => {
  const { t } = useTranslation('common');

  return (
    <div 
      className={`preloader fixed inset-0 z-[100] flex items-center justify-center bg-primary transition-opacity duration-500 ease-in-out ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      aria-hidden={!isLoading}
      role="status"
      aria-live="polite"
    >
      <div className="text-center">
        <div className="text-4xl font-heading font-bold text-white mb-4 animate-pulse">
          {t('appName')}
        </div>
        <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};

export default Preloader; 