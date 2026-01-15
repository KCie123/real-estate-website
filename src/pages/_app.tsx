import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter, Playfair_Display } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { BrandProvider } from '@/context/BrandContext';

// Load fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BrandProvider>
      <div className={`${inter.variable} ${playfair.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
    </BrandProvider>
  );
}

export default appWithTranslation(MyApp);
