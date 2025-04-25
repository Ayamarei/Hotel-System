import {
  Box,
  Button,
  CircularProgress,
  FilledInput,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EmailValidation_Forget,
  PasswordComfirmValidation_Reset,
  PasswordValidation_Reset,
  SeedValidation_Reset,
} from "../../../Services/Validation";
import { THEMECOLOR } from "../../../Services/ThemeColors";
import { IReset } from "../../../Interfaces/AuthInterface";
import { publicUserAxiosInstance } from "../../../Services/Axiosinstance";
import { USERS_URLS } from "../../../Services/Urls";
import { useContext, useEffect } from "react";
import { VisibilityOff } from "@mui/icons-material";
import { useTogglePassword } from "../../../hooks/useTogglePassword";
import { AxiosError } from "axios";

import Visibility from "@mui/icons-material/Visibility";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../context/ThemeContext";

export default function ResetPassword() {
    const ContextColor = useContext(ThemeContext);
      if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
      const { theme } = ContextColor;
  const { t } = useTranslation();
  const { toggleVisiblePassword, visiablity } = useTogglePassword();

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

  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<IReset>({
    defaultValues: { email: state?.email },
    mode: "onChange",
  });

  // submit function
  const onSubmit = async (values: IReset) => {
    console.log(values);
    try {
      const { data } = await publicUserAxiosInstance.post(
        USERS_URLS.RESET_PASSWORD,
        values
      );
      console.log(data);
      toast.success(data?.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Something Went Wrong");
      }
    }
  };
  const password = watch("password");
  const comfirmPassword = watch("confirmPassword");
  useEffect(() => {
    if (comfirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, comfirmPassword, trigger]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        {/* mail */}
        <Box sx={{ mb: "16px" }}>
          <InputLabel
            htmlFor="email"
            sx={{ color: theme === 'dark' ? 'white' : 'black', mb: "8px" }}
          >
            {t("RestForm.Email")}
          </InputLabel>
          <TextField
            id="email"
            type="email"
            placeholder={t("RestForm.Please-type")}
            variant="filled"
            fullWidth
            {...register("email", EmailValidation_Forget(t))}
            sx={{
              input: {
                color: theme === 'dark' ? 'white' : 'black',
              backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0', 
              borderColor: theme === 'dark' ? 'gray' : '#ccc', 
              },
              label: {
                color: theme === 'dark' ? 'white' : 'black',
              }
            }}
          />
          {errors.email && (
            <Typography sx={{ color: "red", mt: "10px", fontSize: "13px" }}>
              *{errors.email.message}
            </Typography>
          )}
          {/* otp */}
        </Box>
        <Box sx={{ mb: "16px" }}>
          <InputLabel
            htmlFor="otp"
            sx={{ color: theme === 'dark' ? 'white' : 'black', mb: "8px" }}
          >
            {t("RestForm.OTP")}
          </InputLabel>
          <TextField
            id="otp"
            type="text"
            placeholder={t("RestForm.Please-type")}
            variant="filled"
            fullWidth
            {...register("seed", SeedValidation_Reset(t))}
            sx={{
              input: {
                color: theme === 'dark' ? 'white' : 'black',
              backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0', 
              borderColor: theme === 'dark' ? 'gray' : '#ccc', 
              },
              label: {
                color: theme === 'dark' ? 'white' : 'black',
              }
            }}
          />
          {errors.seed && (
            <Typography sx={{ color: "red", mt: "10px", fontSize: "13px" }}>
              *{errors.seed.message}
            </Typography>
          )}
        </Box>

        {/* password */}
        <Box sx={{ mb: "16px" }}>
          <InputLabel
            htmlFor="paswword"
            sx={{color: theme === 'dark' ? 'white' : 'black', mb: "8px" }}
          >
            {t("RestForm.Password")}
          </InputLabel>
          <FilledInput
            id="password"
            fullWidth
            type={visiablity.password ? "text" : "password"}
            {...register("password", PasswordValidation_Reset(t))}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    visiablity.password
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={() => toggleVisiblePassword("password")}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                  
                >
                  {visiablity.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              input: {
                color: theme === 'dark' ? 'white' : 'black',
              backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0', 
              borderColor: theme === 'dark' ? 'gray' : '#ccc', 
              },
              label: {
                color: theme === 'dark' ? 'white' : 'black',
              }
            }}
          />
          {errors.password && (
            <Typography sx={{ color: "red", mt: "10px", fontSize: "13px" }}>
              *{errors.password.message}
            </Typography>
          )}
        </Box>

        {/* comfirmpassword */}

        <Box sx={{ mb: "16px" }}>
          <InputLabel
            htmlFor="paswword"
            sx={{color: theme === 'dark' ? 'white' : 'black', mb: "8px" }}
          >
            {t("RestForm.Confirm-Password")}
          </InputLabel>
          <FilledInput
            id="password"
            fullWidth
            {...register("confirmPassword", {
              ...PasswordComfirmValidation_Reset,
              validate: (value: string) =>
                value === watch("password") ||
                t("RegisterForm.Passwords-not-match"),
            })}
            type={visiablity.confirmPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    visiablity.confirmPassword
                      ? "hide the password"
                      : "display the password"
                  }
                  onClick={() => toggleVisiblePassword("comfirmPassword")}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {visiablity.confirmPassword ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            }
            sx={{
              input: {
                color: theme === 'dark' ? 'white' : 'black',
                backgroundColor: theme === 'dark' ? '#333' : '#f0f0f0', 
                borderColor: theme === 'dark' ? 'gray' : '#ccc', 
              },
              label: {
                color: theme === 'dark' ? 'white' : 'black',
              }
            }}
          />
          {errors.confirmPassword && (
            <Typography sx={{ color: "red", mt: "10px", fontSize: "13px" }}>
              *{errors.confirmPassword.message}
            </Typography>
          )}
        </Box>
        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? <CircularProgress color="inherit" size={20} /> : null
          }
          sx={{
            mt: "20px",
            backgroundColor: THEMECOLOR.mainBlue,
            width: "100%",
          }}
        >
          {isSubmitting ? t("RestForm.Reset...") : t("RestForm.Reset")}
        </Button>
      </form>
    </>
  );
}
