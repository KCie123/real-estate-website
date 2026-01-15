import { createContext, useContext, useState, ReactNode } from 'react';

export type BrandType = 'buy' | 'rent';

interface BrandContextType {
  brand: BrandType;
  setBrand: (brand: BrandType) => void;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider = ({ children, initialBrand = 'buy' }: { children: ReactNode, initialBrand?: BrandType }) => {
  const [brand, setBrand] = useState<BrandType>(initialBrand);

  return (
    <BrandContext.Provider value={{ brand, setBrand }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = (): BrandContextType => {
  const context = useContext(BrandContext);
  if (context === undefined) {
    throw new Error('useBrand must be used within a BrandProvider');
  }
  return context;
}; 