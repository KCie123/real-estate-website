import { useTranslation } from 'next-i18next';

type PropertyType = 'buy' | 'rent' | 'all';

interface PropertyTypeSwitcherProps {
  activeType: PropertyType;
  onTypeChange: (type: PropertyType) => void;
}

const PropertyTypeSwitcher = ({ activeType, onTypeChange }: PropertyTypeSwitcherProps) => {
  const { t } = useTranslation('common');

  return (
    <section id="properties" className="py-12 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{t('findYourProperty')}</h2>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`px-8 py-3 text-sm font-medium rounded-l-lg ${
                activeType === 'buy'
                  ? 'bg-accent text-primary'
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
              onClick={() => onTypeChange('buy')}
              aria-pressed={activeType === 'buy'}
            >
              {t('switcherBuy')}
            </button>
            <button
              type="button"
              className={`px-8 py-3 text-sm font-medium border-t border-b ${
                activeType === 'all'
                  ? 'bg-accent text-primary'
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
              onClick={() => onTypeChange('all')}
              aria-pressed={activeType === 'all'}
            >
              {t('switcherAll')}
            </button>
            <button
              type="button"
              className={`px-8 py-3 text-sm font-medium rounded-r-lg ${
                activeType === 'rent'
                  ? 'bg-accent text-primary'
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
              onClick={() => onTypeChange('rent')}
              aria-pressed={activeType === 'rent'}
            >
              {t('switcherRent')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyTypeSwitcher;
