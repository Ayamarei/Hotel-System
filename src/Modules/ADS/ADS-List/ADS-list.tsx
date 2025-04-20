import * as React from "react";
import Button from "@mui/material/Button";
import AdsFormModal from "../ADS-Form/ADS-Form";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { ADS_URLS } from "../../../Services/Urls";
import { privateUserAxiosInstance } from "../../../Services/Axiosinstance";

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

//     createdAt
// : 
// "2025-04-19T12:22:03.410Z"
// createdBy
// : 
// {_id: '67fe532f662a988e021f35bd', userName: 'eman2'}
// isActive
// : 
// true
// room
// : 
// {_id: '67d034f5662a988e021e2a62', roomNumber: '603', price: 200, capacity: 4, discount: 66, …}
// updatedAt
// : 
// "2025-04-19T12:22:03.410Z"
// _id
// : 
// "6803956b662a988e021f5dac"

    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
              <StyledTableCell align="right"> </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.calories}</StyledTableCell>
                <StyledTableCell align="right">{row.fat}</StyledTableCell>
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
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
