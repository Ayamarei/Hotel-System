import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import noimg from '../../assets/images/no-img.jpeg';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'; 
import { Navigation } from "swiper/modules";
import { THEMECOLOR } from "../../Services/ThemeColors";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  maxHeight: "80vh",
  overflowY: "auto", 
  bgcolor: "background.paper",
  color: "black",
  boxShadow: 24,
  p: 4,
  borderRadius: "13px",
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none", 
  },
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
    const ContextColor = useContext(ThemeContext);
    if (!ContextColor)
      throw new Error("AuthContext must be used within AuthProvider");
    const { theme } = ContextColor;
  return (
    <Modal open={openModal} onClose={handleCloseModal}>
      <Box sx={style}>
        {ad && (
          <>
           
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Box
                component={"button"}
                onClick={handleCloseModal}
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color:theme==="dark"?THEMECOLOR.mainBlue:"black"
                }}
              >
                <CloseIcon />
              </Box>
            </Box>

            <Box sx={{ width: "100%", mb: 4 }}>
              <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={10}
                slidesPerView={1}
                style={{
                  width: "100%",
                  height: "300px",
                  borderRadius: "12px",
                }}
              >
                {ad?.room?.images && ad.room.images.length > 0 ? (
                  ad.room.images.map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`ad-img-${index}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img
                      src={noimg}
                      alt="no-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Box sx={{ flex: "1 1 45%" }}>
                <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black"  }}>
                  <Typography component={"span"} sx={{ fontWeight: 700 ,color:theme==="dark"?THEMECOLOR.mainBlue:"black"}}>Price:</Typography> {ad?.room?.price} EGP
                </Typography>
                <Typography sx={{ mb: 2 ,color:theme==="dark"?"white":"black" }}>
                  <Typography component={"span"} sx={{ fontWeight: 700,color:theme==="dark"?THEMECOLOR.mainBlue:"black" }}>Capacity:</Typography> {ad?.room?.capacity}
                </Typography>
                <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black"  }}>
                  <Typography component={"span"} sx={{ fontWeight: 700 ,color:theme==="dark"?THEMECOLOR.mainBlue:"black"}}>Discount:</Typography> {ad?.room?.discount}%
                </Typography>
                <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black"  }}>
                  <Typography component={"span"} sx={{ fontWeight: 700,color:theme==="dark"?THEMECOLOR.mainBlue:"black" }}>Created By:</Typography> {ad?.createdBy?.userName}
                </Typography>
                <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black"  }}>
                  <Typography component={"span"} sx={{ fontWeight: 700 ,color:theme==="dark"?THEMECOLOR.mainBlue:"black"}}>Created At:</Typography> {new Date(ad?.createdAt).toLocaleString()}
                </Typography>
                <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black"  }}>
                  <Typography component={"span"} sx={{ fontWeight: 700,color:theme==="dark"?THEMECOLOR.mainBlue:"black" }}>Status:</Typography> {ad?.isActive ? "Active" : "Inactive"}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleCloseModal}
                variant="outlined"
                sx={{
                  color: "#1976d2",
                  borderColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1976d2",
                    color: "white",
                    borderColor: "#1976d2",
                  },
                  fontWeight: "bold",
                  borderRadius: "12px",
                  padding: "10px 30px",
                  fontSize: "16px",
                  transition: "0.3s",
                }}
              >
                Close
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
}
