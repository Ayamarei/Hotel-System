export interface ILoginData {
  _id: string;
  role: string;
  verified: boolean;
  iat: string;
  exp: string;
}

export interface IUser {
  _id: string;
  userName: string;
  email: string;
  phoneNumber: string | number;
  country: string;
  role: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface IAuthContext {
  loginData: ILoginData | null;
  saveLoginData: () => void;
  userDetails: IUser | null;
  isAuthLoading: boolean;
}
