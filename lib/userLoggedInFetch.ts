import { authenticatedFetch } from "@shopify/app-bridge/utilities";
import { Redirect } from "@shopify/app-bridge/actions";

export function userLoggedInFetch( app: any ) {

  const fetch = authenticatedFetch( app );
  const shop: string = new URLSearchParams( window.location.search ).get( 'shop' ) as string;

  return async ( uri: string, options: any ) => {

    const response = await fetch( uri, options );

    if ( response.status === 401 ) {
      const authURL = `${process.env.NEXT_PUBLIC_HOST}/api/auth?shop=${shop}`;
      const redirect = Redirect.create( app );
      redirect.dispatch( Redirect.Action.REMOTE, authURL );
      return false;
    }

    return response;

  }

}