import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Box, Button,   Typography } from '@mui/material';


import { Link, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

import { privateUserAxiosInstance } from '../../Services/Axiosinstance';
import PaginationList from '../../Modules/Shared/PaginationList/PaginationList';
import ViewDetails from '../ViewDetails';

import NoData from '../../Modules/Shared/NoData/NoData';
import Actions from '../../Modules/Shared/Actions/Actions';
import Loading from '../../Modules/Shared/Loading/Loading';
import { IRoomData, IRoomsResponse } from '../../Interfaces/RoomInterface';
import { ROOMS_URLS } from '../../Services/Urls';
import noimg from '../../assets/images/no-img.jpeg'
import DeleteConfirmation from '../../Modules/Shared/DeleteConfirmation/DeleteConfirmation';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(226, 229, 235, 1)",
    color:" rgba(31, 38, 62, 1)",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));






export default function RoomsList() {
  const [rooms, setRooms] = React.useState<IRoomData[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpen] = React.useState(false);
  const [page, setpage] = React.useState(1);
  const navigate=useNavigate()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRoom, setselectedRoom] = React.useState<IRoomData | null>(null);
  const [isDeleting,setIsDeleting]=React.useState(false)


  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>,room:IRoomData) => {
    setAnchorEl(event.currentTarget);//btn
    setselectedRoom(room);
  };
  
  const handleMenuClose = () => {
    // close the menu
    setAnchorEl(null);
  };
  
  const handleOpenModal = async () => {
    if (selectedRoom) {
      setOpen(true);
      handleMenuClose();
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setselectedRoom(null);
  };

  // delete modal 
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const handleOpenDelete = () => {
      if(selectedRoom){
        setOpenDeleteModal(true);
        handleMenuClose()

      }

    };

const handleCloseDelete = () => setOpenDeleteModal(false);
// delete room 
const deleteRoom=async()=>{
  setIsDeleting(true)
  try {
    if(selectedRoom){
      await privateUserAxiosInstance.delete(ROOMS_URLS.DELETE_ROOMS(selectedRoom?._id))
        getAllRooms(5,1)
        handleCloseDelete()
        toast.success('Room deleted successfully')

    }
  } catch (error) {
    console.log(error)
    if(error instanceof AxiosError){
      toast.error(error?.response?.data?.message ||
    "Something went wrong. Please try again later.")
    }

  }finally{
    setIsDeleting(false)
  }
}
// get all rooms
  const getAllRooms = async (size:number,page:number) => {
    setLoading(true);
    try {
      const response = await privateUserAxiosInstance.get<IRoomsResponse>(ROOMS_URLS.GET_ROOMS, {
        params: {
          page,
          size
        },
      });
      setRooms(response?.data?.data?.rooms);
      setTotalCount(response?.data?.data?.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const handleOpenEdit=()=>{
    handleMenuClose()
    navigate(`/dashboard/rooms-data/${selectedRoom?._id}`)
  }

  React.useEffect(() => {
    getAllRooms(5,1);
  }, []);
return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center",flexDirection:{sm:'column',md:"row"} }}>
        <Box>
          <Typography sx={{ color: 'rgba(31, 38, 62, 1)', fontWeight: 500, fontSize: '20px' }}>Rooms Table Details</Typography>
          <Typography sx={{ color: 'rgba(50, 60, 71, 1)', fontSize: "14px" }}>You can check all details</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard/add-room"
          sx={{ px: '50px', py: "15px", backgroundColor: "rgba(32, 63, 199, 1)",mt:{sx:'20px',md:0} }}
        >
          Add new Room
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mt: '30px' }}>
     
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          {!loading  && 
            <TableHead>
              <TableRow>
                <StyledTableCell>roomNumber</StyledTableCell>
                <StyledTableCell align="right">images</StyledTableCell>
                <StyledTableCell align="right">price</StyledTableCell>
                <StyledTableCell align="right">capacity</StyledTableCell>
                <StyledTableCell align="right">discount</StyledTableCell>
                <StyledTableCell align="right">facilities</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
          }
          <TableBody>
            {loading ? (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center"><Loading /></StyledTableCell>
              </StyledTableRow>
            ) : rooms.length > 0 ? (
              rooms.map((room) => (
                <StyledTableRow key={room._id}>
                  <StyledTableCell component="th" scope="row">{room.roomNumber}</StyledTableCell>
                  <StyledTableCell align="right">
                    <img src={room?.images[0] || noimg} style={{ width: '56px', height: '56px', borderRadius: '8px' }} />
                  </StyledTableCell>
                  <StyledTableCell align="right">{room.price}</StyledTableCell>
                  <StyledTableCell align="right">{room.capacity}</StyledTableCell>
                  <StyledTableCell align="right">{room.discount}</StyledTableCell>
                  <StyledTableCell align="right">{room.facilities[0]?.name}</StyledTableCell>
                  <StyledTableCell align="right">
             <Actions handleMenuClick={(e)=>handleMenuClick(e,room)} 
                 anchorEl={anchorEl} handleOpenModal={handleOpenModal}
                 handleOpenEdit={handleOpenEdit} 
                 handleOpenDelete={handleOpenDelete}
                 handleMenuClose={handleMenuClose}
                 room={room}
                 selectedRoom={selectedRoom} />
                  </StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell colSpan={7} align="center"><NoData /></StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {!loading && <PaginationList page={page} getAllList={getAllRooms} totalCount={Math.ceil(totalCount / 5)}  setpage={setpage} />}

   {selectedRoom &&   <ViewDetails handleCloseModal={handleCloseModal} openModal={openModal} room={selectedRoom} />}
      <DeleteConfirmation item='Room' open={openDeleteModal} setOpen={setOpenDeleteModal} deleteFun={deleteRoom} isDeleting={isDeleting}/>
    </>
  );
}
