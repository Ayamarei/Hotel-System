import {
  TextField,
  Grid,
  Box,
  Paper,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as React from "react";
import { useForm } from "react-hook-form";
import { THEMECOLOR } from "../../../Services/ThemeColors";
import {
  CONFIRMPASSWORD_VALIDATION,
  COUNTRY_VALIDATION,
  EMAIL_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
  USER_NAME_VALIDATION,
} from "../../../Services/Validation";
import { IRegisterForm } from "../../../Interfaces/AuthInterface";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { publicUserAxiosInstance } from "../../../Services/Axiosinstance";
import { USERS_URLS } from "../../../Services/Urls";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function Register() {
  const [uploadedImage, setUploadedImage] = React.useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
  } = useForm<IRegisterForm>();
  
// submit form data
const onSubmit = async (data: IRegisterForm) => {

  if (!uploadedImage) {
    alert("Please upload an image");
    return;
  }

  const formData = new FormData();
  // Append the text fields from the form
  formData.append("userName", data.userName);
  formData.append("phoneNumber", data.phoneNumber);
  formData.append("country", data.country);
  formData.append("email", data.email);
  formData.append("password", data.password);
  formData.append("confirmPassword", data.confirmPassword);
  formData.append("role", "user"); 
  formData.append("profileImage", uploadedImage);

  try {
    const response = await publicUserAxiosInstance.post(
      USERS_URLS.REGISTER,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("✅ Registered successfully:", response.data.message);
  } catch (error: any) {
    if (error.response) {
      console.error("❌ Server responded with error:", error.response.data);
    } else if (error.request) {
      console.error("❌ No response received from server");
    } else {
      console.error("❌ Error in setting up the request:", error.message);
    }
  }
};

  //match password
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  React.useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

  // handleFileChange
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedImage(file);
      setUploadSuccess(true);
    }
  };
  //handleUploadNewImage
  const handleUploadNewImage = () => {
    setUploadSuccess(false);
    setUploadedImage(null);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label htmlFor="outlined-username">User Name</label>
          <TextField
            id="username"
            placeholder="Please type here ..."
            sx={{ width: "100%" }}
            variant="filled"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            {...register("userName", USER_NAME_VALIDATION)}
            error={!!errors.userName}
          />
          {errors.userName && (
            <span style={{ color: "red" }}>{errors.userName.message}</span>
          )}
        </FormControl>

        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <label htmlFor="Phone">Phone number</label>
                <TextField
                  id="Phone"
                  placeholder="Please type here ..."
                  sx={{ width: "100%" }}
                  variant="filled"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  {...register("phoneNumber", PHONE_VALIDATION)}
                  error={!!errors.phoneNumber}
                />
                {errors.phoneNumber && (
                  <span style={{ color: "red" }}>
                    {errors.phoneNumber.message}
                  </span>
                )}
              </FormControl>
            </Grid>

            <Grid size={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <label htmlFor="outlined-username">Country</label>
                <TextField
                  id="Country"
                  placeholder="Please type here ..."
                  sx={{ width: "100%" }}
                  variant="filled"
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                  {...register("country", COUNTRY_VALIDATION)}
                  error={!!errors.country}
                />
                {errors.country && (
                  <span style={{ color: "red" }}>{errors.country.message}</span>
                )}
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label htmlFor="Email">Email</label>
          <TextField
            id="Email"
            placeholder="Please type here ..."
            sx={{ width: "100%" }}
            variant="filled"
            slotProps={{
              inputLabel: { shrink: true },
            }}
            {...register("email", EMAIL_VALIDATION)}
            error={!!errors.email}
          />
          {errors.email && (
            <span style={{ color: "red" }}>{errors.email.message}</span>
          )}
        </FormControl>

        <InputLabel htmlFor="password">Password</InputLabel>
        <FormControl sx={{ width: "100%", mb: 2 }} variant="filled">
          <FilledInput
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...register("password", PASSWORD_VALIDATION)}
            error={!!errors.password}
          />
          {errors.password && (
            <span style={{ color: "red" }}>{errors.password.message}</span>
          )}
        </FormControl>

        <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
        <FormControl sx={{ width: "100%", mb: 2 }} variant="filled">
          <FilledInput
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showConfirmPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            {...register("confirmPassword", {
              ...CONFIRMPASSWORD_VALIDATION,
              validate: (confirmPassword) =>
                confirmPassword === watch("password") ||
                "Passwords do not match",
            })}
            error={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <span style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </span>
          )}
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: "20px",
            width: "100%",
          }}
        >
          {!uploadSuccess ? (
            <Button
              fullWidth
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{
                color: "gray",
                border: "2px dashed gray",
                borderRadius: "8px",
                padding: "10px",
                "&:hover": {
                  borderColor: "darkgray",
                  backgroundColor: "#f9f9f9",
                },
              }}
            >
              Upload Image
              <VisuallyHiddenInput
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleFileChange}
              />
            </Button>
          ) : (
            <Box
              sx={{
                width: "100%",
                border: "2px dashed #80deea",
                paddingTop: "16px",
                textAlign: "center",
                borderRadius: "8px",
                backgroundColor: "#e0f7fa",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#007bff",
                fontWeight: "bold",
              }}
            >
              <Typography variant="body1">
                Image uploaded successfully!
              </Typography>
              <Button
                variant="text"
                onClick={handleUploadNewImage}
                sx={{ color: "#dc3545" }}
              >
                Remove
              </Button>
            </Box>
          )}
        </Box>

        <Button
          disabled={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ backgroundColor: THEMECOLOR.mainBlue }}
        >
          {isSubmitting ? "Register..." : "Register"}
        </Button>
      </form>
    </>
  );
}
