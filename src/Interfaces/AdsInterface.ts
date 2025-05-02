
import { CreatedBy, IRoomData } from "../Interfaces/RoomInterface";

export interface AdsFormProps {
  open: boolean;
  handleClose: () => void;
  selectedItem: Iad | null;
  getAllAds: (size: number, page: number) => {};
};

export interface AdsData {
  room?: string;
  discount: number;
  isActive: boolean | string;
};

export interface Iad {
    _id : string;
    isActive : boolean;
    roomNumber : number;
    capacity : number;
    discount : number;
    createdAt : string;
    room:IRoomData;
  }


   export interface IUserPortalAd {
        _id: string,
        isActive: boolean,
        room: IRoomData,
        createdBy: CreatedBy
        createdAt: string,
        updatedAt: string,

  }


export interface IAdsResponseData {
  success: boolean;
  message: string;
  data: { 
      ads: IUserPortalAd[],
      totalCount: number;
    };
}