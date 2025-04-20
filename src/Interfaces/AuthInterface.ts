
export interface IForget{
    email:string
}
export interface IReset{
    email:string,
    seed:string,
    password:string,
    confirmPassword:string
}

// Register
export interface IRegisterForm {
    userName:string,
    phoneNumber:string,
    country:string,
    email:string,
    password:string,
    confirmPassword:string

}
//login
export interface ILogin{
    email:string
    password:string
  }