
import { IRoomData } from "../Interfaces/RoomInterface";

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
    createdAt : String;
    room:IRoomData;
  }