import { 
  Box,
  Button,
 CircularProgress,
  FilledInput, 
  IconButton, 
  InputAdornment, 
  InputLabel, 
  TextField, 
  Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import {
   EmailValidation_Forget,
   PasswordComfirmValidation_Reset, 
   PasswordValidation_Reset,
   SeedValidation_Reset } from "../../../Services/Validation"
import { THEMECOLOR } from "../../../Services/ThemeColors"
import { IReset } from "../../../Interfaces/AuthInterface"
import { publicUserAxiosInstance } from "../../../Services/Axiosinstance"
import { USERS_URLS } from "../../../Services/Urls"
import { useEffect } from "react"
import { VisibilityOff } from "@mui/icons-material"
import { useTogglePassword } from "../../../hooks/useTogglePassword"
import { AxiosError } from "axios"

import Visibility from '@mui/icons-material/Visibility';
import { toast } from "react-toastify"


export default function ResetPassword() {
  const {toggleVisiblePassword,visiablity}=useTogglePassword()
  
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const {state}=useLocation()
  const navigate=useNavigate()
    const {register,handleSubmit,formState:{errors,isSubmitting},watch,trigger}=useForm<IReset>(
      {
      defaultValues:{email:state?.email},
      mode:"onChange"
    }
    )
  
  // submit function
   const onSubmit=async(values:IReset)=>{
  console.log(values)
  try {
   const {data}=await publicUserAxiosInstance.post(USERS_URLS.RESET_PASSWORD,values)
   console.log(data)
   toast.success(data?.message)
   navigate('/login')
  
  } catch (error) {
    console.log(error)
      if(error instanceof AxiosError){
        toast.error(error?.response?.data?.message||'Something Went Wrong')
      }
  }
    }
    const password=watch('password')
    const comfirmPassword=watch('confirmPassword')
    useEffect(()=>{
  
      if(comfirmPassword){
        trigger("confirmPassword") 
      }
    },[password,comfirmPassword,trigger])
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%"}}>
        {/* mail */}
  <Box sx={{mb:'16px'}}>  
  <InputLabel htmlFor="email" sx={{color:"rgba(21, 44, 91, 1)",mb:"8px"}}>Email</InputLabel>
        <TextField
                 id="email"
                 type="email"
                 label="Please type here ..."
                 variant="filled"
                 fullWidth
                 {...register("email", EmailValidation_Forget)}
               />
               {errors.email && <Typography sx={{color:"red",mt:"10px",fontSize:"13px"}}>*{errors.email.message}</Typography>}
{/* otp */}
  </Box>
  <Box sx={{mb:'16px'}}>
  <InputLabel htmlFor="otp" sx={{color:"rgba(21, 44, 91, 1)",mb:"8px"}}>OTP</InputLabel>
        <TextField
                 id="otp"
                 type="text"
                 label="Please type here ..."
                 variant="filled"
                 fullWidth
                 {...register("seed", SeedValidation_Reset)}
               />
               {errors.seed && <Typography sx={{color:"red",mt:"10px",fontSize:"13px"}}>*{errors.seed.message}</Typography>}

  </Box>

{/* password */}
<Box sx={{mb:'16px'}}>
<InputLabel htmlFor="paswword" sx={{color:"rgba(21, 44, 91, 1)",mb:"8px"}}>Password</InputLabel>
          <FilledInput
            id="password"
            fullWidth
            type={visiablity.password ? 'text' : 'password'}
            {...register('password',PasswordValidation_Reset)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    visiablity.password ? 'hide the password' : 'display the password'
                  }
                  onClick={()=>toggleVisiblePassword('password')}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {visiablity.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
              {errors.password && <Typography sx={{color:"red",mt:"10px",fontSize:"13px"}}>*{errors.password.message}</Typography>}
</Box>

{/* comfirmpassword */}

<Box sx={{mb:'16px'}}>
<InputLabel htmlFor="paswword" sx={{color:"rgba(21, 44, 91, 1)",mb:"8px"}}>Confirm Password</InputLabel>
          <FilledInput
            id="password"
            fullWidth
            {...register('confirmPassword',{
              ...PasswordComfirmValidation_Reset,
             validate:(value:string)=>value===watch('password')||'Password does not match'
            })}
            type={visiablity.confirmPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    visiablity.confirmPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={()=>toggleVisiblePassword('comfirmPassword')}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {visiablity.confirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
              {errors.confirmPassword && <Typography sx={{color:"red",mt:"10px",fontSize:"13px"}}>*{errors.confirmPassword.message}</Typography>}
</Box>
  <Button
  variant="contained"
  type="submit"
  disabled={isSubmitting}
  startIcon={isSubmitting ? <CircularProgress color="inherit" size={20} /> : null}
  sx={{
    mt: '20px',
    backgroundColor: THEMECOLOR.mainBlue,
    width: '100%',
  }}
>
  {isSubmitting ? 'Reseting...' : 'Reset'}
</Button>
    </form>
    </>
  )
}
