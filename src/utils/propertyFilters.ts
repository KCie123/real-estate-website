import { PropertyCardProps } from '@/components/property/PropertyCard';

export type FilterOptions = {
  priceMin?: number;
  priceMax?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  searchQuery?: string;
};

export const filterProperties = (
  properties: PropertyCardProps[],
  filters: FilterOptions,
  forSale?: boolean
): PropertyCardProps[] => {
  return properties.filter((property) => {
    // Filter by property type (sale/rent) only if forSale is defined
    if (forSale !== undefined && property.forSale !== forSale) {
      return false;
    }

    // Filter by price range
    if (filters.priceMin && property.price < filters.priceMin) {
      return false;
    }
    if (filters.priceMax && property.price > filters.priceMax) {
      return false;
    }

    // Filter by bedrooms
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) {
      return false;
    }

    // Filter by bathrooms
    if (filters.bathrooms && property.bathrooms < filters.bathrooms) {
      return false;
    }

    // Filter by search query (address or title)
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = property.title.toLowerCase().includes(query);
      const matchesAddress = property.address.toLowerCase().includes(query);
      if (!matchesTitle && !matchesAddress) {
        return false;
      }
    }

    return true;
  });
};

/* Removed sortProperties function
export const sortProperties = (
  properties: PropertyCardProps[],
  sortBy: string
): PropertyCardProps[] => {
  const sortedProperties = [...properties];

  switch (sortBy) {
    case 'price-asc':
      return sortedProperties.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return sortedProperties.sort((a, b) => b.price - a.price);
    case 'newest':
      // In a real app, we would sort by date added
      return sortedProperties;
    case 'bedrooms':
      return sortedProperties.sort((a, b) => b.bedrooms - a.bedrooms);
    case 'bathrooms':
      return sortedProperties.sort((a, b) => b.bathrooms - a.bathrooms);
    case 'sqft':
      return sortedProperties.sort((a, b) => b.sqft - a.sqft);
    default:
      return sortedProperties;
  }
};
*/
