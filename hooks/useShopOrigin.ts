import { useEffect, useState } from "react";

export function useShopOrigin() {

  const [ shopOrigin, setShopOrigin ] = useState<string>('' );

  useEffect( () => {
    if ( typeof window !== 'undefined' && window.location ) {
      const shop = new URLSearchParams( window.location.search ).get( 'shop' );
      if ( shop ) {
        setShopOrigin( shop );
      }
    }
  }, [] );

  return shopOrigin;

}