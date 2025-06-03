import Link from 'next/link';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { BsBuilding } from 'react-icons/bs';
import { useTranslation } from 'next-i18next';


export interface PropertyCardProps {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  levels?: number;
  imageUrls?: string[];
  forSale: boolean;
  description?: { [key: string]: string };
  features?: { [key: string]: string[] };
  yearBuilt?: number;
  parkingSpaces?: number;
  petFriendly?: boolean;
  availableFrom?: string;
  latitude?: number;
  longitude?: number;
  _imageUrls?: string[];
}

const PropertyCard = ({
  id,
  title,
  address,
  price,
  bedrooms,
  bathrooms,
  sqft,
  levels = 1,
  imageUrls,
  forSale
}: PropertyCardProps) => {
  const { t } = useTranslation('common');

  return (
    <article className="property-card group h-full flex flex-col">
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-200 transition-transform duration-500 group-hover:scale-105">
          {/* This will be replaced with actual images */}
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            {/* Placeholder for image */}
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-accent text-primary px-3 py-1 rounded-md font-medium text-sm">
          {forSale ? t('cardForSale') : t('cardForRent')}
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="font_3 text-xl font-bold mb-2 group-hover:text-accent transition-colors">{title}</h3>
        <p className="text-gray-600 mb-4">{address}</p>
        
        <div className="mb-6">
          <span className="text-xl font-bold text-primary">
            ${price.toLocaleString()}
            {!forSale && '/mo'}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-4 text-gray-700 mb-6">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaBed className="mr-2 text-accent" />
            <span>{bedrooms} {bedrooms === 1 ? t('cardBed') : t('cardBeds')}</span>
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaBath className="mr-2 text-accent" />
            <span>{bathrooms} {bathrooms === 1 ? t('cardBath') : t('cardBaths')}</span>
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <BsBuilding className="mr-2 text-accent" />
            <span>{levels} {levels === 1 ? t('cardLevel') : t('cardLevels')}</span>
          </div>
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
            <FaRulerCombined className="mr-2 text-accent" />
            <span>{sqft.toLocaleString()} sqft</span>
          </div>
        </div>
        
        <div className="p-4 pt-0 mt-auto">
          <Link 
            href={`/property/${id}`} 
            className="btn btn-primary w-full text-center"
          >
            {t('cardViewDetails')}
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PropertyCard;
