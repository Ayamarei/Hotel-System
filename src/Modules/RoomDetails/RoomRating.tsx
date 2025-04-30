import { Box, Button, CircularProgress, Grid, Rating, TextField, Typography } from "@mui/material";
import React, {  } from "react";
import StarIcon from '@mui/icons-material/Star';
import { Controller, useForm } from "react-hook-form";
// import { axiosPrivateInstance } from "../../../../services/api/apiInstance";
// import { PORTAL_URLS } from "../../../../services/api/apiConfig";
// import { IReviewData } from "../../../../interfaces/RoomDetailsInterface";
// import { Room_Rate_Validation, Room_Rewiew_Validation } from "../../../../services/validation";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Room_Rate_Validation, Room_Rewiew_Validation } from "../../Services/Validation";
import { IReviewData } from "../../Interfaces/RoomDetailsInterface";


export default function RoomRating({roomId}:{roomId:string}) {
  const {t}=useTranslation()
  const {register,handleSubmit,formState:{errors,isSubmitting},control,watch}=useForm<IReviewData>({defaultValues: {
        rating: 1,
      }})

const labels: { [index: string]: string } = {
  0.5: t("room.0.5"),
  1: t("room.1"),
  1.5: t("room.1.5"),
  2: t("room.2"),
  2.5: t("room.2.5"),
  3: t("room.3"),
  3.5: t("room.3.5"),
  4: t("room.4"),
  4.5: t("room.4.5"),
  5: t("room.5"),
  };
  
 
    const [hover, setHover] = React.useState(-1);
    const ratingValue = watch("rating")

    const onSubmit=async(values:IReviewData)=>{
      values.roomId=roomId
        console.log(values)
        try {
            const {data}=await axiosPrivateInstance.post(PORTAL_URLS.CREATE_REVIEW,values)
            toast.success(data?.message)
            console.log(data)
        } catch (error) {
            console.log(error)
            if(error instanceof AxiosError){
              toast.error(error?.response?.data.message||'Something Went Wrong')
            }
        }
    }
  return <>

  {/* <Grid size={{md:6,xs:12}}> */}
  
   <Typography>{t("room.Message")}</Typography>
  <form onSubmit={handleSubmit(onSubmit)}>
  <Box sx={{ width: 200, display: 'flex', alignItems: 'center',mb:"27px" }}>
    {/* rating */}
  <Controller
          name="rating"
          control={control}
          rules={Room_Rate_Validation(t)}

          render={({ field }) => (
            <Rating
              {...field}
              precision={0.5}
              value={field.value}
              onChange={(_event, newValue) => {
                console.log(newValue)
                field.onChange(newValue);
              }}
              onChangeActive={(_event, newHover) => {
                // console.log(newHover)
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
          )}
        />

        {/* Display label */}
        {ratingValue !== null && (
          <Typography sx={{ ms: 2 }}>
            {labels[(hover !== -1 ? hover : ratingValue) as keyof typeof labels]}
          </Typography>
        )}
    </Box>
    {errors.rating&& <Typography sx={{color:"#d32f2f"}}>*{errors.rating.message}</Typography>}


    <TextField
{...register("review",Room_Rewiew_Validation(t))}
          fullWidth
          multiline
          rows={5}
        />
        {errors.review&& <Typography sx={{color:"#d32f2f"}}>*{errors.review.message}</Typography>}
        <Button variant="contained" type="submit" 
         startIcon={ isSubmitting ? <CircularProgress color="inherit" size={20} /> : null} 
         disabled={isSubmitting} sx={{mt:"20px",width:"210px",height:"50px"}}>{isSubmitting?t("room.Rating..."):t("room.Rate")}</Button>
  </form>


  </>;
}
