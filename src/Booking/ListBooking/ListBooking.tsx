import * as React from 'react';
import { privateUserAxiosInstance } from '../../Services/Axiosinstance';
import PaginationList from '../../Modules/Shared/PaginationList/PaginationList';
import Actions from '../../Modules/Shared/Actions/Actions';
import Heading from '../../Modules/Shared/Heading/Heading';
import CustomTable from '../../Modules/Shared/CustomTable/CustomTable';
import { IColumnLabel } from '../../Interfaces/CustomTableInterface';
import { IBookingData, IBookingResponseData, IResponseData } from '../../Interfaces/BookingData';
import { ADMIN_BOOKINGS_URLS } from '../../Services/Urls';
import ViewDetails from '../../Rooms/ViewDetails';

export default function ListBooking() {
  const [bookings, setBookings] = React.useState<IBookingData[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpen] = React.useState(false);
  const [page, setpage] = React.useState(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedBooking, setSelectedBooking] = React.useState<IBookingData | null>(null);


  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>,room:IBookingData) => {
    setAnchorEl(event.currentTarget);//btn
    setSelectedBooking(room);
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
    setSelectedBooking(null);
  };


const getAllbookings = async (size: number, page: number) => {
  setLoading(true);
  try {

    const response = await privateUserAxiosInstance.get<IResponseData<IBookingResponseData>>(
      ADMIN_BOOKINGS_URLS.GET_ALL_BOOKINGS,
      {
        params: {
          page,
          size,
        },
      }
    );

    // Access the nested response structure
    const bookings = response?.data?.data?.booking;
    const totalCount = response?.data?.data?.totalCount;

    console.log(bookings);
    setBookings(bookings); // Make sure you have a `setBookings` state
    setTotalCount(totalCount);
  } catch (error) {
    console.error("Error fetching bookings:", error);
  } finally {
    setLoading(false);
  }
};



  React.useEffect(() => {
    getAllbookings(5,1);
  }, []);

  const columnLabels : IColumnLabel<IBookingData>[]= [
  { label: "Room Number", align: "left", accessor: (row) => row.room.roomNumber },
  { label: "price", align: "left", accessor: (row) => `$${row.totalPrice}` },
  { label: "startDate", align: "left", accessor: (row) =>  new Date(row?.startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }) || "N/A"  },
  { label: "endDate", align: "left", accessor: (row) => new Date(row?.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }) || "N/A" },
  { label: "Status", align: "left", accessor: (row) => row.status },

];


return (
    <>
     
     <Heading title='bookings' />
   
     <CustomTable<IBookingData>
      columnsLabels={columnLabels}
      loading={loading}
      data={bookings}
      renderActions={(user) => (
        <Actions
        entityType="user"
          handleMenuClick={(e) => handleMenuClick(e, user)}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModal}
          handleMenuClose={handleMenuClose}
          selectedEntity={selectedBooking}
          entity={user}
        />
        
      
      )}

/>
  

      {!loading && <PaginationList page={page} getAllList={getAllbookings} totalCount={Math.ceil(totalCount / 5)}  setpage={setpage} />}

      {selectedBooking &&   <ViewDetails
          open={openModal}
          onClose={handleCloseModal}
          data={selectedBooking}
          title={`Booking for room number: ${selectedBooking?.room.roomNumber}`}
          fields={[
            { label: "TotalPrice", accessor: (data) => data.totalPrice  || "N/A" },
            { label: "Start Date", accessor: (data) => new Date(data?.startDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }) || "N/A" },
            { label: "End Date", accessor: (data) =>  new Date(data?.endDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    }) || "N/A"  },
            { label: "User", accessor: (data) => data.user.userName },
            { label: "Status", accessor: (data) => data.status },
          ]}
          
        />
        }
    </>
  );
}
