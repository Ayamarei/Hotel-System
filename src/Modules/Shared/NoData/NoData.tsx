
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
         xs: '150px', 
         md: '300px',  
         borderRadius:"10px"
       },
   
     }}
   />
</Box>
}
