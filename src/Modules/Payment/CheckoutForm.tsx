import { Box, Typography } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import BCA from "../../assets/images/BCA.svg";
import mandiri from "../../assets/images/mandiri.svg";
const CheckoutForm = () => {
  const [activeStep, setActiveStep] = useState(1);

  const elements = useElements();
  const stripe = useStripe();
  const submitPaymentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!elements || !stripe) return;
    const cardElement = elements?.getElement("card");
    // console.log("cardElement",cardElement);
    const { token, error } = await stripe?.createToken(cardElement!);
    if (error) return;
    console.log("tokenID", token.id);
  };
  const steps = ["", "", ""];
  return (
    <>
      <Box
        sx={{
          mt: 30,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
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

        <Typography
          variant="h4"
          sx={{ mt: 2, mb: 1, color: "rgba(21, 44, 91, 1)" }}
        >
          Payment
        </Typography>
        <Typography
          variant="h6"
          sx={{ mt: 1, mb: 1, color: "rgba(176, 176, 176, 1)" }}
        >
          Kindly follow the instructions below
        </Typography>

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
          </Box>)}
          {/* vertical line */}
          {activeStep !== 3 && (
          <Box
            sx={{
              width: "1px",
              backgroundColor: "#aaa",
              alignSelf: "stretch",
            }}
          />)}

          {/* form section */}
          <Box
            component="form"
            onSubmit={submitPaymentHandler}
            sx={{ flex: 1, minWidth: "300px", padding: 3 }}
          >
             {activeStep === 1 && <CardElement />}
              {activeStep === 2 && <Typography>Step2</Typography>}
              {activeStep === 3 && (
                <Typography
                  variant="h5"
                  sx={{ color: "green", fontWeight: "bold", mt: 5 }}
                >
                  🎉 Your booking is complete!
                </Typography>
              )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
  {activeStep === 1 && (
    <>
      <button
        type="button"
        onClick={() => setActiveStep((prev) => prev + 1)}
      >
        Continue to Book
      </button>
    </>
  )}
  {activeStep === 2 && (
    <>
      <button
        type="button"
        onClick={() => setActiveStep((prev) => prev - 1)}
      >
        Back
      </button>
      <button
        type="button"
        onClick={() => setActiveStep((prev) => prev + 1)}
      >
        Continue to Book
      </button>
    </>
  )}
  {activeStep === 3 && (
    <>
      <button
        type="button"
        onClick={() => setActiveStep((prev) => prev - 1)}
      >
        Back to home
      </button>
    </>
  )}
</Box>

        </Box>
      </Box>
    </>
  );
};

export default CheckoutForm;
