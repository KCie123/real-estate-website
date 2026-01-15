import { useEffect } from 'react';
import type { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

// Redirect to buy-or-sell page
export default function Home() {
  return null; // This won't render as we're redirecting server-side
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    redirect: {
      destination: '/buy-or-sell',
      permanent: false,
    },
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};
