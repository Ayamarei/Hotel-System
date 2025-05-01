import React, { useContext, useState } from "react";
import { publicAxiosInstance } from "../../../Services/Axiosinstance";
import { Ads_Url } from "../../../Services/Urls";
import { useTranslation } from "react-i18next";
import UserPortalHeading from "../../Shared/UserPortalHeading/UserPortalHeading";
import {  IAdsResponseData, IUserPortalAd } from "../../../Interfaces/AdsInterface";
import { Box, Typography } from '@mui/material'
import { Swiper ,SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'
import { Autoplay } from 'swiper/modules';
import { ThemeContext } from "../../../context/ThemeContext";
import { FavoriteContext } from "../../../context/FavoriteContext ";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { THEMECOLOR } from "../../../Services/ThemeColors";

export default function Ads() {
  const [allAds, setAllAds] = React.useState<IUserPortalAd[]>([]);

  // get all ads
  const getAllUserPortalAds = async () => {
    try {
      const response = await publicAxiosInstance.get<IAdsResponseData>(Ads_Url.GET_ALL);
      setAllAds(response?.data?.data?.ads );
      // setTotalCount(response?.data?.data?.totalCount);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoading(false);
    }
  };


  React.useEffect(() => {
    getAllUserPortalAds();
  }, []);


  const activeAds = allAds.filter((ad)=>{
    return ad.isActive == true;
  })



    const ContextColor = useContext(ThemeContext);
    if (!ContextColor)
        throw new Error("AuthContext must be used within AuthProvider");
    const { theme } = ContextColor;
    const {t} = useTranslation();

    const FavContext = useContext(FavoriteContext)
    if (!FavContext) throw new Error("Error")
    const { addToFavorite, RemoveFromeFavorite } = FavContext


    const handleAddToFav = (roomId: string) => {
        console.log("Room ID Add:", roomId);
        addToFavorite(roomId);
    };
    const handleRemove = (roomId: string) => {
        console.log("Room ID Remove:", roomId);
        RemoveFromeFavorite(roomId);
    };
    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const toggleFavorite = (roomId: string) => {
        const isFav = favorites.has(roomId);

        if (isFav) {
            setFavorites(prev => {
                const updated = new Set(prev);
                updated.delete(roomId);
                return updated;
            });
            handleRemove(roomId);
        } else {
            setFavorites(prev => {
                const updated = new Set(prev);
                updated.add(roomId);
                return updated;
            });
            handleAddToFav(roomId);
        }
    };


 
  return (
    <>
        <UserPortalHeading title={t("Sliders.Ads")} />

        <Box sx={{ mb: {xs:2,md:6} }}>
            <Box sx={{ display:'flex',justifyContent:'space-around' }}>
            <Swiper
                style={{width:'100%',overflowY:'visible',overflowX:'hidden'}}
                modules={[ Autoplay]}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    922: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
            >
              {activeAds.map((ad) => (
                <SwiperSlide key={ad?._id}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            alignItems: "center",
                            width: "100%",
                            height:"200px",
                            transition: "transform 0.3s ease-in-out",
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: theme === "dark"
                                  ? "0 6px 20px rgba(255, 255, 255, 0.2)"
                                  : "0 6px 20px rgba(0, 0, 0, 0.2)",
                            },
                            "&:hover .overlay": {
                                opacity: 1,
                            },
                            borderRadius: "10px" 
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                backgroundColor: "#ff498b",
                                color: "#fff",
                                padding: "7px 12px",
                                fontSize: "12px",
                                zIndex: 1,
                                borderRadius: "0 10px 0 20px",
                                fontWeight: "500",
                                width: "32%",
                            }}
                        >
                            ${ad?.room?.price} per night
                        </Box>
                        <img 
                            src={ad?.room?.images?.[0]} 
                            alt={String(ad?.room?.roomNumber)}
                            width="100%"
                            height="200px"
                            style={{ borderRadius: "10px" }}
                        />
                          <Box
                            className="overlay"
                            sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "200px",
                                borderRadius: "10px",
                                bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0,0,0,0.5)",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: 2,
                                opacity: 0,
                                transition: "opacity 0.3s ease-in-out",
                                zIndex: 3,
                            }}
                          >

                          <Box onClick={() => toggleFavorite(ad?.room?._id)}>
                              {favorites.has(ad?.room?._id) ? (
                                  <FavoriteIcon sx={{ color: theme === "dark" ? "#ff498b" : "#fff", fontSize: 30, cursor: "pointer" }} />
                              ) : (
                                  <FavoriteBorderIcon sx={{ color: theme === "dark" ? "#ff498b" : "#fff", fontSize: 30, cursor: "pointer" }} />
                              )}
                          </Box>

                          <Box> <VisibilityOutlinedIcon sx={{ color: theme === "dark" ? "#ff498b" : "#fff", fontSize: 30, cursor: "pointer" }} /></Box>
                      </Box>
                    </Box>

                    
                    <Typography sx={{ mt: 1, textAlign: "start" }}>
                        <Typography 
                            component="span" 
                            sx={{ color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor , fontWeight: 400, fontSize: { xs: 14, sm: 20 } }}
                        >
                            {t('Rooms-list.Room-Number')}: {ad?.room?.roomNumber}
                        </Typography>
                        <br />
                        <Typography 
                            component="span"
                            sx={{ color:THEMECOLOR.slider_subtitle , fontWeight: 400, fontSize: { xs: 10, sm: 14 } }}
                        >
                            {t('room.Capacity')}: {ad?.room?.capacity}
                        </Typography>
                    </Typography>
                </SwiperSlide>
              ))}
            </Swiper>
            </Box>  
        </Box>
    </>
  );
}

