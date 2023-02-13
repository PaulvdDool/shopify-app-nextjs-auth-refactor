import { Layout, Page } from "@shopify/polaris";

export default function Home() {

  console.info( 'pages/index.tsx' );

  return (
    <Page>
      <Layout>
        <Layout.Section>
          Hello world
        </Layout.Section>
      </Layout>
    </Page>
  )
}
