

  // SIGNUP_VALIDATIN
export const USER_NAME_VALIDATION={
  required: "Username is required",
  pattern: {
    value: /^(?=.*[A-Za-z])[A-Za-z0-9]*[0-9]$/,
    message: "Username must contain letters and end with a number without spaces"
  }
  
}
export const COUNTRY_VALIDATION={
required: "country  is required",
pattern: {
  value: /^[A-Za-z\s]+$/,
  message: "Country must contain only letters and spaces",
},
}

export const PHONE_VALIDATION={
required: "Phone is required",
pattern: {
  value: /^\(?([0-9]{4})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
  message: "Please enter a valid phone number in the format (123) 456-7890",                        },
}
export const EMAIL_VALIDATION={
  required: "Email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    message: "Email is not valid",
  },
}

export const PASSWORD_VALIDATION={
  required: "Password is required",
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).{6,}$/,
    message: "Password must be at least 6 characters and include letters, numbers, and special characters",
  },
}
export const CONFIRMPASSWORD_VALIDATION={
  required: "confirmPassword is required",
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!&$%&? "]).{6,}$/,
    // message: "confirmPassword must match Password ",
    message: "confirmPassword must be at least 6 characters and include letters, numbers, and special characters",

  },
}
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
  pattern:{
    value:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/,
   message:"The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long."
 }
}

export const PasswordComfirmValidation_Reset={
    required:'confirmPassword is Required'
   }
