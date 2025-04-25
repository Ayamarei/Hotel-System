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


    // Rooms_URLS
export const ROOMS_URLS={
  CREATE_ROOM:'/rooms',
  UPDATE_ROOM:(id:string)=>`/rooms/${id}`,
  GET_ROOMS: '/rooms',
  DELETE_ROOMS:(id:string)=>`/rooms/${id}`,
  GET_ROOM:(id:string)=>`/rooms/${id}`,
  GET_FACILITIES_ROOM:'/room-facilities'
}



// booking_URLS
export const ADMIN_BOOKINGS_URLS={
  GET_ALL_BOOKINGS :  '/booking',
  GET_BOOKING_DETAILS : (id:string) => `booking/${id}`,
  DELETE_BOOKING : (id:string) => `booking/${id}`,
}
