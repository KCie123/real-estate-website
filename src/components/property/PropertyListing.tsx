import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import PropertyCard, { PropertyCardProps } from '@/components/property/PropertyCard';

// Define the type for property type
type ExplorerPropertyType = 'buy' | 'rent' | 'all';

interface PropertyListingProps {
  propertyType: ExplorerPropertyType;
  properties: PropertyCardProps[];
  showServiceBadge?: boolean;
}

const PropertyListing = ({ propertyType, properties, showServiceBadge = false }: PropertyListingProps) => {
  const { t } = useTranslation('common');

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {properties.map((property) => (
          <PropertyCard 
            key={property.id} 
            {...property} 
            showServiceBadge={showServiceBadge}
          />
          ))}
        </div>
        
      <div className="text-center">
        <Link href={propertyType === 'all' ? '/buy-or-sell' : propertyType === 'buy' ? '/buy-or-sell' : '/rentals'} className="btn btn-primary">
          {t('listingViewAll')}
        </Link>
      </div>
    </div>
  );
};

export default PropertyListing;
