import * as React from "react";
import Button from "@mui/material/Button";
import AdsFormModal from "../AdsData/AdsData";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { ADS_URLS } from "../../Services/Urls";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import ChangePasswordButton from "../../Modules/Shared/Change-Password-button/Change-Password-button";
import Actions from "../../Modules/Shared/Actions/Actions";


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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Adslist() {
  const [selectedItem, setSelectedItem] = React.useState("");
  // const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const [AdsList, setAdsList] = React.useState<any[]>([]);

  const getAllAds = async () => {
    try {
      const { data } = await privateUserAxiosInstance.get(ADS_URLS.GET_ALL_ADS);
      setAdsList(data.data.ads);
      console.log(data.data.ads);
    } catch (error) {
      toast.error("some thing went wrong");
    }
  };

  const deleteAd = async (id: string) => {
    try {
      let response = await privateUserAxiosInstance.delete(ADS_URLS.DELETE_ADS(id));
      setAdsList((prev) => prev.filter((ad) => ad.id !== id));
      console.log(response);
      toast.success("Ads deleted successfully");
    } catch (error) {
      console.log(error);
      toast.error("some thing went wrong");
    }
  };

  React.useEffect(()=>{getAllAds();},[])

  return (

    <div>
      <TableContainer component={Paper}>
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
        <StyledTableCell component="th" scope="row">
          {index + 1}
        </StyledTableCell>
        <StyledTableCell align="right">
          {AdsItem.isActive ? "Active" : "Inactive"}
        </StyledTableCell>
        <StyledTableCell align="right">{AdsItem.room.roomNumber}</StyledTableCell>
        <StyledTableCell align="right">{AdsItem.room.capacity}</StyledTableCell>
        <StyledTableCell align="right">{AdsItem.room.discount}</StyledTableCell>
        <StyledTableCell align="right">
          {AdsItem.createdAt.slice(0, 10)}
        </StyledTableCell>
        <StyledTableCell align="right">
          <span onClick={() => handleView(AdsItem)} style={{ cursor: "pointer", marginRight: 10 }}>👁️</span>
          <span onClick={() => handleEdit(AdsItem)} style={{ cursor: "pointer", marginRight: 10 }}>✏️</span>
          <span onClick={() => handleDelete(AdsItem)} style={{ cursor: "pointer" }}>🗑️</span>
          {/* <Actions></Actions> */}
        </StyledTableCell>
      </StyledTableRow>
    ))}
  </TableBody>
</Table>

      </TableContainer>

      <Button onClick={handleOpen}>Edit Ads</Button>
      <Button onClick={handleOpen}>Add New Ads</Button>
      <AdsFormModal
        handleClose={handleClose}
        open={open}
        selectedItem={selectedItem}
      ></AdsFormModal>
    </div>
  );
}