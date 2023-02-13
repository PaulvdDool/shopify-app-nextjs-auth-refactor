export class StoreStorage {

  // TODO: create shop interface
  static storeShop = async ( shop: any ) => {
    try {
      await window.localStorage.setItem( shop.domain, JSON.stringify( shop ) );
    } catch ( error: any ) {
      throw new Error( error );
    }
  }

  static getShop = async ( shop: string ) => {
    try {
      const shopData = await window.localStorage.getItem( shop );
      return shopData ? JSON.parse( shopData ) : null;
    } catch ( error: any ) {
      throw new Error( error );
    }
  }

  static updateShop = async ( shop: string, properties: { [key: string]: any } ) => {
    try {
      const shopData = this.getShop( shop );
      await window.localStorage.setItem( shop, JSON.stringify( { ...shopData, ...properties } ) );
    } catch ( error: any ) {
      throw new Error( error );
    }
  }

  static deleteShop = async ( shop: string ) => {
    try {
      await window.localStorage.removeItem( shop );
    } catch ( error: any ) {
      throw new Error( error );
    }
  }

}