import { Box, Button, CircularProgress } from "@mui/material";
import  { useContext, useEffect, useState } from "react";
import { THEMECOLOR } from "../../../Services/ThemeColors";
import { useForm } from "react-hook-form";
import { ILogin } from "../../../Interfaces/AuthInterface.ts";
import { publicUserAxiosInstance } from "../../../Services/Axiosinstance";
import { USERS_URLS } from "../../../Services/Urls.ts";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../Services/Validation.ts";
import { AuthContext } from "../../../context/AuthContext.tsx";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../Shared/CustomInput/CustomInput.tsx";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../context/ThemeContext.tsx";
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const ContextColor = useContext(ThemeContext);
  if (!ContextColor) throw new Error("ThemeContext must be used within ThemeProvider");
  const { theme } = ContextColor;

  const authContext = useContext(AuthContext);
  if (!authContext) throw new Error("AuthContext must be used within AuthProvider");
  const { saveLoginData, loginData } = authContext;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILogin>({ mode: "onTouched" });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: ILogin) => {
    try {
      const response = await publicUserAxiosInstance.post(USERS_URLS.LOGIN, data);
      const token = response.data.data.token;
      toast.success(response?.data?.message);

      if (token) {
        localStorage.setItem("token", token);
        const user = await saveLoginData(); 

        if (user?.role === "admin") {
          navigate("/dashboard");
        } else if (user?.role === "user") {
          navigate("/");
        }
      }
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message ?? err.message ?? "Login failed");
    }
  };

  useEffect(() => {
    if (!loginData) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    if (loginData.role === "admin") {
      navigate("/dashboard");
    } else if (loginData.role === "user") {
      navigate("/");
    }
  }, [loginData]);

  return (
    <>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        sx={{ width: "100%" }}
      >
        <CustomInput
          label={t("LoginForm.Email")}
          type="text"
          placeholder={t("LoginForm.Please-type")}
          register={register}
          name="email"
          error={errors.email?.message}
          rules={EMAIL_VALIDATION(t)}
          sx={{
            input: {
              color: theme === "dark" ? "white" : "black",
              backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
              borderColor: theme === "dark" ? "gray" : "#ccc",
            },
            label: {
              color: theme === "dark" ? "white" : "black",
            },
          }}
        />

        <CustomInput
          label={t("LoginForm.Password")}
          type="password"
          placeholder={t("LoginForm.Please-type")}
          register={register}
          name="password"
          error={errors.password?.message}
          showPassword={showPassword}
          onTogglePasswordVisibility={handleClickShowPassword}
          rules={PASSWORD_VALIDATION(t)}
          sx={{
            input: {
              color: theme === "dark" ? "white" : "black",
              backgroundColor: theme === "dark" ? "#333" : "#f0f0f0",
              borderColor: theme === "dark" ? "gray" : "#ccc",
            },
            label: {
              color: theme === "dark" ? "white" : "black",
            },
          }}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          startIcon={
            isSubmitting ? (
              <CircularProgress color="inherit" size={20} />
            ) : null
          }
          sx={{
            backgroundColor:
              theme === "dark" ? "#1976d2" : THEMECOLOR.mainBlue,
            color: "white",
            "&:hover": {
              backgroundColor: theme === "dark" ? "#115293" : "#0d47a1",
            },
            margin: "auto",
            width: "100%",
            my: "20px",
            mt: "40px",
            padding: "15px",
          }}
        >
          {isSubmitting ? t("LoginForm.Login...") : t("LoginForm.Login")}
        </Button>

        <Link
        component={RouterLink}
          sx={{
            textDecoration: "none",
            color: theme === "dark" ? "#ccc" : THEMECOLOR.lightGrag,
            display: "flex",
            justifyContent: "end",
          }}
          to="/auth/forget-password"
        >
          {t("LoginForm.Forget-Password")}
        </Link>
      </Box>
    </>
  );
}
