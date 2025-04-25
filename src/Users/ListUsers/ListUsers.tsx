import * as React from 'react';
import { privateUserAxiosInstance } from '../../Services/Axiosinstance';
import PaginationList from '../../Modules/Shared/PaginationList/PaginationList';
import Actions from '../../Modules/Shared/Actions/Actions';
import noimg from '../../assets/images/no-img.jpeg'

import Heading from '../../Modules/Shared/Heading/Heading';
import CustomTable from '../../Modules/Shared/CustomTable/CustomTable';
import { IColumnLabel } from '../../Interfaces/CustomTableInterface';
import { IResponseData, IUserData, IUserResponseData } from '../../Interfaces/UserData';
import { USERS_URLS } from '../../Services/Urls';
import ViewDetails from '../../Rooms/ViewDetails';

export default function ListUsers() {
  const [users, setUsers] = React.useState<IUserData[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpen] = React.useState(false);
  const [page, setpage] = React.useState(1);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setselectedUser] = React.useState<IUserData | null>(null);


  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>,room:IUserData) => {
    setAnchorEl(event.currentTarget);//btn
    setselectedUser(room);
  };
  
  const handleMenuClose = () => {
    // close the menu
    setAnchorEl(null);
  };
  
  const handleOpenModal = async () => {
    if (selectedUser) {
      setOpen(true);
      handleMenuClose();
    }
  };

    const handleCloseModal = () => {
    setOpen(false);
    setselectedUser(null);
  };


const getAllUsers = async (size: number, page: number) => {
  setLoading(true);
  try {
    // Use the generic IResponseData with IUserResponseData
    const response = await privateUserAxiosInstance.get<IResponseData<IUserResponseData>>(
      USERS_URLS.GET_ALL_USERS,
      {
        params: {
          page,
          size,
        },
      }
    );

    // Access the nested response structure
    const users = response?.data?.data?.users;
    const totalCount = response?.data?.data?.totalCount;

    console.log(users);
    setUsers(users); // Make sure you have a `setUsers` state
    setTotalCount(totalCount);
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    setLoading(false);
  }
};



  React.useEffect(() => {
    getAllUsers(5,1);
  }, []);

  const columnLabels : IColumnLabel<IUserData>[]= [
  { label: "User Name", align: "left", accessor: (row) => row.userName },
  { label: "Email", align: "left", accessor: (row) => `$${row.email}` },
  { label: "phoneNumber", align: "left", accessor: (row) => row.phoneNumber },
  {
      label: "Profile Pictute",
      align: "center",
      accessor: (row) => (
        <img
          src={row.profileImage || noimg}
          alt="Room"
          style={{ width: "56px", height: "56px", borderRadius: "8px" }}
        />
      ),
    },
];


return (
    <>
     
     <Heading title='Users' />
   
     <CustomTable<IUserData>
      columnsLabels={columnLabels}
      loading={loading}
      data={users}
      renderActions={(user) => (
        <Actions
        entityType="user"
          handleMenuClick={(e) => handleMenuClick(e, user)}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModal}
          handleMenuClose={handleMenuClose}
          selectedEntity={selectedUser}
          entity={user}
        />
        
      
      )}

/>
  

      {!loading && <PaginationList page={page} getAllList={getAllUsers} totalCount={Math.ceil(totalCount / 5)}  setpage={setpage} />}

      {selectedUser &&   <ViewDetails
      
          open={openModal}
          onClose={handleCloseModal}
          data={selectedUser}
          title={`User: ${selectedUser?.userName}`}
          fields={[
            { label: "Email", accessor: (data) => data.email  || "N/A" },
            { label: "Phone Number", accessor: (data) => data.phoneNumber || "N/A" },
            { label: "Country", accessor: (data) => data.country || "N/A" },
            { label: "Role", accessor: (data) => data.role },
          ]}
          images={[selectedUser.profileImage as string]}
        />
        }
    </>
  );
}
