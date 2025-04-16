export interface IForget{
  email:string
}
export interface IReset{
  email:string,
  seed:string,
  password:string,
  confirmPassword:string
}
export interface ILogin{
  email:string
  password:string
}


