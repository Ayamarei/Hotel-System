import * as React from "react";
import { toast } from "react-toastify";
import AdsFormModal from "../AdsData/AdsData";
import DeleteConfirmation from "../../Modules/Shared/DeleteConfirmation/DeleteConfirmation";
import { ADS_URLS } from "../../Services/Urls";
import { privateUserAxiosInstance } from "../../Services/Axiosinstance";
import PaginationList from '../../Modules/Shared/PaginationList/PaginationList';
import Actions from '../../Modules/Shared/Actions/Actions';
import Heading from '../../Modules/Shared/Heading/Heading';
import CustomTable from '../../Modules/Shared/CustomTable/CustomTable';
import { IColumLable } from '../../Interfaces/CustomTableInterface';
import {Iad} from '../../Interfaces/AdsInterface'
import AdsCard from "../AdsCard/AdsCard";
import { useTranslation } from "react-i18next";




export default function Adslist() {
  const [AdsList, setAdsList] = React.useState<Iad[]>([]);
  const [selectedItem, setSelectedItem] = React.useState<Iad|null>(null);
  const [openFormModal, setOpenFormModal] = React.useState(false);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const [totalCount, setTotalCount] = React.useState<number>(1);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpen] = React.useState(false);
  const [page, setpage] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

 

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    item: Iad
  ) => {
    setAnchorEl(event.currentTarget); 
    setSelectedItem(item);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = async () => {
    if (selectedItem) {
      setOpen(true);
      handleMenuClose();
    }
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleOpenForm = () => {
    setOpenFormModal(true);
  };

  const handleCloseForm = () => {
    // setSelectedItem(null);
    setOpenFormModal(false);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const confirmDelete = async () => {
    setIsDeleting(true);
    if(selectedItem){
          try {

      await privateUserAxiosInstance.delete(ADS_URLS.DELETE_ADS(selectedItem?._id));
      setAdsList((prev:Iad[]) => prev.filter((ad:Iad) =>( ad._id !== selectedItem?._id)) );
      toast.success("Ad deleted successfully");
      setOpenDeleteModal(false);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsDeleting(false);
    }
    }

  };

  const getAllAds = async (size: number, page: number) => {
    setLoading(true);
    try {
      const { data } = await privateUserAxiosInstance.get(
        ADS_URLS.GET_ALL_ADS,
        {
          params: {
            page,
            size,
          },
        }
      );
      setAdsList(data.data.ads);
      setTotalCount(data?.data?.totalCount);
    } catch (error) {
      toast.error("Something went wrong while fetching ads");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getAllAds(5, 1);
  }, []);

  const{t}=useTranslation()
  const columnLabels: IColumLable[] = [
     { label:t("ads-list.Status"), align: "left" },
     { label: t("ads-list.Room-Number"), align: "right" },
     { label:t("ads-list.Capacity"), align: "right" },
     { label:t("ads-list.Discount"), align: "right" },
     { label:t("ads-list.Date"), align: "right" },
     { label:t("ads-list.Actions"), align: "right"},
 ];

  return (
    <>
     <Heading handleClick={()=>{setOpenFormModal(true);}} title={t("ads-list.title")} item={t("ads-list.item")} />

     <CustomTable<Iad>
        columnsLables={columnLabels}
        loading={loading}
        data={AdsList}
        ads={true}

        renderActions={(ads) => (
          <Actions
            handleMenuClick={(e) => handleMenuClick(e, ads)}
            anchorEl={anchorEl}
            handleOpenModal={handleOpenModal}
            handleOpenEdit={handleOpenForm}
            handleOpenDelete={handleDelete}
            handleMenuClose={handleMenuClose}
            ads={ads}
            selectedRoom={selectedItem}
          />)}
          />


 {!loading && <PaginationList page={page} getAllList={getAllAds} totalCount={Math.ceil(totalCount / 5)} setpage={setpage} />}
{selectedItem && <AdsCard handleCloseModal={handleCloseModal} openModal={openModal} ad={selectedItem} />}

      <AdsFormModal
        open={openFormModal}
        handleClose={handleCloseForm}
        selectedItem={selectedItem}
        getAllAds={getAllAds}
      />

      <DeleteConfirmation
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        deleteFun={confirmDelete}
        isDeleting={isDeleting}
        item={"Ad"}
      />

    </>
  );
}
