

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
// rooms validation
export const RoomNumber_Validation = (t: Function) => ({
  required: t("room.RoomNumberRequired"),
  min: {
    value: 1,
    message: t("room.RoomNumberMin"),
  },
  max: {
    value: 9999,
    message: t("room.RoomNumberMax"),
  },
});

export const RoomPrice_Validation = (t: Function) => ({
  required: t("room.PriceRequired"),
  min: {
    value: 500,
    message: t("room.PriceMin"),
  },
});

export const Capacity_Validation = (t: Function) => ({
  required: t("room.CapacityRequired"),
  min: {
    value: 1,
    message: t("room.CapacityMin"),
  },
  max: {
    value: 10,
    message: t("room.CapacityMax"),
  },
});

export const Discount_Validation = (t: Function) => ({
  required: t("room.DiscountRequired"),
  min: {
    value: 0,
    message: t("room.DiscountMin"),
  },
  max: {
    value: 100,
    message: t("room.DiscountMax"),
  },
});

export const Facilities_Validation = (t: Function) => ({
  required: t("room.FacilitiesRequired"),
}); 