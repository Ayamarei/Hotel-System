//forget
export interface IForget {
  email: string;
}
//reset
export interface IReset {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
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
// login

export interface ILogin {
  email: string;
  password: string;
}
// change-password

export interface ChangePassProps {
  open: boolean;
  handleClose: () => void;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}
