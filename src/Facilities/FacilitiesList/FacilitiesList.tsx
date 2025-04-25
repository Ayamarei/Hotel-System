import { Box, Button, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { THEMECOLOR } from "../../Services/ThemeColors";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import { FACILITES_URLS } from "../../Services/Urls";
import  React, { useEffect, useState, useCallback } from "react";
import { IFacility } from "../../Interfaces/FacilitesInterface";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../Modules/Shared/DeleteConfirmation/DeleteConfirmation";
import FacilitiesData from "../FacilitiesData/FacilitiesData";
import { AxiosError } from "axios";
import Actions from "../../Modules/Shared/Actions/Actions";
import ViewFacility from "../ViewFacility/ViewFacility";
import PaginationList from "../../Modules/Shared/PaginationList/PaginationList";

 const StyledTableCell = styled(TableCell)(({ theme }) => ({
       [`&.${tableCellClasses.head}`]: {
         backgroundColor: THEMECOLOR.HeadTableColor,
         color: theme.palette.common.black,
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

const FacilitesList = () => {
  const [allFacilites, setAllFacilites] = useState<IFacility[]>([]);
  const [facilityId, setFacilityId] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedFacility, setSelectedFacility] = React.useState<IFacility | null>(null);
  const [loading, setLoading] = useState(true);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, facility: IFacility) => {
    setAnchorEl(event.currentTarget);
    setSelectedFacility(facility);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewModal = async () => {
    if (selectedFacility) {
      setOpenViewModal(true);
      handleMenuClose();
    }
  };

  const handleCloseModal = () => {
    setOpenViewModal(false);
    setSelectedFacility(null);
  };

  // getAllFacilites
  const getAllFacilites = useCallback(async (size:number,page:number) => {
    setLoading(true)
    try {
      const response = await privateUserAxiosInstance.get(FACILITES_URLS.GET_FACILITES,{
        params: {
          page,
          size
        },
      });
      setAllFacilites(response?.data?.data?.facilities);
      setTotalCount(response?.data?.data?.totalCount);
      console.log(response?.data?.data?.facilities);
    } catch (error) {
      console.error("Failed to fetch facilities:", error);
      toast.error("Failed to fetch facilities. Please try again.");
    }finally{
      setLoading(false)
    }
  }, []);


  // addFacility
  const addFacility = async (data: { name: string }) => {
    try {
      let res = await privateUserAxiosInstance.post(FACILITES_URLS.ADD_FACILITES, data);
      console.log(res);
      toast.success(res.data.message);
      setOpenAddModal(false);
      getAllFacilites(5,1);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };


  // editFacility
  const editFacility = async (id: string, data: { name: string }) => {
    try {
      let res = await privateUserAxiosInstance.put(FACILITES_URLS.EDIT_FACILITES(id), data);
      console.log(res);
      toast.success(res.data.message);
      setOpenAddModal(false);
      getAllFacilites(5,1);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };


  // handleOpenDelete
  const handleOpenDelete = (id: string) => {
    setFacilityId(id);
    setOpenDeleteModal(true);
  };

  // deleteFacility
  const deleteFacility = async () => {
    if (!facilityId) return;

    setIsDeleting(true);
    try {
      const res = await privateUserAxiosInstance.delete(FACILITES_URLS.DELETE_FACILITES(facilityId));
      toast.success(res.data.message);
      setOpenDeleteModal(false);
      setFacilityId(null);
      getAllFacilites(5,1);
    } catch (error) {
      console.error("Failed to delete facility:", error);
      toast.error("Failed to delete facility. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    getAllFacilites(5,1);
  }, [getAllFacilites]);

  return (
    <>
      <Box className="content">
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mx: "30px",
            gap: 2,
            flexDirection: "row",
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              alignItems: "center",
              my: "30px"
            },
          })}
        >
          <div>
            <p>Facilities Table Details</p>
            <p>You can check all details</p>
          </div>
          <Button
            sx={{
              backgroundColor: "#203FC7",
              height: "50px",
              mt: { xs: 1, sm: 0 },
            }}
            variant="contained"
            onClick={() => { setOpenAddModal(true); setSelectedFacility(null); }}
          >
            Add New Facility
          </Button>
        </Box>

        <Box sx={{ overflowX: "auto", width: "auto" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Id</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Created At</StyledTableCell>
                  <StyledTableCell>Updated At</StyledTableCell>
                  <StyledTableCell>Created By</StyledTableCell>
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allFacilites.map((facility) => (
                  <StyledTableRow key={facility._id}>
                    <StyledTableCell>{facility._id}</StyledTableCell>
                    <StyledTableCell>{facility.name}</StyledTableCell>
                    <StyledTableCell>{facility.createdAt}</StyledTableCell>
                    <StyledTableCell>{facility.updatedAt}</StyledTableCell>
                    <StyledTableCell>{facility.createdBy.userName}</StyledTableCell>
                    <StyledTableCell>
                      <Actions
                        handleOpenEdit={() => { setOpenAddModal(true); setSelectedFacility(facility); }}
                        handleMenuClose={handleMenuClose}
                        handleOpenDelete={() => handleOpenDelete(facility._id)}
                        anchorEl={anchorEl}
                        handleMenuClick={(e) => handleMenuClick(e, facility)}
                        selectedRoom={selectedFacility}
                        facility={facility}
                        handleOpenModal={handleViewModal}
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <PaginationList page={page} getAllList={getAllFacilites} totalCount={Math.ceil(totalCount / 5)}  setpage={setPage} />
        </Box>
        <DeleteConfirmation
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          deleteFun={deleteFacility}
          isDeleting={isDeleting}
        />
      </Box>
      {openAddModal && <FacilitiesData
        onSubmit={addFacility}
        onEdit={editFacility}
        open={openAddModal}
        setOpenAddModal={setOpenAddModal}
        facility={selectedFacility}
      />}
      {openViewModal&&<ViewFacility  handleCloseModal={handleCloseModal} facility={selectedFacility} open={openViewModal} setOpenViewModal={setOpenViewModal}/>}
    </>
  );
};

export default FacilitesList;
