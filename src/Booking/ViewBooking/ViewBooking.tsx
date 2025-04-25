import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { IBookingData } from "../../Interfaces/BookingData";


  
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
export default function ViewDetails({handleCloseModal,openModal,booking}:

  {handleCloseModal:()=>void,
    openModal:boolean,
    booking?:IBookingData,

  }) {

   
  return <>
  <Modal
          open={openModal}
          onClose={handleCloseModal}
        >
          <Box sx={style}>
    

    {booking&&<>
        <Box sx={{display:"flex",justifyContent:'space-between',mb:"30px"}}>
          <Typography  variant="h6" component="h2" >
             Room Number: {booking?.room?.roomNumber}
          </Typography>
          <Box component={'button'} sx={{backgroundColor:"transparent",border:"none",cursor:"pointer"}} onClick={handleCloseModal}>
             <CloseIcon /></Box>
          </Box>

          <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Box sx={{width:'50%'}}>
       <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Total Price:</Typography>  {booking?.totalPrice} EGP
         </Typography>
          <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Start Date:</Typography>  {new Date(booking?.startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
         </Typography>
          <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>End Date:</Typography>  {new Date(booking?.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
         </Typography>
          <Typography sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>User:</Typography>  {booking?.user.userName}
         </Typography>
        
       </Box>
       </Box>
      
       
       </>}
       
       

          <Box sx={{mt:'20px',display:"flex",justifyContent:"flex-end"}}>  <Button onClick={handleCloseModal} variant='outlined' >Close</Button></Box>
          </Box>
        </Modal>
  </>;
}
