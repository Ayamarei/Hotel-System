
import { Box, Link, Button, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { THEMECOLOR } from "../../../Services/ThemeColors";
import { useForm } from "react-hook-form";
import { ILogin } from "../../../Interfaces/AuthInterface.ts"
import { publicUserAxiosInstance } from "../../../Services/Axiosinstance";
import { USERS_URLS } from "../../../Services/Urls.ts";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../../Services/Validation.ts";
import { AuthContext } from "../../../context/AuthContext.tsx";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../Shared/CustomInput/CustomInput.tsx";


export default function Login() {
  let navigate = useNavigate()

  let { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ILogin>({ mode: "onTouched" })

  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be used within AuthProvider");
  const { loginData, saveLoginData } = context;

  // const{loginData, saveLoginData}= useContext(AuthContext)

  const onSubmit = async (data: ILogin) => {
    try {

      const response = await publicUserAxiosInstance.post(USERS_URLS.LOGIN, data)
      console.log(response.data);

      const token = response.data.data.token;
      toast.success(response?.data?.message)
      console.log(response?.data?.message);
      navigate("/dashboard")


      if (token) {
        localStorage.setItem("token", token);
        saveLoginData();
      }


    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Login failed");
    }

  }



  console.log(loginData);


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  return (
    <>
      <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={{ width: "100%" }}>

        <CustomInput
          label="Email Address"
          type="text"
          placeholder="Please type here"
          register={register}
          name="email"
          error={errors.email?.message}
          rules={EMAIL_VALIDATION}
        />


        <CustomInput
          label="Password"
          type="password"
          placeholder="Please type your password"
          register={register}
          name="password"
          error={errors.password?.message}
          showPassword={showPassword}
          onTogglePasswordVisibility={handleClickShowPassword}
          rules={PASSWORD_VALIDATION}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress color="inherit" size={20} /> : null}
          sx={{
            backgroundColor: THEMECOLOR.mainBlue,
            margin: 'auto',
            width: "100%",
            my: "20px",
            mt: "40px",
            padding: "15px"
          }}
        >
          {isSubmitting ? " Login..." : " Login"}
        </Button>
        <Link sx={{ textDecoration: "none", color: THEMECOLOR.lightGrag, display: "flex", justifyContent: "end" }}
          href="/forget-password"> Forgot Password ?</Link>
      </Box>
    </>
  )
}
