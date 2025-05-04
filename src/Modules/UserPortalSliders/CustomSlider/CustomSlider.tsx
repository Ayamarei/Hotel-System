import { Box, Typography } from '@mui/material'
import { Swiper ,SwiperSlide } from 'swiper/react';
import { THEMECOLOR } from '../../../Services/ThemeColors';
import 'swiper/swiper-bundle.css'
import { Autoplay } from 'swiper/modules';
import { ISliderProps } from '../../../Interfaces/SliderProps';
import { useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';



export default function CustomSlider({details}: ISliderProps) {
    
    const ContextColor = useContext(ThemeContext);
    if (!ContextColor)
        throw new Error("AuthContext must be used within AuthProvider");
        const { theme } = ContextColor;
    return (
        <Box sx={{ mb: {xs:2,md:6},paddingX: { xs: "20px", md: "50px" } }}>
            <Box sx={{ display:'flex',justifyContent:'space-around' }}>
            <Swiper
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
                {Array.from({ length: Math.ceil(details.length) }).map((_, slideIndex) => (
                
                    <SwiperSlide key={slideIndex} >
                        <Box sx={{ width: '100%',
                            height: "200px" }}>
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    backgroundColor: "rgba(255, 73, 139, 1)",
                                    color: "white",
                                    padding: {
                                      xs: "4px 10px",
                                      sm: "6px 10px",
                                      md: "6px 40px",
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
                                {details[slideIndex].price}
                            </Box>
                            <img 
                                src={details[slideIndex].image} // Use unique shuffled image
                                alt= {details[slideIndex].title}
                                width="100%"
                                height="200px"
                            />
                        </Box>
                        <Typography sx={{mt:1}}>
                            <Typography component="span" sx={{ color: theme === "dark" ? THEMECOLOR.mainBlue : THEMECOLOR.LabelColor ,fontWeight:400,fontSize:{xs:14,sm:20}}}>
                                {details[slideIndex].title}
                            </Typography>
                            <br/>
                            <Typography component="span"sx={{ color:THEMECOLOR.slider_subtitle ,fontWeight:400,fontSize:{xs:10,sm:14}}}>
                                {details[slideIndex].subTitle}
                            </Typography >
                        </Typography>
                    </SwiperSlide>
                

                ))}
            </Swiper>
            </Box>  
        </Box>
    )
}
