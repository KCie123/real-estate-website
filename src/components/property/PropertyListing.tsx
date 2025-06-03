import { PropertyCardProps } from './PropertyCard';
import PropertyCard from './PropertyCard';
import { useTranslation } from 'next-i18next';

// Define the extended type for property type
type ExplorerPropertyType = 'buy' | 'rent' | 'all';

interface PropertyListingProps {
  propertyType: ExplorerPropertyType;
  properties: PropertyCardProps[];
}

const PropertyListing = ({ propertyType, properties }: PropertyListingProps) => {
  const { t } = useTranslation('common');

  // Generate title based on propertyType using translations
  const title = propertyType === 'all' 
                  ? t('navAllProperties') 
                  : propertyType === 'buy' 
                    ? t('navForSale') 
                    : t('navForRent');

  return (
    <section className="section-padding">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4 text-center">{title}</h2>
        <div className="w-20 h-1 bg-accent mx-auto mb-12"></div>
        
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyListing;
