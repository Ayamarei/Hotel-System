// import { Box, Button, FilledInput, Modal, Typography } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';
// import { useForm } from "react-hook-form";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   borderRadius: '16px',
// // textAlign:"center",
//   boxShadow: 24,
//   p: 4,
// };
// type IFacilityFormValues = {
//   name: string;
// };



// export default function FacilitiesData({open,setOpenAddModal,onSubmit}:{
//   open:boolean,
//   setOpenAddModal:(open:boolean)=>void,
//   onSubmit:  (data: { name: string }) => Promise<void>
 
// }) {

//     const handleClose = () => setOpenAddModal(false);
//     const {
//       register,
//       handleSubmit,
//       formState: { isSubmitting }
//     } = useForm<IFacilityFormValues>();
    
//   return (
//     <>
      
//        <Modal
//               open={open}
//               onClose={handleClose} 
//               aria-labelledby="modal-modal-title"
//               aria-describedby="modal-modal-description"
//             >

       
//               <Box sx={style}>

//               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography>Add Facility</Typography>
//             <CloseIcon 
//               sx={{ color: "black", cursor: 'pointer' }} 
//               onClick={handleClose} 
//             />
//           </Box>       
             
//                <form  onSubmit={handleSubmit(onSubmit)}>
//                < FilledInput {...register("name")} placeholder="Name" sx={{width:"100%",my:"20px"}}/>
//                <Box  sx={{mt:"24px",width:"30%" , backgroundColor: "#203FC7" , display: 'flex',alignItems:"center " ,justifyContent:"center"}}>
//                 <Button disabled={isSubmitting} variant='outlined' sx={{color:"#fff"}}
//                       //  startIcon={isSaving ? <CircularProgress color="inherit" size={20} /> : null}
//                  type="submit">{isSubmitting?"Saveing..." :"save"}</Button>
//                  </Box>
//                 </form>
//                </Box>
        
//             </Modal>
//     </>
//   )
// }


import { useEffect } from 'react';
import { Box, Button, FilledInput, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import { IFacility } from '../../Interfaces/FacilitesInterface';

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

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>{facility ? "Edit Facility" : "Add Facility"}</Typography>
          <CloseIcon sx={{ color: "black", cursor: 'pointer' }} onClick={handleClose} />
        </Box>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FilledInput {...register("name")} placeholder="Name" sx={{ width: "100%", my: "20px" }} />
          <Box sx={{ mt: "24px", width: "30%", backgroundColor: "#203FC7", display: 'flex', alignItems: "center", justifyContent: "center" }}>
            <Button disabled={isSubmitting} variant='outlined' sx={{ color: "#fff" }} type="submit">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
