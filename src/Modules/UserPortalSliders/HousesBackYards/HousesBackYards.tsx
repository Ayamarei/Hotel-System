import 'swiper/swiper-bundle.css'
import backyard1 from "../../../assets/images/sliders/beautyBackyards/backyard1.png"
import backyard2 from "../../../assets/images/sliders/beautyBackyards/backyard2.png"
import backyard3 from "../../../assets/images/sliders/beautyBackyards/backyard3.png"
import backyard4 from "../../../assets/images/sliders/beautyBackyards/backyard4.png"
import backyard5 from "../../../assets/images/sliders/beautyBackyards/backyard1.png"
import backyard6 from "../../../assets/images/sliders/beautyBackyards//backyard2.png"
import CustomSlider from '../CustomSlider/CustomSlider';
import UserPortalHeading from '../../Shared/UserPortalHeading/UserPortalHeading'
import { useTranslation } from 'react-i18next'


export default function HousesBackYards() {
   const details = [
    {   
        image:backyard1,
        title:"Tabby Town",
        subTitle:"Gunung Batu, Indonesia",
        price: '$99 per night'
    },
    {
        image:backyard2,
        title:"Anggana",
        subTitle:"Bogor, Indonesia",
        price: '$67 per night'
    },
    {
        image:backyard3,
        title:"Seattle Rain",
        subTitle:"Jakarta, Indonesia",
        price: '$270 per night'
    },
    {
        image:backyard4,
        title:"Wodden Pit",
        subTitle:"Wonosobo, Indonesia",
        price: '$361 per night'
    },
    {
        image:backyard5,
        title:"Tabby Town",
        subTitle:"Gunung Batu, Indonesia",
        price: '$77 per night'
    },
    {
        image:backyard6,
        title:"Anggana",
        subTitle:"Bogor, Indonesia",
        price: '$95 per night'
    }
    ]

    const {t} = useTranslation();

  return (
    <>
        <UserPortalHeading title={t("Sliders.HousesWithBeautyBackyards")} />
        <CustomSlider  details={details}/>
    </>
    
  )
}
