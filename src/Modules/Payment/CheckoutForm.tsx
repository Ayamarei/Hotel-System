import { Box, Button, Typography } from "@mui/material";
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import BCA from "../../assets/images/BCA.svg";
import mandiri from "../../assets/images/mandiri.svg";
import {
  privateAxiosInstance,
} from "../../Services/Axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";
import { THEMECOLOR } from "../../Services/ThemeColors";
import { ThemeContext } from "../../context/ThemeContext";
import Complete from "../../assets/images/Group 1 1.svg";

const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(1);
  const navigate = useNavigate();
  const elements = useElements();
  const stripe = useStripe();
  const { state } = useLocation();

  const ContextColor = useContext(ThemeContext);
  if (!ContextColor)
    throw new Error("ThemeContext must be used within ThemeProvider");
  const { theme } = ContextColor;

  const steps = ["", "", ""];

  const Payment = async (token: string, bookingId: string) => {
    try {
      const { data } = await privateAxiosInstance.post(
       `/booking/${bookingId}/pay`,
        { token }
      );
      if (data.success === true) {
        setActiveStep(3);
      } else {
        console.log("Payment failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitPaymentHandler = async () => {
    if (!elements || !stripe) return;
    const cardElement = elements.getElement("card");
    const { token, error } = await stripe.createToken(cardElement!);
    if (error) return;
    await Payment(token.id, state?.bookingId);
  };

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    padding: "16px",
    backgroundColor: "#fff",
    maxWidth: "400px",
    margin: "auto",
  };

  return (
    <Box
      sx={{
        pt: 5,
        pb: 10,
        px: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme === "dark" ? "black" : "white",
        justifyContent: "center", 
        [`@media (max-width:600px)`]: {
          alignItems: "center",
        },
      }}
    >
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{
          "& .MuiStepIcon-root": { color: "#e5e5e5", fontSize: "2rem" },
          "& .MuiStepIcon-root.Mui-completed": { color: "#1abc9c" },
          "& .MuiStepIcon-root.Mui-active": {
            color: "#e5e5e5",
            border: "1px solid #e5e5e5",
            borderRadius: "50%",
            padding: "1px",
            boxSizing: "content-box",
          },
          "& .MuiStepConnector-line": {
            borderColor: "#e5e5e5",
            borderTopWidth: 3,
            width: "100%",
            marginTop: "5px",
          },
          "& .MuiStepLabel-root": { margin: "0 20px" },
        }}
      >
        {steps.map((label, i) => (
          <Step key={i}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep !== 3 && (
        <>
          <Typography variant="h4"  sx={{ mt: 2, mb: 1, color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,}}>
            Payment
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, color: "#b0b0b0" }}>
            Kindly follow the instructions below
          </Typography>
        </>
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
          width: "100%",
          maxWidth: "1000px",
          minHeight: "300px",
          
        }}
      >
        {activeStep !== 3 && (
          <Box
            sx={{
             
              flex: 1,
              minWidth: "300px",
              maxWidth: "450px",
              px: 2,
              display: "flex",
              flexDirection: "column",
              [`@media (max-width:753px)`]: {
                display: "none",
              }
            }}
          >
            {[
              "Transfer Pembayaran:",
              "Tax: 10%",
              "Sub total: $480 USD",
              "Total: $580 USD",
            ].map((text, idx) => (
              <Typography
                key={idx}
                sx={{
                  mb: 2,
                  fontSize: "16px",
                  fontWeight: 700,
                  color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,
                  lineHeight: "170%",
                }}
              >
                {text}
              </Typography>
            ))}

            {[{ img: BCA, name: "Bank Central Asia" }, { img: mandiri, name: "Bank Mandiri" }].map((bank, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                <Box component="img" src={bank.img} alt={bank.name} />
                <Typography sx={{ fontSize: "16px", fontWeight: 700, color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor, lineHeight: "170%" }}>
                  {bank.name}
                  <br />
                  2208 1996
                  <br />
                  BuildWith Angga
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {activeStep !== 3 && (
          <Box sx={{ width: "1px", backgroundColor: "#aaa", alignSelf: "stretch", [`@media (max-width:753px)`]: {
            display: "none",
          }, }} />
        )}

        <Box
          component="form"
          sx={{ flex: 1, minWidth: "300px", maxWidth: "450px", px: 2 }}
        >
          {activeStep === 1 && <AddressElement options={{ mode: "billing" }} />}
          {activeStep === 2 && <div style={cardStyle}><CardElement /></div>}
          {activeStep === 3 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                mt: 5,
              }}
            >
              <Typography variant="h5" sx={{ color: "#152c5b", fontWeight: "bold" }}>
                Yay! Completed
              </Typography>
              <Box
                component="img"
                src={Complete}
                alt="Completed"
                sx={{ maxWidth: "100%", height: "auto", mb: 1 }}
              />
              <Typography variant="body1" sx={{ mt: 2, color: "rgba(0, 0, 0, 0.6)" }}>
                We will inform you via email later,
                <br />
                once the transaction has been accepted
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {activeStep <= 3 && (
        <Box sx={{ mt: 4 }}>
          {activeStep === 1 && (
            <Button
              onClick={() => setActiveStep((prev) => prev + 1)}
              variant="outlined"
              sx={{
                backgroundColor: THEMECOLOR.mainBlue,
                color: "white",
                borderColor: THEMECOLOR.mainBlue,
                "&:hover": {
                  backgroundColor: "white",
                  color: THEMECOLOR.mainBlue,
                  borderColor: THEMECOLOR.mainBlue,
                },
                fontWeight: "bold",
                borderRadius: "12px",
                px: 4,
                py: 1,
                fontSize: "16px",
              }}
            >
              Continue
            </Button>
          )}

          {activeStep === 2 && (
            <Button
              onClick={submitPaymentHandler}
              variant="outlined"
              sx={{
                backgroundColor: THEMECOLOR.mainBlue,
                color: "white",
                fontWeight: "bold",
                borderRadius: "12px",
                px: 4,
                py: 1,
                fontSize: "16px",
                "&:hover": {
                  color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                  borderColor: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                  backgroundColor: theme === "dark" ? "white" : "white",
                },
              }}
            >
              Pay Now
            </Button>
          )}
          {activeStep=== 3 && (<Button
                 sx={{
                  backgroundColor: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                  color: theme === "dark" ? "white" : "white",
                  borderColor: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                  "&:hover": {
                    color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                    borderColor: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                    backgroundColor: theme === "dark" ? "white" : "white",
                  },
                  fontWeight: "bold",
                  borderRadius: "12px",
                  padding: "5px 30px",
                  fontSize: "16px",
                  transition: "0.3s",
                }}
                variant="outlined"

                  type="button"
                  onClick={() =>navigate("/")}
                >
                  Back to home
                </Button>)}
        </Box>
      )}
    </Box>
  );
};

export default CheckoutForm;