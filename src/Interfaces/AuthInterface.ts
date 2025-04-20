
// Register
export interface IRegisterForm {
    userName:string,
    phoneNumber:string,
    country:string,
    email:string,
    password:string,
    confirmPassword:string

//forget
export interface IForget{
    email:string
}
//reset
export interface IReset{
    email:string,
    seed:string,
    password:string,
    confirmPassword:string

}


