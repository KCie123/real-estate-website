import { useState, useEffect } from 'react';
import { FaSortAmountDown } from 'react-icons/fa';

type SortOption = {
  value: string;
  label: string;
};

// Define the extended type for property type
type SortPropertyType = 'buy' | 'rent' | 'all';

interface PropertySortProps {
  onSortChange: (sortBy: string) => void;
  propertyType: SortPropertyType; // Updated type
}

const PropertySort = ({ onSortChange, propertyType }: PropertySortProps) => {
  const [sortBy, setSortBy] = useState('newest');
  
  // Update sort options based on property type
  const sortOptions: SortOption[] = [
    { value: 'newest', label: 'Newest' },
    // Use generic 'Price' label when showing all properties
    { value: 'price-asc', label: propertyType === 'rent' ? 'Rent (Low to High)' : 'Price (Low to High)' }, 
    { value: 'price-desc', label: propertyType === 'rent' ? 'Rent (High to Low)' : 'Price (High to Low)' },
    { value: 'bedrooms', label: 'Most Bedrooms' },
    { value: 'bathrooms', label: 'Most Bathrooms' },
    { value: 'sqft', label: 'Largest Size' }
  ];

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);
    onSortChange(value);
  };

  // Reset to default sort when property type changes
  useEffect(() => {
    setSortBy('newest');
    onSortChange('newest');
  }, [propertyType, onSortChange]);

  return (
    <div className="flex items-center justify-end mb-6">
      <div className="flex items-center">
        <FaSortAmountDown className="text-gray-500 mr-2" />
        <label htmlFor="sort-select" className="text-sm font-medium text-gray-700 mr-2">
          Sort by:
        </label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-accent text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropertySort;
