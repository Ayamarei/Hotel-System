

import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";

import AdsFormModal from "../AdsData/AdsData";
import DeleteConfirmation from "../../Modules/Shared/DeleteConfirmation/DeleteConfirmation";
import { ADS_URLS } from "../../Services/Urls";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Adslist() {
  const [AdsList, setAdsList] = React.useState<any[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<any>(null);
  const [openFormModal, setOpenFormModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [selectedAdId, setSelectedAdId] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleOpenForm = (item: any = null) => {
    setSelectedItem(item);
    setOpenFormModal(true);
  };

  const handleCloseForm = () => {
    setSelectedItem(null);
    setOpenFormModal(false);
  };

  const handleDelete = (ad: any) => {
    setSelectedAdId(ad._id);
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      await privateUserAxiosInstance.delete(ADS_URLS.DELETE_ADS(selectedAdId));
      setAdsList((prev) => prev.filter((ad) => ad._id !== selectedAdId));
      toast.success("Ad deleted successfully");
      setOpenDeleteModal(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
  };

  const getAllAds = async () => {
    try {
      const { data } = await privateUserAxiosInstance.get(ADS_URLS.GET_ALL_ADS,{ page:3,size:3});
      setAdsList(data.data.ads);
    } catch (error) {
      toast.error("Something went wrong while fetching ads");
    }
  };

  React.useEffect(() => {
    getAllAds();
  }, []);

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpenForm()}>
        Add New Ads
      </Button>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Room Number</StyledTableCell>
              <StyledTableCell align="right">Capacity</StyledTableCell>
              <StyledTableCell align="right">Discount</StyledTableCell>
              <StyledTableCell align="right">Date</StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {AdsList.map((AdsItem, index) => (
              <StyledTableRow key={AdsItem._id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell align="right">
                  {AdsItem.isActive ? "Active" : "Inactive"}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {AdsItem.room?.roomNumber}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {AdsItem.room?.capacity}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {AdsItem.room?.discount}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {AdsItem.createdAt?.slice(0, 10)}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <span
                    onClick={() => handleOpenForm(AdsItem)}
                    style={{ cursor: "pointer", marginRight: 10 }}
                    title="View / Edit"
                  >
                    ✏️
                  </span>
                  <span
                    onClick={() => handleDelete(AdsItem)}
                    style={{ cursor: "pointer" }}
                    title="Delete"
                  >
                    🗑️
                  </span>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AdsFormModal
        open={openFormModal}
        handleClose={handleCloseForm}
        selectedItem={selectedItem}
        getAllAds={getAllAds}
      />

      <DeleteConfirmation
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteFun={confirmDelete}
        isDeleting={isDeleting}
        item={"Ad"}
      />
    </div>
  );
}
