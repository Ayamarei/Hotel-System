import * as React from "react";
import Button from "@mui/material/Button";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import { Link } from "react-router-dom";

export default function ChangePasswordButton() {
  const [openChangePasswordModal, setOpenChangePasswordModal] = React.useState(false);
  const handleOpenChangePasswordModal = () => setOpenChangePasswordModal(true);
  const handleCloseChangePasswordModal = () => setOpenChangePasswordModal(false);

  return (
    <>
      <Link to="" onClick={handleOpenChangePasswordModal}>Change Password</Link>
      <ChangePasswordModal
        handleClose={handleCloseChangePasswordModal}
        open={openChangePasswordModal}
      ></ChangePasswordModal>
    </>
  );
}
