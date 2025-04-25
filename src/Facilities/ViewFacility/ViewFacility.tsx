import { Box, Button, Modal, Typography } from "@mui/material";
import { IFacility } from "../../Interfaces/FacilitesInterface";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '16px',
  boxShadow: 24,
  p: 4,
};

export default function ViewFacility({ open, setOpenViewModal, facility,handleCloseModal }: {
  open: boolean,
  setOpenViewModal: (open: boolean) => void,
  facility?: IFacility | null,
  handleCloseModal:()=>void
}) {

  const handleClose = () => setOpenViewModal(false);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography>
          <Typography component="span" sx={{ fontWeight: '900', color: 'primary.main' }}>ID</Typography>: {facility?._id}
        </Typography>
        <Typography><Typography component="span" sx={{ fontWeight: '900', color: 'primary.main' }}>Name</Typography>: {facility?.name}</Typography>
        <Typography><Typography component="span" sx={{ fontWeight: '900', color: 'primary.main' }}>Created By</Typography>: {facility?.createdBy.userName}</Typography>
        <Typography><Typography component="span" sx={{ fontWeight: '900', color: 'primary.main' }}>Created At</Typography>: {facility?.createdAt}</Typography>
        <Typography><Typography component="span" sx={{ fontWeight: '900', color: 'primary.main' }}>Updated At</Typography>: {facility?.updatedAt}</Typography>
        <Button variant='outlined'   sx={{mt:"24px"}}  onClick={handleCloseModal}>Close </Button>
      </Box>
    </Modal>
  );
}
