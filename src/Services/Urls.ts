// USERS_URLS
export const USERS_URLS={
  LOGIN:'/users/login',
  REGISTER:'/users/',
  CHANGE_PASSWORD: '/users/change-password',
  RESET_PASSWORD:'/users/reset-password',
  FORGET_PASSWORD:'/users/forgot-password',
}
export const ADS_URLS={
  GET_ALL_ADS:'/ads',
  CREATE_NEW_ADS:'/ads',
  GET_ADS_DETAILS_BY_ID:(id:string)=>`/ads/${id}`,
  EDIT_ADS:(id:string)=>`/ads/${id}`,
  DELETE_ADS:(id:string)=>`/ads/${id}`,
}