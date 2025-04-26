import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { USERS_URLS } from "../../../Services/Urls";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { privateUserAxiosInstance } from "../../../Services/Axiosinstance";
import { PasswordValidation_Reset } from "../../../Services/Validation";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";
import { useTogglePassword } from "../../../hooks/useTogglePassword";
import {ChangePassProps,  ChangePasswordData} from '../../../Interfaces/AuthInterface'
import { useTranslation } from "react-i18next";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "5%",
  borderRadius: "17px",
  width: "50%",
};




const passInputStyle = { py: "1px", width: "100%", m: "0" };
export default function ChangePasswordModal({
  handleClose,
  open,
}: ChangePassProps) {
  const { toggleVisiblePassword, visiablity } = useTogglePassword();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    trigger,
  } = useForm<ChangePasswordData>({
    mode: "onChange",
  });
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [newPassword, confirmPassword, trigger]);

  const onSubmit = async (values: ChangePasswordData) => {
    try {
      const { data } = await privateUserAxiosInstance.post(
        USERS_URLS.CHANGE_PASSWORD,
        values
      );
      if (data?.message != "error") {
        toast.success(data?.message);
        handleClose();
      } else {
        toast.error("Something Went Wrong");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something Went Wrong");
      } else if (error instanceof Error) {
        toast.error(error.message || "Something Went Wrong");
      } else {
        toast.error("Something Went Wrong");
      }
    }
  };
const{t}=useTranslation();
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: "1rem",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Change Password
            </Typography>
            <IconButton edge="end" onClick={() => handleClose()}>
              <CloseIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>

          {/* Inputs */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ display: "block", mt: "0.5rem" }}>
              <Typography sx={{ mb: "0.5rem" }}>current password</Typography>
              <TextField
                {...register("oldPassword", {
                  required: "old password is required",
                })}
                type={visiablity.oldPassword ? "text" : "password"}
                placeholder="enter your current password"
                sx={passInputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => toggleVisiblePassword("oldPassword")}
                      >
                        {visiablity.oldPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.oldPassword && (
                <Typography color="error">
                  {errors.oldPassword.message?.toString()}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ display: "block", mt: "0.5rem" }}>
              <Typography sx={{ mb: "0.5rem" }}>new password</Typography>
              <TextField
                {...register("newPassword", PasswordValidation_Reset(t))}
                type={visiablity.password ? "text" : "password"}
                placeholder="enter your new password"
                sx={passInputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => toggleVisiblePassword("password")}
                      >
                        {visiablity.password ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.newPassword && (
                <Typography color="error">
                  {errors.newPassword.message?.toString()}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ display: "block", mt: "0.5rem" }}>
              <Typography sx={{ mb: "0.5rem" }}>
                confirm new password
              </Typography>
              <TextField
                {...register("confirmPassword", {
                  required: "please confirm your new password",
                  validate: (val: string) =>
                    val === newPassword || "Passwords do not match",
                })}
                type={visiablity.confirmPassword ? "text" : "password"}
                placeholder="confirm your new password"
                sx={passInputStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => toggleVisiblePassword("confirmPassword")}
                      >
                        {visiablity.confirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {errors.confirmPassword && (
                <Typography color="error">
                  {errors.confirmPassword.message?.toString()}
                </Typography>
              )}
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2, width: "100%" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "...Loading" : "Change Password"}
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
