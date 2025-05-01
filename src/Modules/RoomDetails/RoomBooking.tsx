// import { Box, Button, Typography } from "@mui/material";
// import { useTranslation } from "react-i18next";
// import { IRoomDetails } from "../../Interfaces/RoomDetailsInterface";
// import DateRangePickerComponent from "../Shared/DateRangePicker/DateRangePicker";
// import { Controller, useForm } from "react-hook-form";
// import Capacity from "../Shared/Capacity/Capacity";
// import { useElements, useStripe } from "@stripe/react-stripe-js";

// export default function RoomBooking({ room }: { room: IRoomDetails }) {
//    const elements = useElements();
//     const stripe = useStripe();
//     const submitPaymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       if (!elements || !stripe) return;
//       const cardElement = elements?.getElement("card");
//       // console.log("cardElement",cardElement);
//       const { token, error } = await stripe?.createToken(cardElement!);
//       if (error) return;
//       console.log("tokenID", token.id);
//     };

//   const { control, setValue } = useForm();
//   const totalPay = room ? room.price - (room.discount / 100) * room.price : 0;
//   const { t } = useTranslation();
//   return (
//     <>
//       <Box
//         sx={{
//           height: "100%",
//           width: { md: "49%", xs: "100%" },
//           borderRadius: "8px",
//           border: "1px solid rgba(229, 229, 229, 1)",
//           display: "flex",
//           alignItems: "center",
//           flexDirection: "column",
//         }}
//       >
//         <Box sx={{ py: "30px" }}>
//           <Typography
//             sx={{
//               color: "rgba(21, 44, 91, 1)",
//               fontWeight: 700,
//               fontSize: "20px",
//             }}
//           >
//             {t("room.StartBooking")}
//           </Typography>
//           <Typography
//             component={"p"}
//             sx={{ fontSize: "40px", color: "#1abc9c" }}
//           >
//             {room?.price} {t("room.EGP")}{" "}
//             <Typography
//               component={"span"}
//               sx={{ fontSize: "40px", color: "#b0b0b0" }}
//             >
//               {t("room.perNight")}
//             </Typography>
//           </Typography>
//           <Typography sx={{ color: "rgba(255, 22, 18, 1)", fontWeight: 600 }}>
//             {" "}
//             {t("room.Discount")} {room?.discount}% {t("room.Off")}{" "}
//           </Typography>
//         </Box>

//         {/* input */}
//         <Box sx={{ px: "20px", py: "20px" }}>
//           <Typography
//             variant="body1"
//             sx={{
//               fontSize: "16px",
//               fontWeight: 600,
//               display: "flex",
//               justifyContent: "flex-start",
//               width: "100%",
//               lineHeight: 0,
//               mb: 2,
//             }}
//           >
//             Pick a Date
//           </Typography>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px",
//               marginTop: "3px",
//             }}
//           >
//             <DateRangePickerComponent
//               control={control}
//               setValue={setValue}
//               name="dateRange"
//             />
//           </Box>

//           <Box sx={{ marginTop: "10px" }}>
//             <Typography
//               sx={{
//                 fontSize: "16px",
//                 fontWeight: "600",
//                 mb: 1,
//               }}
//             >
//               Capacity
//             </Typography>
//             <Controller
//               name="capacity"
//               control={control}
//               defaultValue={0}
//               rules={{ required: "Capacity is required" }}
//               render={({ field }) => (
//                 <Capacity value={field.value} onChange={field.onChange} />
//               )}
//             />
//           </Box>
//         </Box>
//         <Typography component="div" sx={{ color: "#b0b0b0", fontWeight: 400 }}>
//           {t("room.Youwillpay")}{" "}
//           <Box
//             component="span"
//             sx={{ color: "#152c5b", fontWeight: 600, fontSize: "19px" }}
//           >
//             {totalPay} {t("room.EGP")}
//           </Box>{" "}
//           {t("room.for")}{" "}
//           <Box
//             component="span"
//             sx={{ color: "#152c5b", fontWeight: 600, fontSize: "19px" }}
//           >
//             {1} {t("room.Person")}
//           </Box>
//         </Typography>
//         <Button variant="contained" sx={{ mt: "12px", my: "20px" }}>
//           {t("room.continueBooking")}
//         </Button>
//       </Box>
//     </>
//   );
// }


import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { IRoomDetails } from "../../Interfaces/RoomDetailsInterface";
import DateRangePickerComponent from "../Shared/DateRangePicker/DateRangePicker";
import { Controller, useForm } from "react-hook-form";
import Capacity from "../Shared/Capacity/Capacity";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";

export default function RoomBooking({ room }: { room: IRoomDetails }) {
  const elements = useElements();
  const stripe = useStripe();
  const { control, handleSubmit, setValue } = useForm();

  const totalPay = room ? room.price - (room.discount / 100) * room.price : 0;
  const { t } = useTranslation();

  // Handle form submission for payment
  const submitPaymentHandler = async (data: any) => {
    if (!elements || !stripe) return;
    
    // Get the card element
    const cardElement = elements.getElement(CardElement);

    if (!cardElement) return;

    // Create a token for the card
    const { token, error } = await stripe.createToken(cardElement);
    if (error) {
      console.error(error);
      return;
    }

    console.log("Token ID: ", token.id);
    // هنا يمكنك إرسال token.id إلى الخادم لمعالجة الدفع
  };

  return (
    <form onSubmit={handleSubmit(submitPaymentHandler)}>
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
              color: "rgba(21, 44, 91, 1)",
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
            {t("room.Discount")} {room?.discount}% {t("room.Off")}
          </Typography>
        </Box>

        {/* Date Range Picker */}
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
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "3px" }}>
            <DateRangePickerComponent control={control} setValue={setValue} name="dateRange" />
          </Box>

          {/* Capacity */}
          <Box sx={{ marginTop: "10px" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: "600", mb: 1 }}>
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
        </Box>

        {/* Payment Section */}
        <Box sx={{ px: "20px", py: "20px" }}>
          <Typography component="div" sx={{ color: "#b0b0b0", fontWeight: 400 }}>
            {t("room.Youwillpay")}{" "}
            <Box component="span" sx={{ color: "#152c5b", fontWeight: 600, fontSize: "19px" }}>
              {totalPay} {t("room.EGP")}
            </Box>{" "}
            {t("room.for")}{" "}
            <Box component="span" sx={{ color: "#152c5b", fontWeight: 600, fontSize: "19px" }}>
              {1} {t("room.Person")}
            </Box>
          </Typography>

          {/* Stripe Card Element */}
          <Box sx={{ mt: "20px" }}>
            <Typography variant="body1" sx={{ mb: "10px", fontWeight: 600 }}>
              Enter Your Payment Details
            </Typography>
            <CardElement />
          </Box>

          {/* Submit Button */}
          <Button type="submit" variant="contained" sx={{ mt: "12px", my: "20px" }}>
            {t("room.continueBooking")}
          </Button>
        </Box>
      </Box>
    </form>
  );
}
