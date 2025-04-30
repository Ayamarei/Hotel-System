import { Typography } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect } from 'react';
import { ADS_URLS } from '../../../Services/Urls';
import { publicAxiosInstance } from '../../../Services/Axiosinstance';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
// import { Link } from 'react-router-dom';

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}


const itemData = 
[
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    // rows: 2,
    // cols: 2,
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    rows:2,
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
  },

];

const getMostPoplarAds =async ()=>{
  try
  {

    const {data} = await publicAxiosInstance(ADS_URLS.GET_ALL_ADS)
console.log(data);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data?.message || "Something Went Wrong");
      } else if (error instanceof Error) {
        toast.error(error.message || "Something Went Wrong");
      } else {
        toast.error("Something Went Wrong");
      }
 
  }

  
}



export default function MostPoplarAds() {

  useEffect(()=>{
    getMostPoplarAds();
  },[])

  return (
    <>
      <Typography component='h2' variant='h3' >Most popular ads</Typography>
      
      
    <ImageList
      sx={{ 'width': '100%',marginBlock:'1rem',}}
      variant="quilted"
      cols={3}
      rowHeight={121}
      >
      {itemData.map((item) => (
        <ImageListItem key={item.img} cols={item.cols || 1} rows={item.rows || 1}>
          <img
            {...srcset(item.img, 121, item.rows, item.cols)}
            // sx={{borderRadius:'20px',}}
            alt={item.title}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
    

      
    </>
  )
}




