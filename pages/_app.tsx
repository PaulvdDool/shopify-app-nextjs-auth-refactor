import type { AppProps } from 'next/app';
import { AppProvider as PolarisProvider } from '@shopify/polaris';
import polarisTranslationsEn from "@shopify/polaris/locales/en.json";
import { AppBridgeProvider, ApolloProvider } from '@components/providers/index';

export default function App( { Component, pageProps }: AppProps ) {

  return (
    <PolarisProvider i18n={polarisTranslationsEn}>
      <AppBridgeProvider>
        <ApolloProvider>
          <Component {...pageProps} />
        </ApolloProvider>
      </AppBridgeProvider>
    </PolarisProvider>
  );
}
