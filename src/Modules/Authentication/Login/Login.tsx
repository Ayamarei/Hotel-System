

// export default function Login() {
//   return (
//     <>
//       login
//     </>
//   )
// }


import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Link, Button, FilledInput, FormControl, IconButton, InputAdornment, TextField, CircularProgress, InputLabel } from "@mui/material";
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


export default function Login() {
  let navigate =useNavigate()

  let { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ILogin>()

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

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };



  return (
    <>
      <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={{ width: "100%" }}>

        <InputLabel sx={{ color: THEMECOLOR.LabelColor }} htmlFor="filled-basic" >Email Address</InputLabel>
        <TextField id="filled-basic"
          sx={{ display: "flex", mt: "10px", width: "100%" }}
          {...register("email", EMAIL_VALIDATION)}
          variant="filled"
          placeholder="Please type here"
          error={!!errors.email}
        />
        {errors.email && (
          <span style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
            {errors.email.message}
          </span>
        )}

        <InputLabel sx={{ color: THEMECOLOR.LabelColor, mt: "30px" }} htmlFor="filled-basic" > Password</InputLabel>
        <FormControl sx={{ width: "100%" }}
          variant="filled">
          <FilledInput
            {...register("password", PASSWORD_VALIDATION)}
            placeholder="Please type here"
            error={!!errors.password}
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
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
          />
        </FormControl>

        {errors.password && (
          <span style={{ color: "red", fontSize: "14px", marginTop: "4px" }}>
            {errors.password.message}
          </span>
        )}

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
