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
import Heading from '../../Modules/Shared/Heading/Heading';
import CustomTable from '../../Modules/Shared/CustomTable/CustomTable';
import { IColumLable } from '../../Interfaces/CustomTableInterface';

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
  const columnLabels:IColumLable[]= [
    { label: "Room Number", align: "left" },
  { label: "Images", align: "right" },
  { label: "Price", align: "right" },
  { label: "Capacity", align: "right" },
  { label: "Discount", align: "right" },
  { label: "Facilities", align: "right" },
  { label: "Actions", align: "right" }
  ];
return (
    <>
     
     <Heading to='/dashboard/add-room' title='Room' item='Room' />
   

     <CustomTable<IRoomData>
columnsLables={columnLabels}
loading={loading}
data={rooms}
room={true}

renderActions={(room) => (
  <Actions
    handleMenuClick={(e) => handleMenuClick(e, room)}
    anchorEl={anchorEl}
    handleOpenModal={handleOpenModal}
    handleOpenEdit={handleOpenEdit}
    handleOpenDelete={handleOpenDelete}
    handleMenuClose={handleMenuClose}
    room={room}
    selectedRoom={selectedRoom}
  />)}

/>
  

      {!loading && <PaginationList page={page} getAllList={getAllRooms} totalCount={Math.ceil(totalCount / 5)}  setpage={setpage} />}

   {selectedRoom &&   <ViewDetails handleCloseModal={handleCloseModal} openModal={openModal} room={selectedRoom} />}
      <DeleteConfirmation item='Room' open={openDeleteModal} setOpen={setOpenDeleteModal} deleteFun={deleteRoom} isDeleting={isDeleting}/>
    </>
  );
}
