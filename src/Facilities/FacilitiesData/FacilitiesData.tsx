import { useContext, useEffect } from 'react';
import { Box, Button, FilledInput, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { IFacility } from '../../Interfaces/FacilitesInterface';
import { THEMECOLOR } from '../../Services/ThemeColors';
import { ThemeContext } from '../../context/ThemeContext';

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

type IFacilityFormValues = {
  name: string;
};

export default function FacilitiesData({ open, setOpenAddModal, onSubmit, onEdit, facility }: {
  open: boolean,
  setOpenAddModal: (open: boolean) => void,
  onSubmit: (data: { name: string }) => Promise<void>,
  onEdit?: (id: string, data: { name: string }) => Promise<void>,
  facility?: IFacility | null
}) {
  const handleClose = () => setOpenAddModal(false);
  const { register, handleSubmit, setValue, formState: { isSubmitting } } = useForm<IFacilityFormValues>();

  useEffect(() => {
    if (facility) {
      setValue("name", facility.name);
    }
  }, [facility, setValue]);

  const handleFormSubmit = (data: IFacilityFormValues) => {
    if (facility) {
      return onEdit!(facility._id, data);
    }
    return onSubmit(data);
  };
  const ContextColor = useContext(ThemeContext);
  if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
  const { theme } = ContextColor;
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontWeight="bold" fontSize="20px">
            {facility ? "Edit Facility" : "Add Facility"}
          </Typography>
          <CloseIcon sx={{ color:theme === 'dark' ? THEMECOLOR.mainBlue : "dark", cursor: 'pointer' }} onClick={handleClose} />
        </Box>
        <form onSubmit={handleSubmit(handleFormSubmit)} style={{ marginTop: '20px' }}>
          <FilledInput {...register("name")} placeholder="Name" sx={{ width: "100%", mb: 3 }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              disabled={isSubmitting}
              variant="outlined"
              type="submit"
              sx={{
                color: "#203FC7", 
                borderColor: "#203FC7", 
                fontWeight: 'bold',
                fontSize: '16px',
                padding: '10px 30px',
                borderRadius: '10px',
                textTransform: 'capitalize',
                '&:hover': {
                  backgroundColor: "#203FC7", 
                  color: "#fff",
                  borderColor: "#203FC7",
                },
              }}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </Box>

        </form>
      </Box>
    </Modal>
  );
}
