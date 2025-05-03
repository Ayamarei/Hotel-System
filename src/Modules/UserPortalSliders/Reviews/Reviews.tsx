import { useContext, useRef } from "react";
import { Box, Grid, Rating, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { THEMECOLOR } from "../../../Services/ThemeColors";
import reviewImg1 from "../../../assets/images/sliders/reviews/rev.avif";
import reviewImg2 from "../../../assets/images/sliders/reviews/rev2.avif";
import reviewImg3 from "../../../assets/images/sliders/reviews/rev3.avif";
import SwiperNavigation from "../../Shared/SwiperNavigation/SwiperNavigation";
import { ThemeContext } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Reviews() {
  const swiperRef = useRef(null);

  const ContextColor = useContext(ThemeContext);
  if (!ContextColor)
    throw new Error("AuthContext must be used within AuthProvider");
  // const { theme } = ContextColor;

  const { t, i18n } = useTranslation();

  return (
    <>
      {/* <UserPortalHeading title={t("List-User.User")} /> */}

      <Box sx={{ mb: { xs: 2, md: 10 } }}>
        <Swiper loop={true} slidesPerView={1} ref={swiperRef}>
          <SwiperSlide style={{ position: "relative" }}>
            <Grid container sx={{ overflow: "visible" }}>
              <Grid
                size={{ xs: 12, sm: 4 }}
                sx={{
                  position: "relative",
                  textAlign: i18n.language === "ar" ? "start" : "end",
                  m: 5,
                  marginBottom: 0,
                  paddingTop: 5,
                  height: "490px",
                  width: "350px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-10px",
                    left: i18n.language === "ar" ? "0" : "-10px",
                    right: i18n.language === "ar" ? "-40px" : "0",
                    width: "90%",
                    height: "90%",
                    border: `2px solid ${THEMECOLOR.HeadTableColor}`,
                    borderRadius:
                      i18n.language === "ar"
                        ? "30px 30px  30px 100px"
                        : "30px 30px 100px 30px",
                    zIndex: 0,
                  }}
                />
                <img
                  src={reviewImg1}
                  alt="review"
                  width="90%"
                  height="90%"
                  style={{
                    borderRadius:
                      i18n.language === "ar"
                        ? "30px 30px  30px 100px"
                        : "30px 30px 100px 30px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ m: { xs: 1, sm: 6 } }}>
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      color: THEMECOLOR.user_portal_blue,
                      fontWeight: 700,
                      fontSize: { xs: 20, sm: 24 },
                    }}
                  >
                    {t("Sliders.GuestReview")}
                  </Typography>
                  <br />
                  <Typography component="span" sx={{ display: "block" }}>
                    <Rating name="read-only" value={5} readOnly />
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      color: THEMECOLOR.user_portal_blue,
                      mt: { xs: 1, sm: 2 },
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde, excepturi voluptatum voluptates voluptate vitae
                    dignissimos sunt facilis esse molestiae nisi, aspernatur
                    rem, praesentium saepe cupiditate ad
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    sx={{ display: "block", color: THEMECOLOR.slider_subtitle }}
                  >
                    Angga, Product Designer
                  </Typography>
                </Typography>
                <Typography>
                  {" "}
                  <SwiperNavigation />
                </Typography>
              </Grid>
            </Grid>
          </SwiperSlide>

          <SwiperSlide style={{ position: "relative" }}>
            <Grid container sx={{ overflow: "visible" }}>
              <Grid
                size={{ xs: 12, sm: 4 }}
                sx={{
                  position: "relative",
                  textAlign: i18n.language === "ar" ? "start" : "end",
                  m: 5,
                  marginBottom: 0,
                  paddingTop: 5,
                  height: "490px",
                  width: "350px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-10px",
                    left: i18n.language === "ar" ? "0" : "-10px",
                    right: i18n.language === "ar" ? "-40px" : "0",
                    width: "90%",
                    height: "90%",
                    border: `2px solid ${THEMECOLOR.HeadTableColor}`,
                    borderRadius:
                      i18n.language === "ar"
                        ? "30px 30px  30px 100px"
                        : "30px 30px 100px 30px",
                    zIndex: 0,
                  }}
                />
                <img
                  src={reviewImg2}
                  alt="review"
                  width="90%"
                  height="90%"
                  style={{
                    borderRadius:
                      i18n.language === "ar"
                        ? "30px 30px  30px 100px"
                        : "30px 30px 100px 30px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ m: { xs: 1, sm: 6 } }}>
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      color: THEMECOLOR.user_portal_blue,
                      fontWeight: 700,
                      fontSize: { xs: 20, sm: 24 },
                    }}
                  >
                    {t("Sliders.GuestReview")}
                  </Typography>
                  <br />
                  <Typography component="span" sx={{ display: "block" }}>
                    <Rating name="read-only" value={5} readOnly />
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      color: THEMECOLOR.user_portal_blue,
                      mt: { xs: 1, sm: 2 },
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde, excepturi voluptatum voluptates voluptate vitae
                    dignissimos sunt facilis esse molestiae nisi, aspernatur
                    rem, praesentium saepe cupiditate ad
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    sx={{ display: "block", color: THEMECOLOR.slider_subtitle }}
                  >
                    Angga, Product Designer
                  </Typography>
                </Typography>
                <Typography>
                  {" "}
                  <SwiperNavigation />
                </Typography>
              </Grid>
            </Grid>
          </SwiperSlide>
          <SwiperSlide style={{ position: "relative" }}>
            <Grid container sx={{ overflow: "visible" }}>
              <Grid
                size={{ xs: 12, sm: 4 }}
                sx={{
                  position: "relative",
                  textAlign: i18n.language === "ar" ? "start" : "end",
                  m: 5,
                  marginBottom: 0,
                  paddingTop: 5,
                  height: "490px",
                  width: "350px",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "-10px",
                    left: i18n.language === "ar" ? "0" : "-10px",
                    right: i18n.language === "ar" ? "-40px" : "0",
                    width: "90%",
                    height: "90%",
                    border: `2px solid ${THEMECOLOR.HeadTableColor}`,
                    borderRadius:
                      i18n.language === "ar"
                        ? "30px 30px  30px 100px"
                        : "30px 30px 100px 30px",
                    zIndex: 0,
                  }}
                />
                <img
                  src={reviewImg3}
                  alt="review"
                  width="90%"
                  height="90%"
                  style={{
                    borderRadius:
                      i18n.language === "ar"
                        ? "30px 30px  30px 100px"
                        : "30px 30px 100px 30px",
                    position: "relative",
                    zIndex: 1,
                  }}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography sx={{ m: { xs: 1, sm: 6 } }}>
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      color: THEMECOLOR.user_portal_blue,
                      fontWeight: 700,
                      fontSize: { xs: 20, sm: 24 },
                    }}
                  >
                    {t("Sliders.GuestReview")}
                  </Typography>
                  <br />
                  <Typography component="span" sx={{ display: "block" }}>
                    <Rating name="read-only" value={5} readOnly />
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    sx={{
                      display: "block",
                      color: THEMECOLOR.user_portal_blue,
                      mt: { xs: 1, sm: 2 },
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Unde, excepturi voluptatum voluptates voluptate vitae
                    dignissimos sunt facilis esse molestiae nisi, aspernatur
                    rem, praesentium saepe cupiditate ad
                  </Typography>
                  <br />
                  <Typography
                    component="span"
                    sx={{ display: "block", color: THEMECOLOR.slider_subtitle }}
                  >
                    Angga, Product Designer
                  </Typography>
                </Typography>
                <Typography>
                  {" "}
                  <SwiperNavigation />
                </Typography>
              </Grid>
            </Grid>
          </SwiperSlide>
        </Swiper>
      </Box>
    </>
  );
}
