import type { NextApiRequest, NextApiResponse } from 'next';
import { shopify } from '@lib/index';
import { SessionStorage } from "@lib/sessionStorage";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {

  console.info( 'auth/index start' );

  const shop: string = shopify.utils.sanitizeShop( req.query.shop as string, true ) as string;

  if ( !shop ) {
    console.error( 'Auth: shop parameter unavailable' );
    res.redirect( '/login' );
    //TODO: add login route
  }

  try {
    const sessionId = await shopify.session.getOfflineId( shop );
    const session = await SessionStorage.getSession( sessionId );

    if ( !session ) {
      console.info( 'auth/index No session' );
      return res.redirect( `api/auth/offline?host=${req.query.host}&shop=${req.query.shop}` );
    }

    console.info( 'auth/index shopify.auth.begin' );
    return shopify.auth.begin( {
      shop,
      callbackPath: `api/auth/callback`,
      isOnline: true,
      rawRequest: req,
      rawResponse: res
    } );

  } catch ( error: any ) {
    console.error( 'auth/index', error );
  }

  res.redirect( `/login?shop=${shop}` );

}