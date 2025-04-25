import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { privateUserAxiosInstance } from '../../Services/Axiosinstance';
import PaginationList from '../../Modules/Shared/PaginationList/PaginationList';
import ViewDetails from '../ViewDetails';
import Actions from '../../Modules/Shared/Actions/Actions';
import { IRoomData, IRoomsResponse } from '../../Interfaces/RoomInterface';
import { ROOMS_URLS } from '../../Services/Urls';
import DeleteConfirmation from '../../Modules/Shared/DeleteConfirmation/DeleteConfirmation';
import Heading from '../../Modules/Shared/Heading/Heading';
import CustomTable from '../../Modules/Shared/CustomTable/CustomTable';
import { IColumnLabel } from '../../Interfaces/CustomTableInterface';
import noimg from '../../assets/images/no-img.jpeg'

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
      console.log(response?.data?.data?.rooms);
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
  // const columnLabels:IColumLable[]= [
  //   { label: "Room Number", align: "left" },
  // { label: "Images", align: "right" },
  // { label: "Price", align: "right" },
  // { label: "Capacity", align: "right" },
  // { label: "Discount", align: "right" },
  // { label: "Facilities", align: "right" },
  // { label: "Actions", align: "right" }
  // ];

  const columnLabels : IColumnLabel<IRoomData>[]= [
  { label: "Room Number", align: "left", accessor: (row) => row.roomNumber },
  { label: "Price", align: "right", accessor: (row) => `$${row.price}` },
  { label: "Capacity", align: "right", accessor: (row) => row.capacity },
  { label: "Discount", align: "right", accessor: (row) => `${row.discount}%` },
  { label: "Facilities", align: "left", accessor: (row) => row.facilities?.map((f) => f.name).join(", ") },
  { label: "Created By", align: "left", accessor: (row) => row.createdBy?.userName },
  {
    label: "Image",
    align: "center",
    accessor: (row) => (
      <img
        src={row.images?.[0] || noimg}
        alt="Room"
        style={{ width: "56px", height: "56px", borderRadius: "8px" }}
      />
    ),
  },
];


return (
    <>
     
     <Heading to='/dashboard/add-room' title='Room' item='Room' />
   
     <CustomTable<IRoomData>
      columnsLabels={columnLabels}
      loading={loading}
      data={rooms}
      renderActions={(room) => (
        <Actions
          entityType="room"
          handleMenuClick={(e) => handleMenuClick(e, room)}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModal}
          handleOpenEdit={handleOpenEdit}
          handleOpenDelete={handleOpenDelete}
          handleMenuClose={handleMenuClose}
          selectedEntity={selectedRoom}
          entity={room}
        />)}
        

/>
  

      {!loading && <PaginationList page={page} getAllList={getAllRooms} totalCount={Math.ceil(totalCount / 5)}  setpage={setpage} />}

   {selectedRoom && <ViewDetails
      open={openModal}
      onClose={handleCloseModal}
      data={selectedRoom}
      title={`User: ${selectedRoom.roomNumber}`}
      fields={[
        { label: "Price", accessor: (data) => `${data.price} EGP` },
        { label: "Capacity", accessor: (data) => data.capacity },
        { label: "Discount", accessor: (data) => `${data.discount}%` },
        { label: "Created By", accessor: (data) => data?.createdBy?.userName },
        {
        label: "Facilities",
        accessor: (data) => {
          if (data?.facilities && data.facilities.length > 0) {
            return data.facilities.map((f) => f.name).join(", ");
          }
          return "No facilities available";
        },
      }

      ]}
      images={selectedRoom.images}
    />}
      <DeleteConfirmation item='Room' open={openDeleteModal} setOpen={setOpenDeleteModal} deleteFun={deleteRoom} isDeleting={isDeleting}/>
    </>
  );
}
