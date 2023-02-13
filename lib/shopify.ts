import { ApiVersion, shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/node";

const shopify = shopifyApi( {
  apiKey: process.env.NEXT_PUBLIC_SHOPIFY_API_KEY as string,
  apiSecretKey: process.env.NEXT_PUBLIC_SHOPIFY_SECRET_KEY as string,
  scopes: process.env.NEXT_PUBLIC_SCOPES?.split(',') as Array<string>,
  hostName: process.env.NEXT_PUBLIC_HOST?.replace(/https:\/\//, "") as string,
  isEmbeddedApp: true,
  apiVersion: ApiVersion.January23
} );

export default shopify;