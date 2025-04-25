import * as React from 'react';
import { IBookingData, IBookingResponseData } from "../../Interfaces/BookingData";
import { privateUserAxiosInstance } from '../../Services/Axiosinstance';
import { ADMIN_BOOKINGS_URLS } from '../../Services/Urls';
import { IColumLable } from '../../Interfaces/CustomTableInterface';
import Heading from '../../Modules/Shared/Heading/Heading';
import CustomTable from '../../Modules/Shared/CustomTable/CustomTable';
import PaginationList from '../../Modules/Shared/PaginationList/PaginationList';
import ViewBooking from '../ViewBooking/ViewBooking';
import Actions from '../../Modules/Shared/Actions/Actions';




export default function ListBooking() {
  const [bookings, setBookings] = React.useState<IBookingData[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpen] = React.useState(false);
  const [page, setpage] = React.useState(1);


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedBooking, setselectedBooking] = React.useState<IBookingData | null>(null);


  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, booking: IBookingData) => {
    setAnchorEl(event.currentTarget);
    setselectedBooking(booking);
  };


  const handleMenuClose = () => {
    // close the menu
    setAnchorEl(null);
  };

  const handleOpenModal = async () => {
    if (selectedBooking) {
      setOpen(true);
      handleMenuClose();
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setselectedBooking(null);
  };

  
  // get all bookings
  const getAllBookings = async (size: number, page: number) => {
    setLoading(true);
    try {
      const response = await privateUserAxiosInstance.get<IBookingResponseData>(ADMIN_BOOKINGS_URLS.GET_ALL_BOOKINGS, {
        params: {
          page,
          size
        },
      });
      setBookings(response?.data?.data?.booking);
      setTotalCount(response?.data?.data?.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
    getAllBookings(5, 1);
  }, []);
  const columnLabels: IColumLable[] = [
    { label: "Room Number", align: "left" },
    { label: "Total Price", align: "right" },
    { label: "Start Date", align: "right" },
    { label: "End Date", align: "right" },
    { label: "User", align: "right" },
    { label: "Actions", align: "right" }
  ];
  return (
    <>

      <Heading title='Booking' item='booking' />


      <CustomTable<IBookingData>
        columnsLables={columnLabels}
        loading={loading}
        data={bookings}
        booking={true}
        renderActions={(booking) => (
        <Actions
          handleMenuClick={(e) => handleMenuClick(e, booking)}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModal}
          handleMenuClose={handleMenuClose}
          booking={booking}
          selectedRoom={selectedBooking}
        />)}

      />


      {!loading && <PaginationList page={page} getAllList={getAllBookings} totalCount={Math.ceil(totalCount / 5)} setpage={setpage} />}

      {selectedBooking && <ViewBooking handleCloseModal={handleCloseModal} openModal={openModal} booking={selectedBooking} />}
     
    </>
  );
}
