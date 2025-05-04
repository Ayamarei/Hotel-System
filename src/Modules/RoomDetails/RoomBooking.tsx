import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IRoomDetails } from "../../Interfaces/RoomDetailsInterface";
import DateRangePickerComponent from "../Shared/DateRangePicker/DateRangePicker";
import { Controller, useForm } from "react-hook-form";
import Capacity from "../Shared/Capacity/Capacity";
import { useNavigate } from "react-router-dom";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { THEMECOLOR } from "../../Services/ThemeColors";

export default function RoomBooking({ room }: { room: IRoomDetails }) {
  const {
    control,
    setValue,
    watch,
  } = useForm();


  const submitPaymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
  
    const { dateRange, capacity } = watch();
    
    console.log("Date Range:", dateRange);
  
    const startDate = dateRange?.[0]?.$d;
    const endDate = dateRange?.[1]?.$d;
  
    if (!startDate || !endDate) {
      console.error("Start date or end date is missing");
      return; 
    }
  
    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();
  
    const totalPrice =
      (room.price - (room.discount / 100) * room.price) * capacity;
  
    const bookingData = {
      startDate: startDateISO,
      endDate: endDateISO,
      room: room._id,
      totalPrice,
    };
  
    console.log("Booking data:", bookingData);
  
    try {
      const res = await privateUserAxiosInstance.post(
        `https://upskilling-egypt.com:3000/api/v0/portal/booking`,
        bookingData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
  
      console.log("Booking result:", res.data);
      console.log("res?.data?.booking?._id",res?.data?.data?.booking?._id);
      navigate("/payment/checkout-form",{state:{bookingId:res?.data?.data?.booking?._id}})
      toast.success("Booking submitted successfully!");
    } catch (err) {
      console.error("Error submitting booking:", err);
    }
  };
  
  const navigate = useNavigate();

  const capacity = watch("capacity") || 0;
  const totalPay = room ? room.price * capacity: 0;
  const priceAfterDiscount = (room.price - (room.discount / 100) * room.price) * capacity;
  const { t } = useTranslation();

  const ContextColor = useContext(ThemeContext);
    if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
    const { theme }=ContextColor;
  
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: { md: "49%", xs: "100%" },
          borderRadius: "8px",
          border: "1px solid rgba(229, 229, 229, 1)",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ py: "30px" }}>
          <Typography
            sx={{
              color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,
              fontWeight: 700,
              fontSize: "20px",
            }}
          >
            {t("room.StartBooking")}
          </Typography>
          <Typography
            component={"p"}
            sx={{ fontSize: "40px", color: "#1abc9c" }}
          >
            {room?.price} {t("room.EGP")}{" "}
            <Typography
              component={"span"}
              sx={{ fontSize: "40px", color: "#b0b0b0" }}
            >
              {t("room.perNight")}
            </Typography>
          </Typography>
          <Typography sx={{ color: "rgba(255, 22, 18, 1)", fontWeight: 600 }}>
            {" "}
            {t("room.Discount")} {room?.discount}% {t("room.Off")}{" "}
          </Typography>
        </Box>

        {/* input */}
        <Box sx={{ px: "20px", py: "20px" }}>
          <Typography
            variant="body1"
            sx={{
              fontSize: "16px",
              fontWeight: 600,
              display: "flex",
              justifyContent: "flex-start",
              width: "100%",
              lineHeight: 0,
              mb: 2,
            }}
          >
            Pick a Date
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "3px",
            }}
          >
            <DateRangePickerComponent
              control={control}
              setValue={setValue}
              name="dateRange"
            />
          </Box>

          <Box sx={{ marginTop: "10px" }}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "600",
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
              render={({ field }) => (
                <Capacity value={field.value} onChange={field.onChange} />
              )}
            />
          </Box>
        </Box>
        <Typography component="div" sx={{ color: "#b0b0b0", fontWeight: 400 }}>
          {t("room.Youwillpay")}{" "}
          <Box
            component="span"
            sx={{ color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor, fontWeight: 600, fontSize: "19px" }}
          >
            {totalPay} {t("room.EGP")}
          </Box>{" "}
          {t("room.for")}{" "}
          <Box
            component="span"
            sx={{ color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor, fontWeight: 600, fontSize: "19px" }}
          >
            {capacity} {t("room.Person")}
          </Box>
        </Typography>
        <Typography sx={{ color: "rgba(255, 22, 18, 1)", fontWeight: 600,mt:2 }}>
          After discount <span style={{fontSize:"24px"}}> {priceAfterDiscount}</span> {t("room.EGP")}
        </Typography>

        <form onSubmit={submitPaymentHandler}>
          <Button
            variant="contained"
            type="submit"
            sx={{ mt: "12px", my: "20px" }}
          >
            {t("room.continueBooking")}
          </Button>
        </form>
      </Box>
    </>
  );
}
