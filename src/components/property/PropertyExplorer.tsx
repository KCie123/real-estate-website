import { useState, useEffect } from 'react';
import { PropertyCardProps } from '@/components/property/PropertyCard';
import PropertyFilter from '@/components/property/PropertyFilter';
import PropertyListing from '@/components/property/PropertyListing';
import { FilterOptions, filterProperties } from '@/utils/propertyFilters';
import { useTranslation } from 'next-i18next';

// Define the extended type for property type
type ExplorerPropertyType = 'buy' | 'rent' | 'all';

interface PropertyExplorerProps {
  allProperties: PropertyCardProps[];
  propertyType: ExplorerPropertyType; // Updated type
  showServiceBadge?: boolean;
}

const PropertyExplorer = ({ allProperties, propertyType, showServiceBadge = false }: PropertyExplorerProps) => {
  const { t } = useTranslation('common');
  const [filteredProperties, setFilteredProperties] = useState<PropertyCardProps[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate loading state
    setIsLoading(true);
    
    // Determine if filtering by forSale is needed
    const filterBySaleStatus = propertyType !== 'all';
    const forSale = propertyType === 'buy';
    
    // Apply filters only
    const filtered = filterProperties(allProperties, filters, filterBySaleStatus ? forSale : undefined);
    
    // Simulate network delay
    const timer = setTimeout(() => {
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
    // Make sure to include all dependencies that this effect uses
  }, [allProperties, filters, propertyType]);


  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <PropertyFilter onFilterChange={handleFilterChange} propertyType={propertyType} />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--brand-accent)]"></div>
        </div>
      ) : filteredProperties.length > 0 ? (
        <PropertyListing 
          propertyType={propertyType} 
          properties={filteredProperties} 
          showServiceBadge={showServiceBadge}
        />
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-bold mb-2">{t('explorerNoProperties')}</h3>
          <p className="text-gray-600">
            {t('explorerAdjustFilters')}
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyExplorer;
