
import {Box} from "@mui/material";

import nodata from '../../../assets/images/no-data.avif'
export default function NoData() {
  return  <Box sx={{textAlign:'center'}}>
  <Box
     component="img"
     alt="no-data"
     src={nodata}
     sx={{
       width: {
         xs: '200px', 
         md: '500px',  
       },
   
     }}
   />
</Box>
}
