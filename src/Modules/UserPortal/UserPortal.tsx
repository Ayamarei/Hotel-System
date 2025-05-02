import HomeExplore from "../HomeExplore/HomeExplore";
import PopularAds from "../PopularAds/PopularAds";
import Ads from "../UserPortalSliders/Ads/Ads";
import HotelsLargeRooms from "../UserPortalSliders/HotelsLargeRooms/HotelsLargeRooms";
import HousesBackYards from "../UserPortalSliders/HousesBackYards/HousesBackYards";
import Reviews from "../UserPortalSliders/Reviews/Reviews";


export default function UserPortal() {
  return (

    // HOME SECTION
    
    < >
      <HomeExplore/>
      <PopularAds/>
      <HousesBackYards />
      <HotelsLargeRooms />
      <Ads/>
      <Reviews/>
    </>
  )
}
