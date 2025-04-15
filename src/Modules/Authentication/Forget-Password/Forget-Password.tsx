import { 
   Box,
   Button,
   CircularProgress, 
   InputLabel,
  TextField,
  Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { EmailValidation_Forget } from "../../../Services/Validation"
import { IForget } from "../../../Interfaces/AuthInterface"
import { THEMECOLOR } from "../../../Services/ThemeColors"
import { publicUserAxiosInstance } from "../../../Services/Axiosinstance"
import { USERS_URLS } from "../../../Services/Urls"
import { useNavigate } from "react-router-dom"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

export default function ForgetPassword() {
  const navigate=useNavigate()
  const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<IForget>({
    mode:'onChange'
  })

  const onSubmit=async(values:IForget)=>{
console.log(values)
try {
 const {data}=await publicUserAxiosInstance.post(USERS_URLS.FORGET_PASSWORD,values)
 toast.success(data?.message)
 navigate('/reset-password',{state:{email:values.email}})

} catch (error) {
  console.log(error)
  if(error instanceof AxiosError){
    toast.error(error?.response?.data?.message||'Something Went Wrong')
  }
}
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{width:"100%"}}>
  <Box>
  <InputLabel sx={{color:"rgba(21, 44, 91, 1)",mb:"8px"}}>Email</InputLabel>
        <TextField
                 id="email"
                 label="Please type here ..."
                 variant="filled"
                 fullWidth
                 {...register("email", EmailValidation_Forget)}
               />
  {errors.email && <Typography sx={{color:"red",mt:"10px",fontSize:"13px"}}>*{errors.email.message}</Typography>}

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
  {isSubmitting ? 'Sending...' : 'Send Mail'}
</Button>
    </form>
  )
}
