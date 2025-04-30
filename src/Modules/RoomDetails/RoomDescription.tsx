import { Box, Grid, Typography } from "@mui/material";
// import { IDesc } from "../../../../interfaces/RoomDetailsInterface";
import bedimg from '../../assets/images/ic_bedroom.png'
import livimg from '../../assets/images/ic_livingroom.png'
import bathimg from '../../assets/images/ic_bathroom.png'
import dingimg from '../../assets/images/ic_diningroom.png'
import wifiimg from '../../assets/images/ic_wifi.png'
import unitsimg from '../../assets/images/ic_ac.png'
import refimg from '../../assets/images/ic_kulkas.png'
import tvimg from '../../assets/images/ic_tv.png'
import { useTranslation } from "react-i18next";

export default function RoomDescription() {
  const {t}=useTranslation()

  const details = [
    { img: bedimg, number: "5", desc: t('room.Bedrooms') },
    { img: livimg, number: "1", desc: t('room.LivingRoom') },
    { img: bathimg, number: "3", desc: t('room.Bathrooms') },
    { img: dingimg, number: "1", desc: t('room.DiningRoom') },
    { img: wifiimg, number: "10", desc: t('room.Wifi') },
    { img: unitsimg, number: "7", desc: t('room.UnitsReady') },
    { img: refimg, number: "2", desc: t('room.Refrigerators') },
    { img: tvimg, number: "4", desc: t('room.Televisions') }
  ];
  return <>
   <Box sx={{ width: { xs: '100%', md: '49%' } }}>
<Typography sx={{color:"#b0b0b0",fontWeight:300,fontSize:'18px',mb:'10px'}}>{t("room.RoomDesc1")}</Typography>
<Typography sx={{color:"#b0b0b0",fontWeight:300,fontSize:'18px',mb:"10px"}}>{t("room.RoomDesc2")}</Typography>
<Typography sx={{color:"#b0b0b0",fontWeight:300,fontSize:'18px'}}>{t("room.RoomDesc3")}</Typography>

<Grid container  sx={{display:"flex",mt:"20px"}}>
 {details.map(detail=>   <Grid size={{md:3,xs:6}} component={ 'div'} sx={{mb:'20px'}} >
        <Box component={'img'} src={detail.img} sx={{objectFit:"cover"}}></Box>
        <Typography component={'p'} sx={{color:"#000",fontWeight:700,fontSize:"20px"}}>{detail.number} <Typography component={'span'} sx={{color:"#757575",}}>{detail.desc}</Typography> </Typography>
    </Grid>)}

</Grid>
  </Box>
  </>;
}
