import { Box, Button, Modal, Typography } from "@mui/material";

  import CloseIcon from '@mui/icons-material/Close';
  import noimg from '../../assets/images/no-img.jpeg'
import { IUserData } from "../../Interfaces/UserData";


  
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
export default function ViewUser({handleCloseModal,openModal,user}:

  {handleCloseModal:()=>void,
    openModal:boolean,
    user?:IUserData,

  }) {

   
  return <>
  <Modal
          open={openModal}
          onClose={handleCloseModal}
        >
          <Box sx={style}>
       {user&&<>
        <Box sx={{display:"flex",justifyContent:'space-between',mb:"30px"}}>
          <Typography  variant="h6" component="h2" >
             user Name: {user?.userName}
            </Typography>
         <Box component={'button'} sx={{backgroundColor:"transparent",border:"none",cursor:"pointer"}} onClick={handleCloseModal}>
             <CloseIcon /></Box>
          </Box>

          <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Box sx={{width:'50%'}}>
       <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Email:</Typography>  {user?.email} 
         </Typography>
          <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Phone Number:</Typography>  {user?.phoneNumber}
         </Typography>
          <Typography  sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>Country:</Typography>  {user?.country}
         </Typography>
          <Typography sx={{ mt: 2 }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700}}>User Type:</Typography>  {user?.role}
         </Typography>
       
 
       </Box>
       <Box sx={{width:"50%",textAlign:'end'}}>
       <Typography>Profile Picture</Typography>
       <Box>
       {user?.profileImage ?
                
                <img src={user?.profileImage}  
                style={{ objectFit: 'cover', borderRadius: '8px' }}
                height={120} width={120} />

    
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
