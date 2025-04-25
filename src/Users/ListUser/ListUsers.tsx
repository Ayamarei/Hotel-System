import * as React from 'react';
import { privateUserAxiosInstance } from '../../Services/Axiosinstance';
import { IColumLable } from '../../Interfaces/CustomTableInterface';
import Heading from '../../Modules/Shared/Heading/Heading';
import CustomTable from '../../Modules/Shared/CustomTable/CustomTable';
import PaginationList from '../../Modules/Shared/PaginationList/PaginationList';
import Actions from '../../Modules/Shared/Actions/Actions';
import ViewUser from '../ViewUser/ViewUser';
import { IUserData, IUserResponseData } from '../../Interfaces/UserData';
import { USERS_URLS } from '../../Services/Urls';




export default function ListUser() {
  const [users, setUsers] = React.useState<IUserData[]>([]);
  const [totalCount, setTotalCount] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpen] = React.useState(false);
  const [page, setpage] = React.useState(1);


  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedUser, setselectedUser] = React.useState<IUserData | null>(null);


  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, user: IUserData) => {
    setAnchorEl(event.currentTarget);
    setselectedUser(user);
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

  
  // get all users
  const getAllUsers = async (size: number, page: number) => {
    setLoading(true);
    try {
      const response = await privateUserAxiosInstance.get<IUserResponseData>(USERS_URLS.GET_ALL_USERS, {
        params: {
          page,
          size
        },
      });
      setUsers(response?.data?.data?.users);
      setTotalCount(response?.data?.data?.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  React.useEffect(() => {
    getAllUsers(5, 1);
  }, []);
  const columnLabels: IColumLable[] = [
    { label: "User Name", align: "left" },
     { label: "Profile Picture", align: "right" },
    { label: "Email", align: "right" },
    { label: "Phone Number", align: "right" },
    { label: "Country", align: "right" },
    { label: "User Type", align: "right" },
    { label: "Actions", align: "right" }
  ];
  return (
    <>

      <Heading title='User' item='User' />


      <CustomTable<IUserData>
        columnsLables={columnLabels}
        loading={loading}
        data={users}
        user={true}
        renderActions={(user) => (
        <Actions
          handleMenuClick={(e) => handleMenuClick(e, user)}
          anchorEl={anchorEl}
          handleOpenModal={handleOpenModal}
          handleMenuClose={handleMenuClose}
          user={user}
          selectedRoom={selectedUser}
        />)}

      />


      {!loading && <PaginationList page={page} getAllList={getAllUsers} totalCount={Math.ceil(totalCount / 5)} setpage={setpage} />}

      {selectedUser && <ViewUser handleCloseModal={handleCloseModal} openModal={openModal} user={selectedUser} />}
     
    </>
  );
}
