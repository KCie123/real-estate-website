import { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';
import { FilterOptions } from '@/utils/propertyFilters';
import { useTranslation } from 'next-i18next';

// Define the extended type for property type
type FilterPropertyType = 'buy' | 'rent' | 'all';

interface PropertyFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  propertyType: FilterPropertyType; // Updated type
}

const PropertyFilter = ({ onFilterChange, propertyType }: PropertyFilterProps) => {
  const { t } = useTranslation('common');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceMin, setPriceMin] = useState<string>('');
  const [priceMax, setPriceMax] = useState<string>('');
  const [bedrooms, setBedrooms] = useState<string>('');
  const [bathrooms, setBathrooms] = useState<string>('');

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const applyFilters = useCallback(() => {
    const filters: FilterOptions = {
      searchQuery: searchQuery || undefined,
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined
    };
    
    onFilterChange(filters);
  }, [searchQuery, priceMin, priceMax, bedrooms, bathrooms, onFilterChange]);
  

  const resetFilters = () => {
    setSearchQuery('');
    setPriceMin('');
    setPriceMax('');
    setBedrooms('');
    setBathrooms('');
    
    onFilterChange({});
  };

  // Apply filters when property type changes
  useEffect(() => {
    // Only apply filters when property type changes, not on every render
    const filters: FilterOptions = {
      searchQuery: searchQuery || undefined,
      priceMin: priceMin ? parseInt(priceMin) : undefined,
      priceMax: priceMax ? parseInt(priceMax) : undefined,
      bedrooms: bedrooms ? parseInt(bedrooms) : undefined,
      bathrooms: bathrooms ? parseInt(bathrooms) : undefined
    };
    
    onFilterChange(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propertyType]);

  return (
    <div className="mb-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative mb-4">
        <input
          type="text"
          placeholder={t('filterSearchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <button
          type="submit"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-accent hover:text-primary-dark"
          aria-label="Search properties"
        >
          {t('filterSearchButton')}
        </button>
      </form>

      {/* Filter Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleFilter}
          className="flex items-center text-primary font-medium hover:text-accent transition-colors"
          aria-expanded={isFilterOpen}
          aria-controls="filter-panel"
        >
          <FaFilter className="mr-2" />
          {isFilterOpen ? t('filterHide') : t('filterShow')}
        </button>
        
        {(searchQuery || priceMin || priceMax || bedrooms || bathrooms) && (
          <button
            onClick={resetFilters}
            className="text-sm text-gray-600 hover:text-accent transition-colors flex items-center"
          >
            <FaTimes className="mr-1" />
            {t('filterReset')}
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <div
        id="filter-panel"
        className={`bg-gray-50 rounded-lg p-6 transition-all duration-300 overflow-hidden ${
          isFilterOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0 p-0'
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Price Range */}
          <div>
            <label htmlFor="price-min" className="block text-sm font-medium text-gray-700 mb-1">
              {t('filterMinPrice')}
            </label>
            <input
              type="number"
              id="price-min"
              placeholder={propertyType === 'rent' ? "500" : "50,000"}
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          
          <div>
            <label htmlFor="price-max" className="block text-sm font-medium text-gray-700 mb-1">
              {t('filterMaxPrice')}
            </label>
            <input
              type="number"
              id="price-max"
              placeholder={propertyType === 'rent' ? "5,000" : "1,000,000"}
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          
          {/* Bedrooms */}
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
              {t('filterBedrooms')}
            </label>
            <select
              id="bedrooms"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">{t('filterAny')}</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
          
          {/* Bathrooms */}
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
              {t('filterBathrooms')}
            </label>
            <select
              id="bathrooms"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">{t('filterAny')}</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={applyFilters}
            className="bg-accent text-primary px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            {t('filterApply')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;
