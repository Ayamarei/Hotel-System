import { Box, Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { IActionProps } from "../../../Interfaces/ActionsProps";



export default function Actions<T>({
  entityType,
  handleMenuClick,
  anchorEl,
  handleOpenModal,
  handleOpenEdit,
  handleOpenDelete,
  handleMenuClose,
  selectedEntity,
  entity,
}: IActionProps<T>) {
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        onClick={(event) => {
          if (entity) handleMenuClick(event, entity);
        }}
      >
        <MoreVertIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl && selectedEntity === entity)}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            sx: {
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              borderRadius: "16px",
              minWidth: "150px",
            },
          },
        }}
      >
        {entityType === "user" || entityType === "booking" ? (
          
            <MenuItem key="view" onClick={handleOpenModal} sx={{ gap: "10px" }}>
              <RemoveRedEyeIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> View
            </MenuItem>

          
        ) : (
          <Box>
            <MenuItem key="view" onClick={handleOpenModal} sx={{ gap: "10px" }}>
              <RemoveRedEyeIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> View
            </MenuItem>
            <MenuItem key="edit" onClick={handleOpenEdit} sx={{ gap: "10px" }}>
              <CreateIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> Edit
            </MenuItem>
            <MenuItem key="delete" onClick={handleOpenDelete} sx={{ gap: "10px" }}>
              <DeleteIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> Delete
            </MenuItem>
          </Box>
        )}
      </Menu>
    </>
  );
}
