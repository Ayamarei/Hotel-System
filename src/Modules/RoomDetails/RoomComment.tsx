import { Box, Button, CircularProgress,  TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { IRoomComment } from "../../Interfaces/RoomDetailsInterface";
import { Room_Comment_Validation } from "../../Services/Validation";
import { PORTAL_URLS_Details } from "../../Services/Urls";
import { privateAxiosInstance } from "../../Services/Axiosinstance";


export default function RoomComment({roomId}:{roomId:string}){
    const {t}=useTranslation()
    const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<IRoomComment>()
  
  
      const onSubmit=async(values:IRoomComment)=>{
        values.roomId=roomId
          console.log(values)
 
            try {
                const {data}=await privateAxiosInstance.post(PORTAL_URLS_Details.CREATE_COMMENT,values)
                console.log(data)
                toast.success(data?.message)
    
            } catch (error) {
                console.log(error)
                if(error instanceof AxiosError){
                  toast.error(error?.response?.data.message||'Something Went Wrong')
                }
            }
         
      }
    return <>

   
     <Typography sx={{mb:"20px"}}>{t("room.AddYourComment")}</Typography>
  
    <form onSubmit={handleSubmit(onSubmit)}>
  
      <TextField
  {...register("comment",Room_Comment_Validation(t))}
            fullWidth
            multiline
            rows={5}
            // sx={{mt:"72px"}}
            sx={{
              mt:"72px",
              
              '& .MuiOutlinedInput-root': {
               
            
                '& fieldset': {
                  borderColor: "rgba(176, 176, 176, 1)", 
                },
                '&:hover fieldset': {
                  borderColor: "rgba(176, 176, 176, 1)", 
                },
                '&.Mui-focused fieldset': {
                  borderColor: "rgba(176, 176, 176, 1)",  
                },
              },
            }}
          />
          {errors.comment&& <Typography sx={{color:"#d32f2f"}}>*{errors.comment.message}</Typography>}
       <Box sx={{display:"flex",justifyContent:"flex-end"}}>
       <Button variant="contained" type="submit" 
          sx={{mt:"20px",width:"210px",height:"50px"}}
           startIcon={ isSubmitting ? <CircularProgress color="inherit" size={20} /> : null} 
           disabled={isSubmitting}>{isSubmitting?t("room.Sending"):t("room.Send")}</Button>
       </Box>

    </form>


    </>
}
