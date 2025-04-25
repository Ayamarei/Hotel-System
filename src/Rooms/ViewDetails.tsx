import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IViewDetailsProps<T> {
  open: boolean;
  data?: T; // Generic data
  onClose: () => void; // Close handler
  fields: { label: string; accessor: (data: T) => React.ReactNode }[]; // Dynamic fields
  images?: string[]; // Optional images array
  title?: string; // Optional modal title
}

const ViewDetails = <T,>({
  open,
  data,
  onClose,
  fields,
  images,
  title,
}: IViewDetailsProps<T>) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: 600, margin: "auto", mt: 10, p: 3, bgcolor: "white", borderRadius: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: "30px" }}>
          <Typography variant="h6" component="h2">
            {title || "Details"}
          </Typography>
          <Button onClick={onClose} sx={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
            <CloseIcon />
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ width: "50%" }}>
            {fields.map((field, index) => (
              <Typography key={index} sx={{ mt: 2 }} component={"div"}>
                <Typography component={"span"} sx={{ fontWeight: 700 }}>
                  {field.label}:
                </Typography>{" "}
                {data ? field.accessor(data) : "N/A"}
              </Typography>
            ))}
          </Box>

          <Box sx={{ width: "50%" }}>
            {images && images.length > 0 && (
              <>
                <Typography sx={{ mb: 2 }}>Images:</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Entity"
                      style={{ objectFit: "cover", borderRadius: "8px" }}
                      height={120}
                      width={120}
                    />
                  ))}
                </Box>
              </>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: "20px", display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={onClose} variant="outlined">
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ViewDetails;
