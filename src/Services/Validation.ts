export const EmailValidation_Forget={
    required:'Email is Required',
    pattern:{
      value:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message:'Please Enter a valid Email'
     }
   }
export const SeedValidation_Reset={
    required:'OTP is Required',
    minLength:{
        value:4,
        message:"Enter min 4 characters"
       }
}
export const PasswordValidation_Reset={
    required:'Password is Required',
    validate: {
      hasLowerCase: (value: string) =>
        /[a-z]/.test(value) || "Must include at least one lowercase letter.",
      hasUpperCase: (value: string) =>
        /[A-Z]/.test(value) || "Must include at least one uppercase letter.",
      hasNumber: (value: string) =>
        /\d/.test(value) || "Must include at least one digit.",
      hasSpecialChar: (value: string) =>
        /[\W_]/.test(value) || "Must include at least one special character.",
      minLength: (value: string) =>
        value.length >= 6 || "Password must be at least 6 characters long.",
    }
 }

export const PasswordComfirmValidation_Reset={
    required:'confirmPassword is Required'
   }
