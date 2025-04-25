import { IUserData } from "./UserData";

export interface IBookingData{
    _id:string;
    startDate:string;
    endDate:string;
    createdAt:string;
    updatedAt:string;
    totalPrice:number;
    user:IUserData;
    status:string;

    room :{
        _id:string;
        roomNumber:string;
    }
}


export interface IBookingResponseData {
  booking: IBookingData[];
  totalCount: number;
}

export interface IResponseData<T> {
  success: boolean;
  message: string;
  data: T;
}
