import { Box, Typography } from "@mui/material";
import { IDashboardHeadingProps } from "../../../../Interfaces/DashboardHeadingProps";



export default function DashboardHeading({title}:IDashboardHeadingProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' ,marginBottom:1}}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {title} Table Details
        </Typography>
        <Typography component="p" sx={{ fontWeight: 'normal',marginTop:1 }}>
            You Can Check All Details
        </Typography>
    </Box>
  )
}
