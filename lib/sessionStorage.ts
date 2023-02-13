export class SessionStorage {
  static saveSession = async ( session: any ) => {
    console.info( 'storing session', session );
    try {
      // TODO: implement mongodb
      await window.localStorage.setItem( session.sessionId, session );
      return true;
    } catch ( error: any ) {
      throw new Error( error );
    }
  }

  static getSession = async ( sessionId: string ) => {
    console.info( 'getting session', sessionId );
    try {
      // TODO: implement mongodb
      return window.localStorage.getItem( sessionId );
    } catch ( error: any ) {
      throw new Error( error );
    }
  }

  static deleteSession = async ( sessionId: string ) => {
    console.info( 'deleting session', sessionId );
    try {
      // TODO: implement mongodb
      window.localStorage.removeItem( sessionId );
    } catch ( error: any ) {
      throw new Error( error );
    }
  }
}