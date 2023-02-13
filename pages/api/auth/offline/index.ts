import shopify from '@lib/shopify';
import type { NextApiRequest, NextApiResponse } from 'next';
import { SessionStorage } from "@lib/sessionStorage";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  try {

    console.info( 'auth/offline/index start' );

    const shop: string = shopify.utils.sanitizeShop( req.query.shop as string, true ) as string;

    if ( !shop ) {
      console.info( 'auth/offline/index no shop' );
      res.redirect( '/login' );
    }

    const sessionId: string = await shopify.session.getOfflineId( shop );
    const session: any = await SessionStorage.getSession( sessionId );

    if ( session ) {
      console.info( 'auth/offline/index there is a session', session );
      return res.redirect( `/api/auth?host=${req.query.host}&shop=${req.query.shop}` );
    }

    console.info( 'auth/offline/index shopify.auth.begin' );

    return shopify.auth.begin( {
      shop,
      callbackPath: 'api/auth/offline/callback',
      isOnline: false,
      rawRequest: req,
      rawResponse: res,
    } );

  } catch ( error: any ) {
    console.error( error );
    res.redirect( '/login?error=true' );
  }
}