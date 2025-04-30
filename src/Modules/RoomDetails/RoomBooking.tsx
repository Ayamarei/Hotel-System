import { Box, Button, Typography } from "@mui/material";
// import { IRoomDetails } from "../../../../interfaces/RoomDetailsInterface";
import { useTranslation } from "react-i18next";
import { IRoomDetails } from "../../Interfaces/RoomDetailsInterface";

export default function RoomBooking({room}:{room:IRoomDetails}) {
  const totalPay = room ? room.price - (room.discount / 100) * room.price : 0;
  const {t}=useTranslation()
  return <>
   <Box sx={{width:{md:"49%",xs:"100%"},borderRadius:"8px",border:"1px solid rgba(229, 229, 229, 1)",display:"flex",alignItems:"center",flexDirection:"column"}}>
<Box sx={{py:'30px'}}>
<Typography sx={{color:'rgba(21, 44, 91, 1)',fontWeight:700,fontSize:"20px"}}>{t("room.StartBooking")}</Typography>
<Typography component={'p'} sx={{fontSize:'40px',color:"#1abc9c"}}>{room?.price} {t("room.EGP")} <Typography component={'span'} sx={{fontSize:"40px",color:"#b0b0b0"}}>{t("room.perNight")}</Typography></Typography>
<Typography sx={{color:"rgba(255, 22, 18, 1)",fontWeight:600}}> {t("room.Discount")} {room?.discount}% {t("room.Off")} </Typography>
</Box>

{/* input */}
<Typography component="div" sx={{ color: "#b0b0b0" ,fontWeight:400}}>
  {t("room.Youwillpay")}{" "}
  <Box component="span" sx={{ color: "#152c5b", fontWeight: 600 ,fontSize:"19px"}}>
    {totalPay} {t("room.EGP")}
  </Box>{" "}
  {t("room.for")}{" "}
  <Box component="span" sx={{ color: "#152c5b", fontWeight: 600 ,fontSize:"19px"}}>
    {1} {t("room.Person")}
  </Box>
</Typography>
<Button variant="contained" sx={{mt:'12px'}}>{t("room.continueBooking")}
</Button>
</Box>
  </>;
}
