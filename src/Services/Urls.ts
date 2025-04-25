// USERS_URLS
export const USERS_URLS={
  LOGIN:'/users/login',
  REGISTER:'/users/',
  CHANGE_PASSWORD: '/users/change-password',
  RESET_PASSWORD:'/users/reset-password',
  FORGET_PASSWORD:'/users/forgot-password',
}

 // Rooms_URLS
 export const ROOMS_URLS={
  CREATE_ROOM:'/rooms',
  UPDATE_ROOM:(id:string)=>`/rooms/${id}`,
  GET_ROOMS: '/rooms',
  DELETE_ROOMS:(id:string)=>`/rooms/${id}`,
  GET_ROOM:(id:string)=>`/rooms/${id}`,
  GET_FACILITIES_ROOM:'/room-facilities'
}

// /room-facilities-url
export const FACILITES_URLS={
  GET_FACILITES:"/room-facilities",
  ADD_FACILITES:"/room-facilities",
 DELETE_FACILITES:(id:string)=>`/room-facilities/${id}`,
 EDIT_FACILITES:(id:string)=>`/room-facilities/${id}`,
}




export const ADS_URLS={
  GET_ALL_ADS:'/ads',
  CREATE_NEW_ADS:'/ads',
  GET_ADS_DETAILS_BY_ID:(id:string)=>`/ads/${id}`,
  EDIT_ADS:(id:string)=>`/ads/${id}`,
  DELETE_ADS:(id:string)=>`/ads/${id}`,
}

