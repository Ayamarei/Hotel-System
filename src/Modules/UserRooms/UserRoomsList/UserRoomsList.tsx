import { Box, Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import { privateUserAxiosInstance } from "../../../Services/Axiosinstance";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import PaginationList from "../../Shared/PaginationList/PaginationList";
import { FiltersContext } from "../../../context/FilterContext";
import { THEMECOLOR } from "../../../Services/ThemeColors";
import { ThemeContext } from "../../../context/ThemeContext";
import PlaceholderImage from '../../../assets/images/explor.jpg';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from "react-router-dom";


export interface Facility {
  _id: string;
  name: string;
}

export interface CreatedBy {
  _id: string;
  userName: string;
}

export interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  facilities: Facility[];
  createdBy: CreatedBy;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface RoomsResponseData {
  rooms: Room[];
  totalCount: number;
}

export interface RoomsAPIResponse {
  success: boolean;
  message: string;
  data: RoomsResponseData;
}

export default function UserRoomsList() {
  const [roomData, setRoomData] = useState<RoomsAPIResponse | null>(null);
  const [page, setpage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(1);
  console.log("Total Rooms Count:", totalCount);
  const navigate=useNavigate()
  // console.log("Calculated total pages:", Math.ceil(totalCount / 5));
  const filtersContext = useContext(FiltersContext);
  if (!filtersContext) {
    throw new Error("FiltersContext is not provided");
  }
  const { startDate, endDate, capacity } = filtersContext;

  const ContextColor = useContext(ThemeContext);
  if (!ContextColor)
    throw new Error("AuthContext must be used within AuthProvider");
  const { theme } = ContextColor;
  console.log("startDate1", startDate);
  console.log("endDate1", startDate);
  console.log("capacity1", startDate);

  console.log("roomData", roomData);

  const FetchRoomData = async (
    size?: number,
    page?: number,
    startDate?: string,
    endDate?: string,
    capacity?: number
  ) => {
    try {
      const params: any = {
        size,
        page,
      };

      if (startDate) params.startDate = new Date(startDate).toISOString();
      if (endDate) params.endDate = new Date(endDate).toISOString();
      if (capacity) params.capacity = capacity;

      console.log("Final Params:", params);

      const response = await privateUserAxiosInstance.get(
        `https://upskilling-egypt.com:3000/api/v0/portal/rooms/available`,
        { params }
      );

      setRoomData(response.data);
      setTotalCount(response?.data?.data?.totalCount);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast.error(
          error?.response?.data?.message ||
            "Something went wrong. Please try again later."
        );
      }
    }
  };

  useEffect(() => {
    FetchRoomData(6, page, startDate, endDate, capacity);
  }, [page, startDate, endDate, capacity]);

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
        Explore ALL Rooms
      </Typography>
      <Box sx={{ flexGrow: 1, mt: "30px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ justifyContent: "center" }}
        >
          {roomData?.data.rooms.map((room, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 6, lg: 4 }}>
              <Card
                sx={{
                  maxWidth: 350,
                  margin: "auto",
                  borderRadius: "16px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme === "dark"
                      ? "0 6px 20px rgba(255, 255, 255, 0.2)"
                      : "0 6px 20px rgba(0, 0, 0, 0.2)",
                    ".hover-overlay": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <Box
                    className="hover-overlay"
                    sx={{
                      position: "absolute",
                      display:"flex",
                      justifyContent:'center',
                      alignItems:"center",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0,0,0,0.5)",
                      opacity: 0,
                      transition: "opacity 0.3s ease",
                      zIndex: 2,
                      // pointerEvents: "none",
                    }}
                  >
                  <Button sx={{color:"white"}} onClick={()=>navigate(`/explore-details/${room._id}`)}> <RemoveRedEyeIcon /></Button>
                  </Box>
                  {room.discount > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: "rgba(255, 73, 139, 1)",
                        color: "white",
                        padding: "6px 12px",
                        borderRadius: "0 10px 0 30px",
                        fontWeight: "500",
                        fontSize: "14px",
                        zIndex: 100,
                        width: "30%",
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
                </Box>
              </Card>

            </Grid>
          ))}
        </Grid>

        <PaginationList
          page={page}
          getAllList={(size, page) => FetchRoomData(size, page)}
          totalCount={Math.ceil(totalCount / 6)}
          setpage={setpage}
          userExplore={true}
        />
      </Box>
    </>
  );
}
