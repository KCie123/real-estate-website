import { PropertyCardProps } from '@/components/property/PropertyCard';
import { Testimonial } from '@/components/testimonial/TestimonialCarousel';
import propertiesForSaleData from '@/data/propertiesForSale.json';
import propertiesForRentData from '@/data/propertiesForRent.json';
import propertiesALEData from '@/data/propertiesALE.json';
import testimonialsData from '@/data/testimonials.json';

// Type assertion for imported JSON data
export const propertiesForSale: PropertyCardProps[] = propertiesForSaleData.map(p => ({ ...p, service: 'ARHome' })) as PropertyCardProps[];
export const propertiesForRent: PropertyCardProps[] = propertiesForRentData.map(p => ({ ...p, service: 'ARHome' })) as PropertyCardProps[];
export const propertiesALE: PropertyCardProps[] = propertiesALEData as PropertyCardProps[];
export const testimonials: Testimonial[] = testimonialsData as Testimonial[];

// Function to get all properties
export const getAllProperties = (): PropertyCardProps[] => {
  return [...propertiesForSale, ...propertiesForRent, ...propertiesALE];
};

// Function to get property by ID
export const getPropertyById = (id: string): PropertyCardProps | undefined => {
  return getAllProperties().find(property => property.id === id);
};

// Function to get properties by type
export const getPropertiesByType = (forSale: boolean): PropertyCardProps[] => {
  return getAllProperties().filter(property => property.forSale === forSale);
};

// Function to get properties by service
export const getPropertiesByService = (service: 'ALE' | 'ARHome'): PropertyCardProps[] => {
  return getAllProperties().filter(property => property.service === service);
};

// Function to get featured properties (could be based on any criteria)
export const getFeaturedProperties = (limit: number = 3): PropertyCardProps[] => {
  // For this example, we'll just return the first few properties of each type
  const featured = [...propertiesForSale.slice(0, Math.ceil(limit/2)), 
                    ...propertiesForRent.slice(0, Math.floor(limit/2))];
  return featured.slice(0, limit);
};

// Function to get testimonials
export const getTestimonials = (): Testimonial[] => {
  return testimonials;
};
