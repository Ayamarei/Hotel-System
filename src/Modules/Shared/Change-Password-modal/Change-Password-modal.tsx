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
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

type ChangePasswordData = any;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type ChangePassProps = {
  open: boolean;
  handleClose: () => void;
};
const passInputStyle = {};
export default function ChangePasswordModal({
  handleClose,
  open,
}: ChangePassProps) {
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
  const confirmNewPassword = watch("confirmNewPassword");
  useEffect(() => {
    if (confirmNewPassword) {
      trigger("confirmNewPassword");
    }
  }, [newPassword, confirmNewPassword, trigger]);

  const onSubmit = async (values: ChangePasswordData) => {
   

    try {
      const { data } = await privateUserAxiosInstance.put(
        USERS_URLS.CHANGE_PASSWORD,
        values
      );
      console.log(data);

      toast.success(data?.message);
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
          {/* Inputs */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl sx={{ display: "block", mt: "0.5rem" }}>
              <Typography>current password</Typography>
              <TextField
                {...register("oldPassword", {
                  required: "old password is required",
                })}
                type="password"
                placeholder="enter your current password"
                sx={passInputStyle}
              />
              {errors.oldPassword && (
                <Typography color="error">
                  {errors.oldPassword.message?.toString()}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ display: "block", mt: "0.5rem" }}>
              <Typography>new password</Typography>
              <TextField
                {...register("newPassword",PasswordValidation_Reset)}
                type="password"
                placeholder="enter your new password"
                sx={passInputStyle}
              />
              {errors.newPassword && (
                <Typography color="error">
                  {errors.newPassword.message?.toString()}
                </Typography>
              )}
            </FormControl>

            <FormControl sx={{ display: "block", mt: "0.5rem" }}>
              <Typography>confirm new password</Typography>
              <TextField
                {...register("confirmNewPassword", {
                  required: "please confirm your new password",
                  validate: (val: string) =>
                    val === newPassword || "Passwords do not match",
                })}
                type="password"
                placeholder="confirm your new password"
                sx={passInputStyle}
              />
              {errors.confirmNewPassword && (
                <Typography color="error">
                  {errors.confirmNewPassword.message?.toString()}
                </Typography>
              )}
            </FormControl>
            {/* Button to submit or close */}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
              disabled={isSubmitting}
            >
                {isSubmitting ? <RefreshRoundedIcon /> : "Change Password"}
                
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
