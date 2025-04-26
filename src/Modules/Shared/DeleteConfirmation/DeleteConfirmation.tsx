
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import deleteImg from '../../../assets/images/delete.png'
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, CircularProgress } from '@mui/material';
import { ThemeContext } from '../../../context/ThemeContext';
import { useContext } from 'react';
import { THEMECOLOR } from '../../../Services/ThemeColors';
 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '16px',
// textAlign:"center",
  boxShadow: 24,
  p: 4,
};



export default function DeleteConfirmation({open,setOpen,deleteFun,isDeleting,item}:
  {open:boolean,
    setOpen:(open:boolean)=>void,
    deleteFun:() => Promise<void>,
    isDeleting:boolean,
    item:string
  }) {

  const handleClose = () => setOpen(false);
    const ContextColor = useContext(ThemeContext);
      if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
      const { theme } = ContextColor;
  return (
    <>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

  
 
        <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <CloseIcon 
        sx={{cursor: 'pointer',color: theme === 'dark' ?  THEMECOLOR.mainRed:"black",}} 
        onClick={handleClose} 
      />
    </Box>       
       
         <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
         <Avatar src={deleteImg} sx={{width:"128px",height:"128px"}}/>
          <Typography id="modal-modal-description" sx={{ mt: 2 ,color: theme === 'dark' ?  THEMECOLOR.mainRed :" rgba(73, 73, 73, 1)" ,}}>
          Delete This {item}?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 ,color: theme === 'dark' ?  "white":" rgba(73, 73, 73, 1)" ,}}>
          Are you sure you want to delete this item? If you are sure, just click on delete.
          </Typography>

           <Button
              variant="outlined"
              startIcon={isDeleting ? <CircularProgress color="inherit" size={20} /> : null}
              disabled={isDeleting}
              sx={{
                mt: "24px",
                color: "error.main", 
                borderColor: "error.main",
                "&:hover": {
                  backgroundColor: "error.main",
                  color: "white",
                  borderColor: "error.main",
                },
              }}
              onClick={deleteFun}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>

          </Box>
         </Box>
  
      </Modal>
    </>
  );
}
