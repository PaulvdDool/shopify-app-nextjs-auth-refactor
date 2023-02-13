import { ReactNode } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Layout, Page, Spinner } from "@shopify/polaris";
import { ApolloClient, ApolloProvider as Provider, HttpLink, InMemoryCache } from "@apollo/client";
import { useShopOrigin } from "@hooks/index";
import { userLoggedInFetch } from "@lib/index";

export function ApolloProvider( { children }: { children: ReactNode } ) {

  const app = useAppBridge();
  const shop: string = useShopOrigin();

  console.info( 'ApolloProvider shop', shop );

  if ( !shop ) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Spinner />
            <p>Setting up Apollo. Retrieving shop name...</p>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  const client: ApolloClient<any> = new ApolloClient( {
    cache: new InMemoryCache(),
    link: new HttpLink( {
      uri: '/api/graphql',
      credentials: 'include',
      fetch: userLoggedInFetch( app ) as any,
      headers: { 'shop': shop }
    } )
  } );

  console.info( 'ApolloProvider client set up', client );

  return (
    <Provider client={client}>
      { children }
    </Provider>
  );

}