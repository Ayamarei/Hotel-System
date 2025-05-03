import { ThemeContext } from "../../../context/ThemeContext";
import { Box, Typography } from '@mui/material'
import { useContext } from 'react';
import { THEMECOLOR } from "../../../Services/ThemeColors";

export default function UserPortalHeading({title}:{title:string}) {
    const ContextColor = useContext(ThemeContext);
    if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
    const { theme } = ContextColor;
  return (
    <Box sx={{ paddingX: { xs: "20px", md: "50px" },
}}>
      <Typography sx={{ color: theme === 'dark' ? THEMECOLOR.White : THEMECOLOR.user_portal_blue, fontWeight:500,fontSize:{xs:16,sm:24}, mt:2,mb:2 }}>
          {title}
      </Typography> 
    </Box>
  )
}
