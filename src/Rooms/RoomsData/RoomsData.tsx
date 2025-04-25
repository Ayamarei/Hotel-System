import { Box, Button, CircularProgress, FilledInput, FormControl, Grid, IconButton, InputLabel, MenuItem,  Select, Typography } from "@mui/material";
import  { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import {useDropzone} from 'react-dropzone'

  import { Link,  useNavigate, useParams } from "react-router-dom";
  import { toast } from "react-toastify";


import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import { useTranslation } from "react-i18next";
import CustomInput from "../../Modules/Shared/CustomInput/CustomInput";
import Loading from "../../Modules/Shared/Loading/Loading";
import { ROOMS_URLS } from "../../Services/Urls";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import { IFacilities_Room_Response, IFacility_Room, IRoom_Id_Response, IRoomCreation, IRoomSubmit } from "../../Interfaces/RoomInterface";
import { Capacity_Validation, Discount_Validation, Facilities_Validation, RoomNumber_Validation, RoomPrice_Validation } from "../../Services/Validation";


export default function RoomsData() {

  const {roomId}=useParams<{roomId:string}>()
  const [loading,setIsLoading]=useState<boolean>(roomId?true:false)
  const {t}=useTranslation()
  const{register,handleSubmit,formState:{errors,isSubmitting},setValue,control}= useForm<IRoomSubmit>( 
    {defaultValues: {
    facilities: []
  },
  mode:'onChange'
})
  const [facilities,setFacilities]=useState<IFacility_Room[]>([])
  const [files,setFiles]=useState<File[]>([])
  const navigate=useNavigate()



  const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





  const onSubmit=async(values:IRoomSubmit)=>{
    try {
   console.log(values)

   const formData = new FormData();
   if (files.length>0){
    files.forEach(file=> formData.append('imgs',file))  
  }


  Object.entries(values).forEach(([key,value])=>{
    if (key==='facilities'){
      values[key].forEach(faciliy=>formData.append('facilities[]',faciliy))
    }else{
         formData.append(key, value);
  
    }
  })

   for(let [key,value] of formData.entries()){
    console.log(key,value)
   }
  
      const { data } =roomId?
      await privateUserAxiosInstance.put(ROOMS_URLS.UPDATE_ROOM(roomId),formData)
    :await privateUserAxiosInstance.post<IRoomCreation>(ROOMS_URLS.CREATE_ROOM, formData);

  toast.success(data?.message)
  navigate("/dashboard/rooms")
    // console.log("Room created:", data);
      } catch (error) {
      console.error("Error during room creation:", error);
    }
  }




  const { getRootProps, getInputProps ,isDragActive} = useDropzone({
    accept: { 'image/*': [] }, 
    // on drag imags 
    onDrop: (acceptedFiles) => {
    if (acceptedFiles.length>0){
      setFiles((prev)=>[...prev,...acceptedFiles]);

    }
    },
  });


// get all facilities
  const getAllFacilities=async()=>{
    try {
      const {data}=await privateUserAxiosInstance.get<IFacilities_Room_Response>(ROOMS_URLS.GET_FACILITIES_ROOM,{
        params:{
          page:1,
          size:1000
        }
      })
      setFacilities(data?.data?.facilities)
    } catch (error) {
      console.log(error)
    }
  }


  // useeffect
  useEffect(() => {
    (async () => {
      await getAllFacilities();
  
      if (roomId) {
        try {
          setIsLoading(true)
          const { data } = await privateUserAxiosInstance.get<IRoom_Id_Response>(ROOMS_URLS.GET_ROOM(roomId));
          const room=data?.data?.room
          setValue('capacity', room?.capacity);
          setValue('discount', room?.discount);
          setValue('price', room?.price);
          setValue('roomNumber', room?.roomNumber);
         setValue('facilities',  room?.facilities.map(facility => facility._id))
         if (data?.data?.room?.images.length>0){
          // You want to wait for all those image fetches to finish before calling setFiles(files).
         const files = await Promise.all(
             room?.images.map(async (img) => {
              // for each image we create file
               const res = await fetch(img);
               const blob = await res.blob();
               return new File([blob], img, { type: blob.type }); 
              
              })
            );
            setFiles(files)
          }
  
        } catch (error) {
          console.log('Error fetching room:', error);
        }finally{
          setIsLoading(false)
        }
      }
    })();
  }, []);



  return <>
  <Grid container spacing={2}sx={{display:"flex",justifyContent:"center"}}>
  <Grid size={{md:8,xs:12}} sx={{display:"flex",justifyContent:{md:'center'},alignItems:'center'}}>
{loading?<Loading/>: 
 <form
  onSubmit={handleSubmit(onSubmit)}
  style={{width:"100%"}}>
      {/* room number field */}
      <CustomInput
  type="number"
  placeholder={t("room.EnterRoomNumber")}
  register={register}
  name="roomNumber"
  rules={RoomNumber_Validation(t)}
  error={errors.roomNumber?.message}
/>


   {/* price +capacity */}
    <Grid size={12} sx={{display:"flex",justifyContent:"space-between",width:"100%",flexDirection:{xs:"column",md:"row"}}}>
    <Grid size={{xs:12,md:6}} sx={{display:"flex",flexDirection:"column"}}>
    <CustomInput
  type="number"
  placeholder={t("room.Price")}
  register={register}
  name="price"
  rules={{
    ...RoomPrice_Validation(t),
    validate: {
      isPositive: value => Number(value) > 0 || t("room.PricePositive") 
    },
  }}
  error={errors.price?.message}
/>
  
        </Grid>
      
      <Grid size={{xs:12,md:6}} sx={{display:"flex",flexDirection:"column"}}>
      <CustomInput
  type="number"
  placeholder={t("room.Capacity")}
  register={register}
  name="capacity"
  rules={Capacity_Validation(t)}
  error={errors.capacity?.message}
/>
      
        </Grid>
    </Grid>
{/* discount+facilities */}
<Grid size={12} sx={{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",flexDirection:{xs:"column",md:"row"}}}>
    <Grid size={{xs:12,md:6}} sx={{display:"flex",flexDirection:"column "}}>
    <CustomInput
  type="number"
  placeholder={t("room.Discount")}
  register={register}
  name="discount"
  rules={Discount_Validation(t)}
  error={errors.discount?.message}
/>
    
        </Grid>
      <Grid size={{xs:12,md:6}} sx={{display:"flex",justifyContent:"center",alignItems:'center'}}>

 {/* multiable selection  */}
   
<FormControl fullWidth variant="filled" sx={{ mb: 2 }}>
  <InputLabel id="demo-multiple-name-label">{t("room.SelectFacilities")}</InputLabel>
  
  <Controller
    name="facilities"
    control={control}
    
    rules={Facilities_Validation(t)}
    render={({ field }) => (
      <Select
   
        multiple
        {...field}
        input={<FilledInput />}
        MenuProps={MenuProps}
      >
        {facilities.map((facility) => (
          <MenuItem key={facility._id} value={facility._id}>
            {facility.name}
          </MenuItem>
        ))}
      </Select>
    )}
  />

  {errors.facilities && (
    <Typography sx={{ color: 'red', mt: '10px' }}>
      *{errors.facilities.message}
    </Typography>
  )}
</FormControl>


        </Grid>
    </Grid>


{/* imgs upload */}
<Box {...getRootProps()} sx={{
  border:'1px dotted rgba(0, 146, 71, 1)',
  height:"140px",
  backgroundColor:"rgba(241, 255, 240, 1)",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  mt:"20px",
  borderRadius:"8px",
  flexDirection:"column",
  cursor:"pointer"
}}>
<input {...getInputProps()} />
<FileUploadIcon sx={{width:'36px'}}/>
      {
        isDragActive ?
          <Typography>Drop the files here ...</Typography> :
          <Typography>{t("room.Drop")}</Typography>
      }
    
</Box>

{/* images to show  */}
<Box sx={{ display: "flex", gap: "10px", marginTop: "20px", flexWrap: "wrap" }}>
        {files?.map((file, idx) => (
       
        <Box sx={{position:"relative",width:"150px",height:'150px',borderRadius:"8px"}}>
        <img
        src={URL?.createObjectURL(file)}
        alt={file?.name}
        width={'100%'}
        height={'100%'}
        style={{objectFit:"cover",borderRadius:"8px"}}
        />



<IconButton
  onClick={() => setFiles((prev) => prev.filter((_, i) => i !== idx))}
  sx={{
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(255,255,255,0.8)",
    color: "#333",
    borderRadius: "50%",
    width: "28px",
    height: "28px",
    padding: "4px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "rgba(255,0,0,0.8)",
      color: "#fff",
    },
  }}
>
  <CloseIcon fontSize="small" />
</IconButton>
        </Box>
        ))}
      </Box>
    <Box sx={{display:"flex",justifyContent:"flex-end",mt:"20px",gap:"10px"}}>
      <Button variant="outlined" component={Link} to={'/dashboard/rooms'} sx={{color:"rgba(32, 63, 199, 1)",borderColor:"rgba(32, 63, 199, 1)"}}>
      {t("room.cancel")}</Button>
      
  {roomId?    <Button variant="contained"     
       startIcon={isSubmitting ? <CircularProgress color="inherit" size={20} /> : null}
       sx={{bgcolor:"rgba(32, 63, 199, 1)"}} type="submit">{isSubmitting?t("room.Editing"):t("room.EditRoom")}</Button>:
       <Button variant="contained"     
       startIcon={isSubmitting ? <CircularProgress color="inherit" size={20} /> : null}
       sx={{bgcolor:"rgba(32, 63, 199, 1)"}} type="submit">{isSubmitting?t("room.Adding"):t("room.AddRoom")}</Button>
       }
    </Box>
    </form>}
  </Grid>

</Grid>
   
  </>
}

