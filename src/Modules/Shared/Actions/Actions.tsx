import { Button, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { IRoomData } from "../../../Interfaces/RoomInterface";
import { IFacility } from "../../../Interfaces/FacilitesInterface";
import { Iad } from "../../../Interfaces/AdsInterface";
import { IBookingData } from "../../../Interfaces/BookingData";
import { IUserData } from "../../../Interfaces/UserData";
import { useTranslation } from "react-i18next";

type List = IRoomData | IFacility | IBookingData | IUserData | Iad;

export default function Actions({
  handleMenuClick,
  anchorEl,
  handleOpenModal,
  handleOpenEdit,
  handleOpenDelete,
  handleMenuClose,
  selectedRoom,
  room,
  facility,
  booking,
  user,
  ads,
}: {
  handleMenuClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    room: List
  ) => void;
  anchorEl?: null | HTMLElement;
  handleOpenModal?: () => void;
  handleOpenEdit?: () => void;
  handleOpenDelete?: () => void;
  handleMenuClose?: () => void;
  selectedRoom?: List | null;
  room?: IRoomData;
  facility?: IFacility;
  ads?: Iad;
  booking?: IBookingData;
  user?: IUserData;
}) {
  const{t}=useTranslation();
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={anchorEl ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? "true" : undefined}
        onClick={(event) => {
          if (room) handleMenuClick(event, room);
          if (facility) handleMenuClick(event, facility);

          if (ads) handleMenuClick(event, ads);

          if (booking) handleMenuClick(event, booking);
          if (user) handleMenuClick(event, user);
        }}
      >
        <MoreVertIcon />
      </Button>
      {/* menu only opens when the btn is clicked (icon) */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={
          Boolean(anchorEl && selectedRoom === room) ||
          Boolean(anchorEl && selectedRoom == facility) ||
          Boolean(anchorEl && selectedRoom == booking) ||
          Boolean(anchorEl && selectedRoom == user) ||
          Boolean(anchorEl && selectedRoom == ads)
        }
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
        <MenuItem onClick={handleOpenModal} sx={{ gap: "10px" }}>
          <RemoveRedEyeIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> {t("Actions.view")}
        </MenuItem>
        {room && (
          <>
            <MenuItem onClick={handleOpenEdit} sx={{ gap: "10px" }}>
              <CreateIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> {t("Actions.Edit")}
            </MenuItem>
            <MenuItem onClick={handleOpenDelete} sx={{ gap: "10px" }}>
              <DeleteIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> {t("Actions.Delete")}
            </MenuItem>
          </>
        )}
        {facility && (
          <>
            <MenuItem onClick={handleOpenEdit} sx={{ gap: "10px" }}>
              <CreateIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> {t("Actions.Edit")}
            </MenuItem>
            <MenuItem onClick={handleOpenDelete} sx={{ gap: "10px" }}>
              <DeleteIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> {t("Actions.Delete")}
            </MenuItem>
          </>
        )}
        {ads && (
          <>
           
            <MenuItem onClick={handleOpenEdit} sx={{ gap: "10px" }}>
              <CreateIcon sx={{ color: "rgba(32, 63, 199, 1)" }} /> {t("Actions.Edit")}
            </MenuItem>
            <MenuItem onClick={handleOpenDelete} sx={{ gap: "10px" }}>
              <DeleteIcon sx={{ color: "rgba(32, 63, 199, 1)" }} />  {t("Actions.Delete")}
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
}
