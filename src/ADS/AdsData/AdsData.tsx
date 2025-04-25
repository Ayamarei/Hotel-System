import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ADS_URLS } from "../../Services/Urls";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

type AdItem = {
  _id: string;
  room: string;
  discount: number;
  isActive: boolean;
};

type AdsFormProps = {
  open: boolean;
  handleClose: () => void;
  selectedItem: AdItem | null;
};

type AdsData = {
  room: string;
  discount: number;
  isActive: boolean;
};

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

export default function AdsFormModal({
  open,
  handleClose,
  selectedItem,
}: AdsFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AdsData>({
    mode: "onChange",
  });

  const addNewAd = async (values: AdsData) => {
    try {
      await privateUserAxiosInstance.post(ADS_URLS.CREATE_NEW_ADS, values);
      toast.success("Ad added successfully");
      handleClose();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const editAd = async (values: AdsData) => {
    try {
      await privateUserAxiosInstance.put(
        ADS_URLS.EDIT_ADS(selectedItem!._id),
        values
      );
      toast.success("Ad updated successfully");
      handleClose();
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const getAdDataById = async (_id: string) => {
    try {
      const response = await privateUserAxiosInstance.get(
        ADS_URLS.GET_ADS_DETAILS_BY_ID(_id!)
      );

      const data = response.data.data.ads;
      console.log(data);
      setValue("room", data.room.roomNumber);
      setValue("discount", data.room.discount);
      setValue("isActive", data.isActive);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Failed to load ad data");
    }
  };

  useEffect(() => {
    if (selectedItem) {
      getAdDataById(selectedItem._id);
    }
  }, [selectedItem]);

  const onSubmit = async (values: AdsData) => {
    const correctedValues = {
      ...values,
      isActive: values.isActive === "true",
    };

    if (selectedItem) {
      editAd(values);
    } else {
      addNewAd(values);
    }
  };

  return (
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
            Ads
          </Typography>
          <IconButton edge="end" onClick={() => handleClose()}>
            <CloseIcon sx={{ fontSize: 30 }} />
          </IconButton>
        </Box>

        {/* Inputs */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ display: "block", mt: "0.5rem" }}>
            <TextField
              {...register("room", {
                required: "room is required",
              })}
              type="text"
              placeholder="Room Name"
              sx={passInputStyle}
            />
            {errors.room && (
              <Typography color="error">
                {errors.room.message?.toString()}
              </Typography>
            )}
          </FormControl>

          <FormControl sx={{ display: "block", mt: "0.5rem" }}>
            <TextField
              {...register("discount", {
                required: "discount is required",
              })}
              type="text"
              placeholder="Discount"
              sx={passInputStyle}
            />
            {errors.discount && (
              <Typography color="error">
                {errors.discount.message?.toString()}
              </Typography>
            )}
          </FormControl>

          {/* <FormControl sx={{ display: "block", mt: "0.5rem" }}>
            <TextField
              {...register("isActive", {
                required: "status is required",
              })}
              type="text"
              placeholder="Active"
              sx={passInputStyle}
            />

            {errors.isActive && (
              <Typography color="error">
                {errors.isActive.message?.toString()}
              </Typography>
            )}
          </FormControl> */}
          <FormControl fullWidth sx={{ display: "block", mt: "0.5rem" }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={selectedItem ? String(selectedItem.isActive) : ""}
              value={"isActive"}
              label="Status"
              sx={passInputStyle}
              {...register("isActive", {
                required: "status is required",
              })}
            >
              <MenuItem value={true}>active</MenuItem>
              <MenuItem value={false}>inactive</MenuItem>
            </Select>
            {errors.isActive && (
              <Typography color="error">
                {errors.isActive.message?.toString()}
              </Typography>
            )}
          </FormControl>
          {/* Button to submit or close */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, width: "100%" }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "...Loading" : "Save"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
