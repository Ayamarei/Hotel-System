import { useSwiper } from 'swiper/react';
import { Box, Button } from '@mui/material';
import styles from './SwiperNavigation.module.css'
import next from "../../../assets/images/sliders/next.png"
import prev from "../../../assets/images/sliders/prev.png"
const SwiperNavigation = () => {
  const swiper = useSwiper();

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }} className={styles.swiper_nav_btns}>
        <Button className={styles.prev} onClick={() => swiper.slideNext()}><img width="75%" height="90%" src={prev}/></Button>
        <Button className={styles.next} onClick={() => swiper.slidePrev()}><img width="75%" height="90%"src={next}/></Button>
    </Box>
  );
};

export default SwiperNavigation;