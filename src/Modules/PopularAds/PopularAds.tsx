import { toast } from "react-toastify";
import { publicAxiosInstance } from "../../Services/Axiosinstance";
import { Ads_Url } from "../../Services/Urls";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoriteContext } from "../../context/FavoriteContext ";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";



interface IAdsInterface {
    room: {
        images: string[],
        price: number,
        roomNumber: string,
        _id: string,
    },
    _id: string,
}


export default function PopularAds() {
    const navigate=useNavigate();
    const ContextColor = useContext(ThemeContext);
    if (!ContextColor)
        throw new Error("AuthContext must be used within AuthProvider");
    const { theme } = ContextColor;

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

    const [allAds, setAllAds] = useState<IAdsInterface[]>([])

    const getAds = async () => {
        try {
            let response = await publicAxiosInstance.get(Ads_Url.GET_ALL)
            console.log(response.data.data.ads);
            setAllAds(response.data.data.ads)


        } catch (error) {
            const err = error as AxiosError<{ message: string }>;

            toast.error(err?.response?.data?.message || "Something went wrong!");

        }
    }

    const [favorites, setFavorites] = useState<Set<string>>(new Set());

    const toggleFavorite = (roomId: string) => {
        const token = localStorage.getItem("token"); 
        if (!token) {
            toast.info("Please login first");
            return;
        }
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



    useEffect(() => {
        getAds()

    }, [])



    return (
        <>
            <Box sx={{padding: { xs: "20px", md: "50px" }}}>
                <Grid container spacing={3} sx={{ my:{xs:8,sm:8,md:5} }}>
                    {allAds && allAds.map((Ad) => (
                        <Grid key={Ad._id} size={{ xs: 12, sm: 6, md: 4, lg: 4 }}>
                            <Box
                                sx={{
                                    position: "relative",
                                    border: "1px solid #ccc",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    "&:hover .overlay": {
                                        opacity: 1,
                                    },
                                    transition: "all 0.5s, box-shadow 0.3s",
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
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    ${Ad.room.price} per night
                                </Box>

                                {Ad.room.images && Ad.room.images.length > 0 ? (
                                    <img
                                        src={Ad.room.images[0]}
                                        alt={`Room ${Ad.room.roomNumber}`}
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                            display: "block",
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "200px",
                                            backgroundColor: "#eee",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography>No Image</Typography>
                                    </Box>
                                )}
                                <Box
                                    className="overlay"
                                    sx={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        bgcolor: theme === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0,0,0,0.5)",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: 2,
                                        opacity: 0,
                                        transition: "opacity 0.3s ease-in-out",
                                        zIndex: 3,
                                    }}
                                >

                                    <Box onClick={() => toggleFavorite(Ad.room._id)}>
                                        {favorites.has(Ad.room._id) ? (
                                            <FavoriteIcon sx={{ color: theme === "dark" ? "#fff" : "#fff", fontSize: 30, cursor: "pointer" }} />
                                        ) : (
                                            <FavoriteBorderIcon sx={{ color: theme === "dark" ? "#fff" : "#fff", fontSize: 30, cursor: "pointer" }} />
                                        )}
                                    </Box>

                                    <Box> <VisibilityOutlinedIcon sx={{ color: theme === "dark" ? "#fff" : "#fff", fontSize: 30, cursor: "pointer" }} onClick={()=>navigate(`/explore-details/${Ad.room._id}`)}/></Box>
                                </Box>
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
                                    <Typography> {Ad.room.roomNumber}</Typography>
                                    <Typography>Item Location</Typography>
                                    </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>



            </Box>

        </>
    )
}
