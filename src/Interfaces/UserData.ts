export interface IUserData {
  _id: string;
  userName: string;
  phoneNumber?: string;
  email?: string;
  country?: string;
  role?: string;
  profileImage?: string;
}

export interface IUserResponseData {
    data: { 
      users: IUserData[]; 
      totalCount: number;
    };
}

export interface IResponseData<T> {
  success: boolean;
  message: string;
  data: T;
}
