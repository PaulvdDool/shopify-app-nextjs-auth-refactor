import { shopify } from "@lib/index";
import { NextApiRequest, NextApiResponse } from "next";
import { SessionStorage } from "@lib/sessionStorage";

export default async function handler( req: NextApiRequest, res: NextApiResponse ) {
  try {
    console.info( 'auth/offline/callback start' );
    const callback = await shopify.auth.callback( {
      isOnline: false,
      rawRequest: req,
      rawResponse: res
    } );

    console.info( 'auth/offline/callback storing session', callback.session );
    await SessionStorage.saveSession( callback.session );
  } catch ( error ) {
    console.error( error );
  }

  res.redirect( `/api/auth?host=${req.query.host}&shop=${req.query.shop}` );
}