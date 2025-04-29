import { Box, Button, Typography } from "@mui/material";
import explore from "../../assets/images/explor.jpg";
import frame from "../../assets/images/frame.jpg";
import { Controller, useForm } from "react-hook-form";
import { FiltersContext } from "../../context/FilterContext";
import DateRangePickerComponent from "../Shared/DateRangePicker/DateRangePicker";
import Capacity from "../Shared/Capacity/Capacity";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { THEMECOLOR } from "../../Services/ThemeColors";

const HomeExplore = () => {
  const { handleSubmit, control, setValue } = useForm();
  const filtersContext = useContext(FiltersContext);
const Navigate=useNavigate();
  if (!filtersContext) {
    throw new Error("FiltersContext is not provided");
  }
  const { setStartDate, setEndDate, setCapacity } = filtersContext;

   const ContextColor = useContext(ThemeContext);
    if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
    const { theme }=ContextColor;

const onSubmit = (data: any) => {
    const formattedStartDate = data.dateRange[0]?.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const formattedEndDate = data.dateRange[1]?.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
  
    setStartDate(formattedStartDate);
    setEndDate(formattedEndDate);
    setCapacity(data.capacity);

    Navigate('/user-room')
    toast.success("Rooms Filtered Successfully!")
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        padding: { xs: "20px", md: "50px" },
        gap: "20px",
      }}
    >
      {/* Left Side */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: { xs: "center", md: "center" },
          alignItems: { xs: "center", md: "flex-start" },
          textAlign: { xs: "center", md: "left" },
          gap: "20px",
          minHeight: "400px",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "42px", md: "36px", sm: "28px", xs: "24px" },
            fontWeight: 700,
            lineHeight: 1.2,
            color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,
            fontFamily: "Poppins",
          }}
        >
          Forget Busy Work,
          <br />
          Start Next Vacation
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { lg: "18px", md: "16px", sm: "14px", xs: "13px" },
            color: "rgba(176, 176, 176, 1)",
            fontWeight: 300,
            fontFamily: "Poppins",
            lineHeight: "170%",
            marginTop: "10px",
          }}
        >
          We provide what you need to enjoy your holiday with family.
          <br />
          Time to make another memorable moment.
        </Typography>

        {/* Start Booking Form */}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "500",
            color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,
            lineHeight: 1.2,
            mb: 0,
            mt: "10px",
          }}
        >
          Start Booking
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,
            lineHeight: 0,
            mb: 0,
            mt: "5px",
          }}
        >
          Pick a Date
        </Typography>

        {/* React Hook Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
            <DateRangePickerComponent control={control} setValue={setValue} name="dateRange" />
          </Box>

          <Box sx={{ marginTop: "10px", maxWidth: "500px" }}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: "500",
                color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,
                mb: 1,
              }}
            >
              Capacity
            </Typography>
            <Controller
              name="capacity"
              control={control}
              defaultValue={0}
              rules={{ required: "Capacity is required" }}
              render={({ field }) => <Capacity value={field.value} onChange={field.onChange} />}
            />
          </Box>

          <Button
            size="large"
            variant="contained"
            sx={{ width: "200px", backgroundColor: "rgba(50, 82, 223, 1)", mt: "15px" }}
            type="submit"
          >
            Explore
          </Button>
        </form>
      </Box>

      {/* Right Side */}
      <Box
        sx={{
          flex: { xs: "1 1 100%", md: "1 1 45%" },
          position: "relative",
          minHeight: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={explore}
          alt="explore"
          style={{ width: "100%", maxWidth: "450px", zIndex: 1 }}
        />
        <img
          src={frame}
          alt="frame"
          style={{
            position: "absolute",
            top: "15%",
            left: "58%",
            transform: "translate(-50%, 0)",
            zIndex: 0,
            width: "80%",
            maxWidth: "450px",
          }}
        />
      </Box>
    </Box>
  );
};

export default HomeExplore;