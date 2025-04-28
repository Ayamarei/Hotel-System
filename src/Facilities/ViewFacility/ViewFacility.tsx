import { Box, Button, Modal, Typography } from "@mui/material";
import { IFacility } from "../../Interfaces/FacilitesInterface";
import { THEMECOLOR } from "../../Services/ThemeColors";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  gap: 2,
};

export default function ViewFacility({ open, setOpenViewModal, facility, handleCloseModal }: {
  open: boolean,
  setOpenViewModal: (open: boolean) => void,
  facility?: IFacility | null,
  handleCloseModal: () => void
}) {

  const handleClose = () => setOpenViewModal(false);
  const ContextColor = useContext(ThemeContext);
  if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
  const { theme } = ContextColor;

  const labelColor = theme === 'dark' ? THEMECOLOR.mainBlue : 'black'; 
  

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography >
          <Box component="span" sx={{ fontWeight: '900', color: labelColor }}>ID:</Box> {facility?._id}
        </Typography>
        <Typography>
          <Box component="span" sx={{ fontWeight: '900', color: labelColor }}>Name:</Box> {facility?.name}
        </Typography>
        <Typography>
          <Box component="span" sx={{ fontWeight: '900', color: labelColor }}>Created By:</Box> {facility?.createdBy.userName}
        </Typography>
        <Typography>
          <Box component="span" sx={{ fontWeight: '900', color: labelColor }}>Created At:</Box> {facility?.createdAt}
        </Typography>
        <Typography>
          <Box component="span" sx={{ fontWeight: '900', color: labelColor }}>Updated At:</Box> {facility?.updatedAt}
        </Typography>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={handleCloseModal}
            sx={{
              color: theme === 'dark' ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
              borderColor: theme === 'dark' ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
              '&:hover': {
                backgroundColor: theme === 'dark' ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                color: 'white',
                borderColor: theme === 'dark' ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
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
  );
}
