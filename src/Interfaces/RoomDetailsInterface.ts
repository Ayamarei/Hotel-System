export interface IRoomDetailsResponse{
    data:{
        room:IRoomDetails
    }
}
export interface Facility {
    _id: string;
    name: string;
  }
  
  export interface CreatedBy {
    _id: string;
    userName: string;
  }
export interface IRoomDetails{
    
      
        _id: string;
        roomNumber: string;
        price: number;
        capacity: number;
        discount: number;
        facilities: Facility[];
        createdBy: CreatedBy;
        images: string[];
        createdAt: string; // ISO date string
        updatedAt: string; // ISO date string

      
}
export interface IDesc{

        img:string,
        number:string,
        desc:string,

}

export interface IReviewData{
  
    roomId:string,
    rating: number,
    review: string

}
export interface IRoomComment{
  comment:string,
  roomId:string
}