import { Box, Button, Typography } from "@mui/material";
import {
  AddressElement,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import{ useContext, useState } from "react";
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
import Complete from "../../assets/images/Group 1 1.svg"
const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(1);
const navigate=useNavigate();
  const elements = useElements();
  const stripe = useStripe();

  const Payment = async (token: string, bookingId: string) => {
    try {
      const { data } = await privateAxiosInstance.post(
        `/booking/${state?.bookingId}/pay`,
        { token: token }
      );

      console.log(data);
      if (data.success === true) {
        setActiveStep(3);
      } else {
        console.log("Payment failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const { state } = useLocation();
  const submitPaymentHandler = async () => {
    if (!elements || !stripe) return;
    const cardElement = elements?.getElement("card");
    const { token, error } = await stripe?.createToken(cardElement!);
    if (error) return;
    console.log("tokenID", token.id);
    console.log("state?.bookingId",state?.bookingId);
    await Payment(token.id, state?.bookingId);

  };
  const steps = ["", "", ""];
    const ContextColor = useContext(ThemeContext);
    if (!ContextColor)
      throw new Error("AuthContext must be used within AuthProvider");
    const { theme } = ContextColor;



    const cardStyle = {
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      padding: '16px',
      backgroundColor: '#fff',
      maxWidth: '400px',
      margin: 'auto',

    };
    
  return (
    <>
      <Box
        sx={{
          mt:5,
          mb:10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor:theme==="dark"?"black":"white",
        }}
      >
        {/* Stepper */}
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepIcon-root": {
              color: "rgba(229, 229, 229, 1)",
              fontSize: "2rem",
            },
            "& .MuiStepIcon-root.Mui-completed": {
              color: "rgba(26, 188, 156, 1)", // complete step
            },
            "& .MuiStepIcon-root.Mui-active": {
              color: "rgba(229, 229, 229, 1)",
              border: "1px solid rgba(229, 229, 229, 1)",
              borderRadius: "50%",
              padding: "1px",
              boxSizing: "content-box",
            },
            "& .MuiStepConnector-line": {
              borderColor: "rgba(229, 229, 229, 1)",
              borderTopWidth: 3,
              width: "100%",
              marginTop: "5px",
            },
            "& .MuiStepLabel-root": {
              margin: "0 20px", // space between circles
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep !== 3 && (
        <Typography
          variant="h4"
          sx={{ mt: 2, mb: 1, color: "rgba(21, 44, 91, 1)" }}
        >
          Payment
        </Typography>)}
        {activeStep !== 3 && (
        <Typography
          variant="h6"
          sx={{ mt: 1, mb: 1, color: "rgba(176, 176, 176, 1)" }}
        >
          Kindly follow the instructions below
        </Typography>)}

        <Box
          sx={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            alignItems: "flex-start",
            flexWrap: "wrap",
            width: "100%",
            maxWidth: "900px",
            minHeight: "300px",
          }}
        >
          {/* static section */}
          {activeStep !== 3 && (
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: "300px",
                padding: 3,
                borderRadius: 2,
                alignItems: "flex-start",
              }}
            >
              <Typography
                sx={{
                  mb: 2,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "rgba(21, 44, 91, 1)",
                  lineHeight: "170%",
                }}
              >
                Transfer Pembayaran:
              </Typography>
              <Typography
                sx={{
                  mb: 2,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "rgba(21, 44, 91, 1)",
                  lineHeight: "170%",
                }}
              >
                Tax: 10%
              </Typography>
              <Typography
                sx={{
                  mb: 2,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "rgba(21, 44, 91, 1)",
                  lineHeight: "170%",
                }}
              >
                Sub total: $480 USD
              </Typography>
              <Typography
                sx={{
                  mb: 2,
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "rgba(21, 44, 91, 1)",
                  lineHeight: "170%",
                }}
              >
                Total: $580 USD
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box component="img" src={BCA} alt="Instruction" />

                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "rgba(21, 44, 91, 1)",
                    lineHeight: "170%",
                  }}
                >
                  Bank Central Asia,
                  <br />
                  2208 1996
                  <br />
                  BuildWith Angga
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 3,
                }}
              >
                <Box component="img" src={mandiri} alt="Instruction" />

                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "rgba(21, 44, 91, 1)",
                    lineHeight: "170%",
                  }}
                >
                  Bank Mandiri
                  <br />
                  2208 1996
                  <br />
                  BuildWith Angga
                </Typography>
              </Box>
            </Box>
          )}
          {/* vertical line */}
          {activeStep !== 3 && (
            <Box
              sx={{
                width: "1px",
                backgroundColor: "#aaa",
                alignSelf: "stretch",
              }}
            />
          )}

          {/* form section */}
          <Box
            component="form"
            // onSubmit={submitPaymentHandler}
            sx={{ flex: 1, minWidth: "300px", padding: 3 }}
          >
            {activeStep === 1 && (
              <AddressElement options={{ mode: "billing" }} />
            )}
          
            {activeStep === 2 &&
            //  <CardElement />
            <div style={cardStyle}>
              <CardElement />
            </div>

             }
         
            {/* {activeStep === 3 && (
              <Typography
                variant="h5"
                sx={{ color: "green", fontWeight: "bold", mt: 5 }}
              >
                Yay! Completed
              </Typography>
              
              
            )} */}
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
   
    <Typography variant="h5" sx={{ color: "rgba(21, 44, 91, 1)", fontWeight: "bold" }}>
      Yay! Completed
    </Typography>
 <Box
      component="img"
      src={Complete} 
      alt="Completed"
      sx={{
        maxWidth: "100%",
        height: "auto",
        mb: 1,
      }}
    />

    <Typography variant="body1" sx={{ mt: 2, color: "rgba(0, 0, 0, 0.6)" }}>
    We will inform you via email later,<br/>
    once the transaction has been accepted    </Typography>
  </Box>
)}

          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {activeStep === 1 && (
              <>
                <Button
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
                  onClick={() => setActiveStep((prev) => prev + 1)}
                >
                  Continue to Book
                </Button>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Button
                  sx={{
                    backgroundColor: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                    color: theme === "dark" ? "white" : "white",
                    borderColor: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                    "&:hover": {
                      color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                      borderColor: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.mainBlue,
                      backgroundColor: theme === "dark" ? "white": "white",

                    },
                    fontWeight: "bold",
                    borderRadius: "12px",
                    padding: "5px 30px",
                    fontSize: "16px",
                    transition: "0.3s",
                  }}
                  variant="outlined"
                  type="button"
                  onClick={() => setActiveStep((prev) => prev - 1)}
                >
                  Back
                </Button>
                <Button
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
                  type="submit"
                  onClick={submitPaymentHandler}
                >
                  Continue to Book
                </Button>
              </>
            )}
            {activeStep === 3 && (
              <>
                <Button
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
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CheckoutForm;
