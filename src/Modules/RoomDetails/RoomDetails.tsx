import { useEffect, useState } from "react";
import {   useParams } from "react-router-dom";
// import { axiosPuplicInstance } from "../../../../services/api/apiInstance";
import { Breadcrumbs, Container, Grid, Typography,Link, Box, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IRoomDetails, IRoomDetailsResponse } from "../../Interfaces/RoomDetailsInterface";
import Loading from "../Shared/Loading/Loading";
import RoomComment from "./RoomComment";
import RoomBooking from "./RoomBooking";
import RoomDescription from "./RoomDescription";
import RoomRating from "./RoomRating";


export default function RoomDetails() {
 const {roomId}=useParams()
 const [room, setRoom] = useState<IRoomDetails|null>(null);
 const [loading,setLoading]=useState(false)
 const {t}=useTranslation()
// get room details
const getRoom = async () => {
  setLoading(true);
  if (roomId) {
  try {
      const { data } = await axiosPuplicInstance.get<IRoomDetailsResponse>(
        PORTAL_URLS.GET_ROOM_DETAILS(roomId)
      );
      setRoom(data?.data?.room);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
};

useEffect(()=>{
getRoom()
    },[roomId])
  return <>
  {loading?<Loading/>:<>
    <Container maxWidth={'lg'} sx={{mt:"50px",display:"flex",alignItems:"center"}}>
<div role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
       
        <Link
          // color="inherit"
          sx={{color:'#0009',fontSize:"18px",fontWeight:300,textDecoration:"none"}}
          href="/"
        >
        {t("room.Home")}
        </Link>
        <Typography sx={{ color: '#152c5b',fontWeight:700,fontSize:"18px" }}>{t("room.RoomDetails")}</Typography>
      </Breadcrumbs>
    </div>
   <Box sx={{marginLeft: "auto", marginRight: "auto",textAlign:"center"}}> <Typography 
   sx={{  textAlign: "center" ,color:"#152c5b",fontWeight:600,fontSize:'34px'}}>{room?.roomNumber}</Typography>
   <Typography component={'span'} sx={{  color:"rgba(176, 176, 176, 1)",fontWeight:300,fontSize:'18px'}}>{t("room.BogorIndonesia")}</Typography></Box>
</Container>

<Container maxWidth={'lg'}sx={{mt:"50px",display:"flex",flexDirection:{md:"row",xs:"column"},justifyContent:"center",gap:"10px"}}>
<Box component={'img'}  src={room?.images[0]} sx={{height:500,borderRadius:"15px",objectFit:"cover"}}></Box>
<Stack direction={'column'} sx={{gap:'10px'}}>
<Stack direction={{md:"row",xs:"column"}} sx={{gap:'10px'}}>
<Box component={'img'} src={room?.images[1]} sx={{height:room?.images[1]?250:'',objectFit:"cover",borderRadius:"15px",width:{md:"50%",xs:"100%"}}} ></Box>
<Box component={'img'} src={room?.images[2]} sx={{height:room?.images[2]?250:"",objectFit:"cover",borderRadius:"15px",width:{md:"50%",xs:"100%"}}}></Box>

</Stack>
<Stack direction={{md:"row",xs:"column"}} sx={{gap:'10px'}}>
<Box component={'img'} src={room?.images[3]} sx={{height:room?.images[3]?250:"",objectFit:"cover",borderRadius:"15px",width:{md:"50%",xs:"100%"}}}></Box>
<Box component={'img'} src={room?.images[4]} sx={{height:room?.images[4]?250:"",objectFit:"cover",borderRadius:"15px",width:{md:"50%",xs:"100%"}}}></Box>

</Stack>
</Stack>
</Container>


<Container maxWidth={'lg'} sx={{mt:"50px",display:"flex",gap:"10px",justifyContent:"space-between",flexDirection:{md:"row",xs:"column"}}}>
 <RoomDescription/>
{room&& <RoomBooking room={room}/>}
</Container>
{/* room rating+room comment */}
<Container maxWidth={'lg'} sx={{mt:"50px",border:"1px solid rgba(229, 229, 229, 1)",borderRadius:"15px", p:4}} >
 {localStorage.getItem('token')?  <Grid container spacing={3}>
     <Grid size={{md:6,xs:12}}>
       <Typography sx={{mb:"20px"}}>{t("room.Rate")}</Typography>
{roomId && <RoomRating roomId={roomId}/>}
      </Grid>
      <Grid size={{md:6,xs:12}}>

{roomId && <RoomComment roomId={roomId}/>}
      </Grid>

  
      </Grid>:<Box sx={{textAlign:'center'}}>
        <Typography sx={{color:"#555",fontWeight:500,fontSize:'20px'}}>{t("room.MustLoginIN")}</Typography>
        <Typography sx={{color:"#555",fontWeight:500,fontSize:'20px'}}>{t("room.YouCan")} <Link sx={{color:"#152c5b",textDecoration:"none"}} href='/auth/login'>{t("room.Login")}</Link> {t("room.Or")} <Link sx={{color:"#152c5b",textDecoration:"none"}} href='/auth/register'>{t("room.Register")}</Link></Typography>
        </Box>}
</Container>

  
  </>}

  </>;
}
