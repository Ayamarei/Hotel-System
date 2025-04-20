
import * as React from 'react';
import Button from '@mui/material/Button';
import ChangePasswordModal from '../../Shared/Change-Password-modal/Change-Password-modal';



export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    
      <Button onClick={handleOpen}>Change Password</Button>
      <ChangePasswordModal handleClose={handleClose} open={open}></ChangePasswordModal>
   
    </>
  );
}

