import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeContext";
import { THEMECOLOR } from "../../../Services/ThemeColors";
export default function Heading({to,title,item,handleClick}:{to?:string,title:string,item:string,handleClick?:()=>void}) {
  const{t,i18n}=useTranslation()
      const ContextColor = useContext(ThemeContext);
      if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
      const { theme } = ContextColor;
  return <>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center",flexDirection:{sm:'column',md:"row"} }}>
        <Box>
           {i18n.language === "ar" ? 
  <Typography sx={{ color: theme === 'dark' ? 'rgba(50, 82, 223, 1)' : 'black', fontWeight: 500, fontSize: '20px' }}>
    {t("Heading.Table-Details")} {title}
  </Typography> 
  : 
  <Typography sx={{ color: theme === 'dark' ? 'rgba(50, 82, 223, 1)' : 'black', fontWeight: 500, fontSize: '20px' }}>
    {title} {t("Heading.Table-Details")}
  </Typography>
}
          <Typography sx={{ color: theme === 'dark' ? 'white' : 'black', fontSize: "14px" }}>{t("Heading.Table-description")}</Typography>
    
        </Box>
       {to && <Button
          variant="contained"
          color="primary"
          component={Link}
          to= {to}
          onClick={handleClick}
          sx={{ px: '50px', py: "15px", backgroundColor:THEMECOLOR.mainBlue,mt:{sx:'20px',md:0} }}
        >
         {t("Heading.Add-new-room")} {item}
        </Button>}
       {handleClick && <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          sx={{ px: '50px', py: "15px", backgroundColor: THEMECOLOR.mainBlue,mt:{sx:'20px',md:0} }}
        >
         {t("Heading.Add-new-facilities")}{item}
        </Button>}
      </Box>
  </>;
}
