import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Heading({to,title,item}:{to:string,title:string,item:string}) {
  return <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center",flexDirection:{sm:'column',md:"row"} }}>
        <Box>
          <Typography sx={{ color: 'rgba(31, 38, 62, 1)', fontWeight: 500, fontSize: '20px' }}>{title} Table Details</Typography>
          <Typography sx={{ color: 'rgba(50, 60, 71, 1)', fontSize: "14px" }}>You can check all details</Typography>
        </Box>
       {to && <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/dashboard/add-room"
          sx={{ px: '50px', py: "15px", backgroundColor: "rgba(32, 63, 199, 1)",mt:{sx:'20px',md:0} }}
        >
          Add new {item}
        </Button>}
      </Box>
  </>;
}
