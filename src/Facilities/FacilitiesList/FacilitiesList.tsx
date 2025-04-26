import { Box } from "@mui/material";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import { FACILITES_URLS } from "../../Services/Urls";
import React, { useEffect, useState, useCallback } from "react";
import { IFacility } from "../../Interfaces/FacilitesInterface";
import { toast } from "react-toastify";
import DeleteConfirmation from "../../Modules/Shared/DeleteConfirmation/DeleteConfirmation";
import FacilitiesData from "../FacilitiesData/FacilitiesData";
import { AxiosError } from "axios";
import Actions from "../../Modules/Shared/Actions/Actions";
import ViewFacility from "../ViewFacility/ViewFacility";
import PaginationList from "../../Modules/Shared/PaginationList/PaginationList";
import { IColumLable } from "../../Interfaces/CustomTableInterface";
import CustomTable from "../../Modules/Shared/CustomTable/CustomTable";
import Heading from "../../Modules/Shared/Heading/Heading";


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
  const getAllFacilites = useCallback(async (size: number, page: number) => {
    setLoading(true)
    try {
      const response = await privateUserAxiosInstance.get(FACILITES_URLS.GET_FACILITES, {
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
    } finally {
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
      getAllFacilites(5, 1);
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
      getAllFacilites(5, 1);
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
      getAllFacilites(5, 1);
    } catch (error) {
      console.error("Failed to delete facility:", error);
      toast.error("Failed to delete facility. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    getAllFacilites(5, 1);
  }, [getAllFacilites]);

  const columnLabels: IColumLable[] = [
    { label: "Id", align: "left" },
    { label: "Name", align: "right" },
    { label: "Created At", align: "right" },
    { label: "Updated At", align: "right" },
    { label: "Created By", align: "right" },
    { label: "Actions", align: "right" }
  ];

  return (
    <>
      <Box className="content">

<Heading handleClick={() => { setOpenAddModal(true); setSelectedFacility(null); }} title='Facility' item='facility' />

        <CustomTable<IFacility>
          columnsLables={columnLabels}
          loading={loading}
          data={allFacilites}
          facility={true}

          renderActions={(facility) => (
            <Actions
              handleOpenEdit={() => { setOpenAddModal(true); setSelectedFacility(facility); }}
              handleMenuClose={handleMenuClose}
              handleOpenDelete={() => handleOpenDelete(facility._id)}
              anchorEl={anchorEl}
              handleMenuClick={(e) => handleMenuClick(e, facility)}
              selectedRoom={selectedFacility}
              facility={facility}
              handleOpenModal={handleViewModal}
            />)} />

        <PaginationList page={page} getAllList={getAllFacilites} totalCount={Math.ceil(totalCount / 5)} setpage={setPage} />

        <DeleteConfirmation
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          deleteFun={deleteFacility}
          isDeleting={isDeleting}
          item="Facility"
        />
      </Box>
      {openAddModal && <FacilitiesData
        onSubmit={addFacility}
        onEdit={editFacility}
        open={openAddModal}
        setOpenAddModal={setOpenAddModal}
        facility={selectedFacility}
      />}
      {openViewModal && <ViewFacility handleCloseModal={handleCloseModal} facility={selectedFacility} open={openViewModal} setOpenViewModal={setOpenViewModal} />}
    </>
  );
};

export default FacilitesList;
