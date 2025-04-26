import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import noimg from "../assets/images/no-img.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.css'; 
import { Navigation } from "swiper/modules";
import { IRoomData } from "../Interfaces/RoomInterface";
import { THEMECOLOR } from "../Services/ThemeColors";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  color: "black",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function ViewDetails({
  handleCloseModal,
  openModal,
  room,
}: {
  handleCloseModal: () => void;
  openModal: boolean;
  room?: IRoomData;
}) {
  const ContextColor = useContext(ThemeContext);
  if (!ContextColor)
    throw new Error("AuthContext must be used within AuthProvider");
  const { theme } = ContextColor;
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          {room && (
            <>
             
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Box
                  component={"button"}
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color:theme==="dark"?THEMECOLOR.mainBlue:"black" 
                  }}
                  onClick={handleCloseModal}
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
                  {room.images && room.images.length > 0 ? (
                    room.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={img}
                          alt={`room-img-${index}`}
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
                  <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black" }}>
                    <Typography component={"span"} sx={{ fontWeight: 700,color:theme==="dark"?THEMECOLOR.mainBlue:"black" }}>
                      Room Number:
                    </Typography>{" "}
                    {room.roomNumber}
                  </Typography>
                  <Typography sx={{ mb: 2 ,color:theme==="dark"?"white":"black" }}>
                    <Typography component={"span"} sx={{ fontWeight: 700,color:theme==="dark"?THEMECOLOR.mainBlue:"black" }}>
                      Price:
                    </Typography>{" "}
                    {room.price} EGP
                  </Typography>
                  <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black"  }}>
                    <Typography component={"span"} sx={{ fontWeight: 700,color:theme==="dark"?THEMECOLOR.mainBlue:"black" }}>
                      Capacity:
                    </Typography>{" "}
                    {room.capacity}
                  </Typography>
                  <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black"  }}>
                    <Typography component={"span"} sx={{ fontWeight: 700,color:theme==="dark"?THEMECOLOR.mainBlue:"black" }}>
                      Discount:
                    </Typography>{" "}
                    {room.discount}%
                  </Typography>
                </Box>

                <Box sx={{ flex: "1 1 45%" }}>
                  <Typography sx={{ mb: 2,color:theme==="dark"?"white":"black"  }}>
                    <Typography component={"span"} sx={{ fontWeight: 700,color:theme==="dark"?THEMECOLOR.mainBlue:"black" }}>
                      Created By:
                    </Typography>{" "}
                    {room.createdBy.userName}
                  </Typography>
                  <Typography sx={{ mb: 2, color: theme === "dark" ? "white" : "black" }}>
                      <Typography
                        component={"span"}
                        sx={{
                          fontWeight: 700,
                          color: theme === "dark" ? THEMECOLOR.mainBlue : "black",
                        }}
                      >
                        Facilities:
                      </Typography>
                      {room.facilities && room.facilities.length > 0 ? (
                        <Box sx={{ mt: 1 }}>
                          <ul>
                            {room.facilities.map((facility) => (
                              <li key={facility._id} style={{ marginBottom: "5px" }}>
                                <Typography> {facility.name}</Typography>
                              </li>
                            ))}
                          </ul>
                        </Box>
                      ) : (
                        <Typography>No facilities available</Typography>
                      )}
                    </Typography>

                </Box>
              </Box>
            </>
          )}

          <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
            <Button
              onClick={handleCloseModal}
              variant="outlined"
              sx={{
                color:
                  theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                borderColor:
                  theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? THEMECOLOR.mainBlue
                      : THEMECOLOR.mainBlue,
                  color: theme === "dark" ? "white" : "white",
                  borderColor:
                    theme === "dark"
                      ? THEMECOLOR.mainBlue
                      : THEMECOLOR.mainBlue,
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
        </Box>
      </Modal>
    </>
  );
}
