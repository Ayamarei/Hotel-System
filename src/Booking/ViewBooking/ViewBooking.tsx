import { Box, Button, Modal, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IBookingData } from "../../Interfaces/BookingData";
import { THEMECOLOR } from "../../Services/ThemeColors";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

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
  borderRadius: "10px",
};
export default function ViewDetails({
  handleCloseModal,
  openModal,
  booking,
}: {
  handleCloseModal: () => void;
  openModal: boolean;
  booking?: IBookingData;
}) {
  const ContextColor = useContext(ThemeContext);
  if (!ContextColor)
    throw new Error("AuthContext must be used within AuthProvider");
  const { theme } = ContextColor;
  return (
    <>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          {booking && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mb: "30px",
                }}
              >
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Box
                    component="span"
                    sx={{
                      color: theme === "dark" ? THEMECOLOR.mainBlue : "black",
                    }}
                  >
                    Room Number:
                  </Box>
                  <Box component="span" sx={{ color: "white", ml: 1 }}>
                    {booking?.room?.roomNumber}
                  </Box>
                </Typography>

                <Box
                  component={"button"}
                  sx={{
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: "pointer",
                    color: theme === "dark" ? THEMECOLOR.mainBlue : "black",
                  }}
                  onClick={handleCloseModal}
                >
                  <CloseIcon />
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ width: "50%" }}>
                  <Typography
                    sx={{ mt: 2, color: theme === "dark" ? "white" : "black" }}
                    component={"div"}
                  >
                    <Typography
                      component={"span"}
                      sx={{
                        fontWeight: 700,
                        color: theme === "dark" ? THEMECOLOR.mainBlue : "black",
                      }}
                    >
                      Total Price:
                    </Typography>{" "}
                    {booking?.totalPrice} EGP
                  </Typography>
                  <Typography
                    sx={{ mt: 2, color: theme === "dark" ? "white" : "black" }}
                    component={"div"}
                  >
                    <Typography
                      component={"span"}
                      sx={{
                        fontWeight: 700,
                        color: theme === "dark" ? THEMECOLOR.mainBlue : "black",
                      }}
                    >
                      Start Date:
                    </Typography>{" "}
                    {new Date(booking?.startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                  <Typography
                    sx={{ mt: 2, color: theme === "dark" ? "white" : "black" }}
                    component={"div"}
                  >
                    <Typography
                      component={"span"}
                      sx={{
                        fontWeight: 700,
                        color: theme === "dark" ? THEMECOLOR.mainBlue : "black",
                      }}
                    >
                      End Date:
                    </Typography>{" "}
                    {new Date(booking?.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </Typography>
                  <Typography
                    sx={{ mt: 2, color: theme === "dark" ? "white" : "black" }}
                    component={"div"}
                  >
                    <Typography
                      component={"span"}
                      sx={{
                        fontWeight: 700,
                        color: theme === "dark" ? THEMECOLOR.mainBlue : "black",
                      }}
                    >
                      User:
                    </Typography>{" "}
                    {booking?.user.userName}
                  </Typography>
                </Box>
              </Box>
            </>
          )}

          <Box sx={{ mt: "20px", display: "flex", justifyContent: "flex-end" }}>
            {" "}
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
