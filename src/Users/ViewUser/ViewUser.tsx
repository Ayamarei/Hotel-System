import { Box, Button, Modal, Typography } from "@mui/material";

  import CloseIcon from '@mui/icons-material/Close';
  import noimg from '../../assets/images/no-img.jpeg'
import { IUserData } from "../../Interfaces/UserData";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { THEMECOLOR } from "../../Services/ThemeColors";


  
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
    borderRadius: '10px', 
  
  };
export default function ViewUser({handleCloseModal,openModal,user}:

  {handleCloseModal:()=>void,
    openModal:boolean,
    user?:IUserData,

  }) {

    const ContextColor = useContext(ThemeContext);
    if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
    const { theme } = ContextColor;
  return <>
  <Modal
          open={openModal}
          onClose={handleCloseModal}
        >
          <Box sx={style}>
       {user&&<>

          <Box sx={{ display: "flex", justifyContent: 'space-between', mb: "30px", color: theme === 'dark' ? 'white' : 'black' }}>
            <Typography variant="h6" component="h2">
              <Box component="span" sx={{ color: theme === 'dark' ? THEMECOLOR.mainBlue : 'black' }}>
                User Name:
              </Box>
              <Box component="span" sx={{ color: theme === 'dark' ? 'white' : 'black', ml: 1 }}>
                {user?.userName}
              </Box>
            </Typography>
            <Box component={'button'} sx={{ backgroundColor: "transparent", border: "none", cursor: "pointer",color: theme === 'dark' ? THEMECOLOR.mainBlue: 'black' }} onClick={handleCloseModal}>
              <CloseIcon />
            </Box>
          </Box>


          <Box sx={{display:"flex",justifyContent:"space-between"}}>
       <Box sx={{width:'50%'}}>
       <Typography  sx={{ mt: 2 ,color: theme === 'dark' ? 'white': 'black'}} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700,color: theme === 'dark' ? THEMECOLOR.mainBlue: 'black'}}>Email:</Typography>  {user?.email} 
         </Typography>
          <Typography  sx={{ mt: 2,color: theme === 'dark' ? 'white': 'black' }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700,color: theme === 'dark' ? THEMECOLOR.mainBlue: 'black'}}>Phone Number:</Typography>  {user?.phoneNumber}
         </Typography>
          <Typography  sx={{ mt: 2,color: theme === 'dark' ? 'white': 'black' }} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700,color: theme === 'dark' ? THEMECOLOR.mainBlue: 'black'}}>Country:</Typography>  {user?.country}
         </Typography>
          <Typography sx={{ mt: 2 ,color: theme === 'dark' ? 'white': 'black'}} component={'div'}>
         <Typography component={'span'} sx={{fontWeight:700,color: theme === 'dark' ? THEMECOLOR.mainBlue: 'black'}}>User Type:</Typography>  {user?.role}
         </Typography>
       
 
       </Box>
       <Box sx={{width:"50%",textAlign:'end',color: theme === 'dark' ? THEMECOLOR.mainBlue: 'black'}}>
       <Typography sx={{ mb: 1 ,fontWeight: 'bold'}}>Profile Picture</Typography>
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


            <Box sx={{ mt: '20px', display: "flex", justifyContent: "center" }}>
            <Button 
              onClick={handleCloseModal} 
              variant='outlined'
              sx={{
                color: theme === 'dark' ?  THEMECOLOR.mainBlue : THEMECOLOR.mainBlue ,
                borderColor: theme === 'dark' ?  THEMECOLOR.mainBlue :  THEMECOLOR.mainBlue,
                '&:hover': {
                  backgroundColor: theme === 'dark' ?  THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                  color: theme === 'dark' ? 'white' : 'white',
                  borderColor: theme === 'dark' ?  THEMECOLOR.mainBlue:  THEMECOLOR.mainBlue,
                },
                fontWeight: 'bold',
                borderRadius: '12px',
                padding: '10px 30px',
                fontSize: '16px',
                transition: '0.3s',
              }}
            >
              Close
            </Button>
          </Box>
          

          </Box>
        </Modal>
  </>;
}
