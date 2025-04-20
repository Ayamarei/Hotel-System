
import {
  TextField,
  Grid,
  Box,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
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
import { publicUserAxiosInstance } from "../../../Services/Axiosinstance";
import { USERS_URLS } from "../../../Services/Urls";
import ImageUpload from "../../Shared/Imageupload/ImageUpload";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { useTranslation } from "react-i18next";
export default function Register() {
  const [uploadedImage, setUploadedImage] = React.useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const navigate=useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
 
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
  const dataEntries = {
    userName: data.userName,
    phoneNumber: data.phoneNumber,
    country: data.country,
    email: data.email,
    password: data.password,
    confirmPassword: data.confirmPassword,
    role: "user"
  };
  for (const [key, value] of Object.entries(dataEntries)) {
    formData.append(key, value);
  }
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

    toast.success(response.data?.message)
   navigate('/login')
  }catch (error) {
    console.log(error)
      if(error instanceof AxiosError){
        toast.error(error?.response?.data?.message||'Something Went Wrong')
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
const { t } = useTranslation();
  return (
   <>
<form onSubmit={handleSubmit(onSubmit)}>
      <CustomInput
        label="Username"
        type="text"
        placeholder={t("RegisterForm.Please-type")}
        register={register}
        name="userName"
        error={errors.userName?.message}
        rules={USER_NAME_VALIDATION}
      />
        <Box sx={{ width: "100%" }}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={6}>
              <CustomInput
                label="Phone number"
                type="text"
                placeholder="Please type here ..."
                register={register}
                name="phoneNumber"
                error={errors.phoneNumber?.message}
                rules={PHONE_VALIDATION}
              />
            </Grid>

            <Grid size={6}>
              <CustomInput
                label="Country"
                type="text"
                placeholder="Please type here ..."
                register={register}
                name="country"
                error={errors.country?.message}
                rules={COUNTRY_VALIDATION}
              />
            </Grid>
          </Grid>
        </Box>
        <CustomInput
        label="Email"
        type="email"
        placeholder="Please type here ..."
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
        <CustomInput
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Please confirm your password"
          register={register}
          name="confirmPassword"
          error={errors.confirmPassword?.message}
          showPassword={showConfirmPassword}
          onTogglePasswordVisibility={handleClickShowConfirmPassword}
          rules={{
            ...CONFIRMPASSWORD_VALIDATION,
            validate: (confirmPassword) =>
              confirmPassword === watch("password") || "Passwords do not match",
          }}
        />

        <ImageUpload
                uploadSuccess={uploadSuccess}
                handleFileChange={handleFileChange}
                handleUploadNewImage={handleUploadNewImage}
              />
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