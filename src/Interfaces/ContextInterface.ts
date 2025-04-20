

export interface ILoginData {
        _id: string,
        role: string,
        verified: boolean,
        iat: string,
        exp: string
      
  }
export interface IAuthContext {
    loginData: ILoginData | null;
    saveLoginData: () => void;
  }