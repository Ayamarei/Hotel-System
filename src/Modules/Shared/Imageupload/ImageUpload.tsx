// ImageUpload.tsx
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

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

interface ImageUploadProps {
  uploadSuccess: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleUploadNewImage: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  uploadSuccess,
  handleFileChange,
  handleUploadNewImage,
}) => {
  const{t}=useTranslation()
  return (
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
          variant="outlined"
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
         {t("RegisterForm.Upload-Image")}
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
          <Typography variant="body1">{t("RegisterForm.Image-uploaded")}</Typography>
          <Button
            variant="text"
            onClick={handleUploadNewImage}
            sx={{ color: "#dc3545" }}
          >
            {t("RegisterForm.Remove")}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
