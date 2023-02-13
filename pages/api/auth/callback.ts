import { NextApiRequest, NextApiResponse } from "next";
import { shopify } from '@lib/index';
import { SessionStorage } from "@lib/sessionStorage";
import { StoreStorage } from "@lib/storeStorage";
import { GET_SHOP } from "@queries/index";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

  console.info( 'auth/callback start' );

  try {
    const callback = await shopify.auth.callback( {
      isOnline: true,
      rawRequest: req,
      rawResponse: res
    } );

    const session = callback.session;
    const shop    = session.shop;

    console.info( 'auth/callback saving session', session );
    await SessionStorage.saveSession( session );

    let fetchShopData: boolean = true;
    const shopData: any        = StoreStorage.getShop( session.shop );

    if ( !shopData ) {
      // not installed yet
      console.info( 'auth/callback no shopData' );
      await StoreStorage.storeShop( {
        domain: shop,
        isInstalled: true,
        installDate: new Date(),
        uninstallDate: null,
      } )
    } else if ( !shopData.isInstalled ) {
      // reinstalling

      console.info( 'auth/callback reinstalling', shopData );
      await StoreStorage.updateShop( shopData.domain, {
        isInstalled: true,
        installDate: new Date(),
        uninstallDate: null
      } );
    } else if ( !!shopData.isInstalled ) {
      // reauthorizing
      fetchShopData = false;
      console.info( 'auth/callback reauthorizing', shopData );
    }

    if ( !!fetchShopData ) {
      // do graphQL call do fetch shop data
      // update
      console.info( 'auth/callback starting to fetch shop data' );
      const sessionId      = await shopify.session.getOfflineId( shop );
      const offlineSession = await SessionStorage.getSession( sessionId );

      const client = new shopify.clients.Graphql( {
        session: offlineSession as any
      } );

      const response: any = await client.query( { data: GET_SHOP } );

      if ( !response?.body?.data?.shop ) {
        console.error( `Missing shop data on ${shop}`, response?.body );
      } else {
        const shopData = response.body.data.shop;
        console.info( 'auth/callback storing fetched shopData', shopData );
        StoreStorage.updateShop( shop, shopData );
      }

    }
  } catch ( error: any ) {
    console.error( error );
  }

  const redirectURL = await shopify.auth.getEmbeddedAppUrl( {
    rawRequest: req,
    rawResponse: res
  } );

  console.info( 'auth/callback redirectURL', redirectURL );

  return res.redirect( 302, redirectURL );

}