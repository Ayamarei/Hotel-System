export interface IRoomsResponse{
    data:{
        rooms:IRoomData[],
        totalCount:number

    },
}

export interface IFacilities_Room_Response{
data:{
facilities:IFacility_Room[],


},
}

interface CreatedBy {
    _id: string;
    userName: string;
  }
  
export     interface IFacility_Room {
    _id: string;
    name: string;
  }
export    interface IRoomData {
    _id: string;
    roomNumber: number;
    price: number;
    capacity: number;
    discount: number;
    facilities: IFacility_Room[];
    images: string[];    
    createdAt: string;
    updatedAt: string;
    createdBy: CreatedBy;
  }
// export interface IFacility

export interface IRoomSubmit{
roomNumber:number,
price:number,
capacity:number,
discount:number,
facilities:string[],
imgs?:File[]
}
// room creation 
export interface IRoomCreation{
message:string
}
// response room for edit 
export interface IRoom_Id_Response{
data:{
  room:IRoomData,
},
}