import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import noimg from '../../assets/images/no-img.jpeg';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  color: "black",
  borderRadius :"13px",
  boxShadow: 24,
  p: 4,
  
};

export default function AdsCard({
  handleCloseModal,
  openModal,
  ad
}: { 
  handleCloseModal: () => void, 
  openModal: boolean, 
  ad?: any 
}) {
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={style}>
        {ad && (
          <>
            <Box sx={{ display: "flex", justifyContent: 'space-between', mb: "30px"  }}>
              <Typography variant="h6" component="h2">
                {ad?.room?.roomNumber} 
              </Typography>
              <Box component={'button'} sx={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }} onClick={handleCloseModal}>
                <CloseIcon />
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ width: '50%' }}>
                <Typography sx={{ mt: 2 }} component={'div'}>
                  <Typography component={'span'} sx={{ fontWeight: 700 }}>Price:</Typography> {ad?.room?.price} EGP 
                </Typography>
                <Typography sx={{ mt: 2 }} component={'div'}>
                  <Typography component={'span'} sx={{ fontWeight: 700 }}>Capacity:</Typography> {ad?.room?.capacity}
                </Typography>
                <Typography sx={{ mt: 2 }} component={'div'}>
                  <Typography component={'span'} sx={{ fontWeight: 700 }}>Discount:</Typography> {ad?.room?.discount}% 
                </Typography>
                <Typography sx={{ mt: 2 }} component={'div'}>
                  <Typography component={'span'} sx={{ fontWeight: 700 }}>Created By:</Typography> {ad?.createdBy?.userName}
                </Typography>
                <Typography sx={{ mt: 2 }} component={'div'}>
                  <Typography component={'span'} sx={{ fontWeight: 700 }}>Created At:</Typography> {new Date(ad?.createdAt).toLocaleString()} 
                </Typography>
                <Typography sx={{ mt: 2 }} component={'div'}>
                  <Typography component={'span'} sx={{ fontWeight: 700 }}>Status:</Typography> {ad?.isActive ? 'Active' : 'Inactive'} 
                </Typography>
              </Box>

              <Box sx={{ width: "50%" }}>
                <Typography>Images:</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {ad?.room?.images && ad.room.images.length > 0 ? 
                    ad.room.images.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img} 
                        style={{ objectFit: 'cover', borderRadius: '8px' }}
                        height={120}
                        width={120}
                      />
                    )) :
                    <img
                      src={noimg}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                      height={120}
                      width={120}
                    />
                  }
                </Box>
              </Box>
            </Box>

        
          </>
        )}

        <Box sx={{ mt: '20px', display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={handleCloseModal} variant='outlined'>Close</Button>
        </Box>
      </Box>
    </Modal>
  );
}
