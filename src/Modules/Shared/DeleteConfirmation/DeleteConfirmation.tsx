
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import deleteImg from '../../assets/images/delete.png'
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, CircularProgress } from '@mui/material';
 
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

export default function DeleteConfirmation({open,setOpen,deleteFun,isDeleting}:
  {open:boolean,
    setOpen:(open:boolean)=>void,
    deleteFun:() => Promise<void>,
    isDeleting:boolean}) {

  const handleClose = () => setOpen(false);

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
        sx={{ color: "black", cursor: 'pointer' }} 
        onClick={handleClose} 
      />
    </Box>       
       
         <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}}>
         <Avatar src={deleteImg} sx={{width:"128px",height:"128px"}}/>
          <Typography id="modal-modal-description" sx={{ mt: 2,color:"rgba(73, 73, 73, 1)" }}>
          Delete This Room?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 ,color:'rgba(73, 73, 73, 0.6)'}}>
          Are you sure you want to delete this item? If you are sure, just click on delete.
          </Typography>
          <Button variant='outlined'
                startIcon={isDeleting ? <CircularProgress color="inherit" size={20} /> : null}
          
           disabled={isDeleting} sx={{mt:"24px"}} color="error" onClick={deleteFun}>{isDeleting?"Deleting...":'delete'}</Button>
          </Box>
         </Box>
  
      </Modal>
    </>
  );
}
