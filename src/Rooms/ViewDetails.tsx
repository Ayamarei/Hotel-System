import { Box, Button, Modal, Typography } from "@mui/material";

  import CloseIcon from '@mui/icons-material/Close';
  import noimg from '../assets/images/no-img.jpeg'
import { IRoomData } from "../Interfaces/RoomInterface";

  
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:700,
    bgcolor: 'background.paper',
  color:"black",
    boxShadow: 24,
    p: 4,
  
  };
export default function ViewDetails({handleCloseModal,openModal,room}:

  {handleCloseModal:()=>void,
    openModal:boolean,
    room?:IRoomData,

  }) {

   
  return <>
  <Modal
          open={openModal}
          onClose={handleCloseModal}
        >
          <Box sx={style}>
       {room&&<>
        <Box sx={{display:"flex",justifyContent:'space-between',mb:"30px"}}>
          <Typography  variant="h6" component="h2" >
             Room Number: {room?.roomNumber}
            </Typography>
         <Box component={'button'} sx={{backgroundColor:"transparent",border:"none",cursor:"pointer"}} onClick={handleCloseModal}>
             <CloseIcon /></Box>
          </Box>

          <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Box sx={{width:'50%'}}>
       <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Price:</Typography>  {room?.price} EGP
         </Typography>
          <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Capacity:</Typography>  {room?.capacity}
         </Typography>
          <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Discount:</Typography>  {room?.discount}%
         </Typography>
          <Typography sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Created By:</Typography>  {room?.createdBy.userName}
         </Typography>
          <Typography sx={{ mt: 2 }} component={'div'}>
          <Typography component={'span'} sx={{fontWeight: 700}}>Facilities:</Typography> 
{room?.facilities && room.facilities.length > 0 ? (
  room.facilities.map(facility => (
    <Box key={facility._id}>
      {' '}<Typography>{facility.name}</Typography>
    </Box>
  ))
) : (
  <Typography>No facilities available</Typography>
)}
         </Typography>
       </Box>
       <Box sx={{width:"50%"}}>
       <Typography>Images:</Typography>
       <Box sx={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
       {room?.images && room.images.length > 0 ? 
  room.images.map(img => (
 
  <img src={img}  
   style={{ objectFit: 'cover', borderRadius: '8px' }}
  height={120} width={120} />

  ))
 : (
  <img src={noimg}
     style={{ objectFit: 'cover', borderRadius: '8px' }}
  height={120} width={120} />
)}
       </Box>
       </Box>
      
          </Box>
       </>}
       
       

          <Box sx={{mt:'20px',display:"flex",justifyContent:"flex-end"}}>  <Button onClick={handleCloseModal} variant='outlined' >Close</Button></Box>
          </Box>
        </Modal>
  </>;
}
