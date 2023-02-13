import { Provider } from "@shopify/app-bridge-react";
import { AppConfigV2 } from "@shopify/app-bridge";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Layout, Page, Spinner } from "@shopify/polaris";

export function AppBridgeProvider( { children }: { children: ReactNode } ) {

  const router = useRouter();

  const [ appBridgeConfig, setAppBridgeConfig ] = useState<AppConfigV2 | null>( null );

  useEffect( () => {
    console.info( 'AppBridgeProvider Received router.query', router.query );
    const host: string = router.query?.host as string;

    if ( host ) {
      setAppBridgeConfig( {
        host,
        apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY as string,
        forceRedirect: true
      } );
    }

  }, [ router.query ] )

  if ( !appBridgeConfig ) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Spinner />
            <p>Connecting AppBridge...</p>
          </Layout.Section>
        </Layout>
      </Page>
    )
  }

  console.info( 'AppBridgeProvider has appBridgeConfig', appBridgeConfig );

  return (
    <Provider config={appBridgeConfig as AppConfigV2}>
      { children }
    </Provider>
  )
}