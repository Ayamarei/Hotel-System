import { useEffect, useState } from "react";
import { privateAxiosInstance } from "../../../Services/Axiosinstance";
import { FAVORITE_ROOMS } from "../../../Services/Urls";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { THEMECOLOR } from "../../../Services/ThemeColors";
import { Box, Card, CardMedia, Grid, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import PaginationList from "../../Shared/PaginationList/PaginationList";
import PlaceholderImage from "../../../assets/images/explor.jpg";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Room } from "../../../Interfaces/RoomInterface";
import { useContext } from "react";
import "swiper/swiper-bundle.css";
import { FiltersContext } from "../../../context/FilterContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { FavoriteContext } from "../../../context/FavoriteContext ";
import { DotLoader } from "react-spinners";



export default function UserFav() {
  const [roomData, setRoomData] = useState<Room[]|null>(null);
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // filtersContext
  const filtersContext = useContext(FiltersContext);
  if (!filtersContext) {
    throw new Error("FiltersContext is not provided");
  }
  const { startDate, endDate, capacity } = filtersContext;

  // ContextColor
  const ContextColor = useContext(ThemeContext);
  if (!ContextColor)
    throw new Error("AuthContext must be used within AuthProvider");
  const { theme } = ContextColor;

  // favoriteContext
  const favoriteContext = useContext(FavoriteContext);
  if (!favoriteContext) {
    throw new Error("FavoriteContext is not provided");
  }
  const { RemoveFromeFavorite } = favoriteContext;

  //FetchRoomData
  const FetchRoomData = async (
    size?: number,
    page?: number,
    startDate?: string,
    endDate?: string,
    capacity?: number
  ) => {
    try {
      setIsLoading(true)
      const params: any = {
        size,
        page,
      };

      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();
      if (capacity) params.capacity = capacity;

      console.log("Final Params:", params);

      const response = await privateAxiosInstance.get(FAVORITE_ROOMS.GET_ALL, {
        params,
      });
      setRoomData(response.data.data.favoriteRooms[0].rooms);
      setTotalCount(response?.data?.data?.totalCount);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again later."
        );
      }
    }finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    FetchRoomData(12, page, startDate, endDate, capacity);
  }, [page, startDate, endDate, capacity]);

  
  const removeFromFavorites = (roomId: string) => {
    setRoomData((prev) => {
      if (!prev) return prev;
      return prev.filter((room) => room._id !== roomId);
    });
    console.log("Room ID Remove:", roomId);
    RemoveFromeFavorite(roomId);
  };

 

  return (
    <>
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mt: "100px",
          fontWeight: "600",
          fontSize: "36px",
          fontFamily: "Poppins",
          color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,
        }}
      >
        Your Favorites
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: {
            xs: "center",
            md: "flex-start",
          },
        }}
      >
        <Typography sx={{ fontSize: "16px", color: "primary.main" }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "rgba(176, 176, 176, 1)" }}
          >
            Home
          </Link>
        </Typography>
        <Typography
          sx={{ fontSize: "16px", marginX: 1, color: "rgba(176, 176, 176, 1)" }}
        >
          {" "}
          /{" "}
        </Typography>
        <Typography sx={{ fontSize: "16px", color: "primary.main" }}>
          <Link
            to="/user-room-fav"
            style={{
              textDecoration: "none",
              color:
                theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor,
            }}
          >
            Favorites
          </Link>
        </Typography>
      </Box>

      {isLoading?<Box sx={{display:"flex",alignItems:"center",justifyContent:"center",height:"50vh"}}><DotLoader
  color="#203FC7"
  size={60}
/></Box>:  <Box sx={{ flexGrow: 1, mt: "30px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ justifyContent: "center" }}
        >
          {roomData?.map((room, index) => (
            <Grid key={index} size={{ xs: 12, sm: 4, md: 4, lg: 3 }}>
              <Card
                sx={{
                  // maxWidth: 350,
                  margin: "auto",
                  borderRadius: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  transition: "transform 0.5s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow:
                      theme === "dark"
                        ? "0 6px 20px rgba(255, 255, 255, 0.2)"
                        : "0 6px 20px rgba(0, 0, 0, 0.2)",
                    ".hover-overlay": {
                      opacity: 1,
                    },
                    ".icon": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  {/* fav icon */}
                  <Box
                    className="icon"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: "52%",
                      zIndex: 10,
                      cursor: "pointer",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                    onClick={() => removeFromFavorites(room._id)}
                  >
                   
                      <FavoriteIcon sx={{ color: "white", fontSize: 28 }} />
                 
                  </Box>
                  {/* view icon */}
                  <Box
                    className="icon"
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "52%",
                      zIndex: 10,
                      cursor: "pointer",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                    }}
                  >
                    <VisibilityIcon
                      sx={{ color: "white", fontSize: 28 }}
                      onClick={() => navigate(`/explore-details/${room._id}`)}
                    />
                  </Box>

                  <Box
                    className="hover-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.2)"
                          : "rgba(0,0,0,0.5)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      zIndex: 2,
                      pointerEvents: "none",
                    }}
                  />

                  {room.discount > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 73, 139, 1)",
                        color: "white",
                        padding: {
                          xs: "4px 10px",
                          sm: "6px 12px",
                          md: "6px 30px",
                        },
                        textAlign: "center",
                        borderRadius: "0 4px 0 30px",
                        fontWeight: "500",
                        fontSize: "14px",
                        zIndex: 100,
                        width: "30%",
                        whiteSpace: "nowrap",
                      }}
                    >
                      ${room.price} per night
                    </Box>
                  )}

                  <Swiper
                    spaceBetween={10}
                    slidesPerView={1}
                    navigation={false}
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    loop={true}
                  >
                    {room.images && room.images.length > 0 ? (
                      room.images.map((img, imgIndex) => (
                        <SwiperSlide key={imgIndex}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={img}
                            alt={`Room ${room.roomNumber} Image ${imgIndex + 1}`}
                            sx={{ objectFit: "cover" }}
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      <SwiperSlide>
                        <CardMedia
                          component="img"
                          height="200"
                          image={PlaceholderImage}
                          alt="Placeholder Image"
                          sx={{ objectFit: "cover" }}
                        />
                      </SwiperSlide>
                    )}
                  </Swiper>
                  {/* Adding Room Number and Item Location */}
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "10px",
                      left: "10px",
                      color: "#fff",
                      fontSize: "16px",
                      fontWeight: "bold",
                      display: "flex",
                      flexDirection: "column",
                      zIndex: 20,
                    }}
                  >
                    <Typography> {room.roomNumber}</Typography>
                    <Typography>Item Location</Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            "& .MuiPaginationItem-root": {
              color: theme === "dark" ? THEMECOLOR.mainBlue : "black",
              borderColor: theme === "dark" ? THEMECOLOR.mainBlue : "gray",
            },
          }}
        >
          <PaginationList
            page={page}
            getAllList={(size, page) => FetchRoomData(size, page)}
            totalCount={Math.ceil(totalCount / 12)}
            setpage={setpage}
            userExplore={true}
          />
        </Box>
      </Box>}

    
    </>
  );
}
