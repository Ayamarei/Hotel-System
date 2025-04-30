// USERS_URLS
export const USERS_URLS={
  LOGIN:'/users/login',
  REGISTER:'/users/',
  CHANGE_PASSWORD: '/users/change-password',
  RESET_PASSWORD:'/users/reset-password',
  FORGET_PASSWORD:'/users/forgot-password',
  GET_ALL_USERS :  '/users',
  GET_USER_PROFILE : (id:string) => `users/${id}`,
}
//Rooms_URLS
export const ROOMS_URLS={
  CREATE_ROOM:'/rooms',
  UPDATE_ROOM:(id:string)=>`/rooms/${id}`,
  GET_ROOMS: '/rooms',
  DELETE_ROOMS:(id:string)=>`/rooms/${id}`,
  GET_ROOM:(id:string)=>`/rooms/${id}`,
  GET_FACILITIES_ROOM:'/room-facilities'
}
//room-facilities-url
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

export const DASHBOARD_URLS={
  CHART:'/dashboard'
}


// booking_URLS
export const ADMIN_BOOKINGS_URLS={
  GET_ALL_BOOKINGS :  '/booking',
  GET_BOOKING_DETAILS : (id:string) => `booking/${id}`,
  DELETE_BOOKING : (id:string) => `booking/${id}`,
}



 // For User Portal
//  Favorite_Url
export const FAVORITE_ROOMS={
  GET_ALL:"favorite-rooms",
  ADD_Fav:"favorite-rooms",
  DELETE_Fav:(id:string)=>`favorite-rooms/${id}`,
}

// Ads_Url
export const Ads_Url={
  GET_ALL:"ads",
  
}