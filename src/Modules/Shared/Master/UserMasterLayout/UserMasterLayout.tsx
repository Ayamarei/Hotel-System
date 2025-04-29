import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Box, Container } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";



export default function UserMasterLayout() {

  const ContextColor = useContext(ThemeContext);
  if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
  const { theme }=ContextColor;
  return (
    <>
    <ResponsiveAppBar/>
    <Box sx={{bgcolor: theme === "dark" ? "#121212" : "#f7f7f7", 
      color: theme === "dark" ? "#fff" : "#000"}}>
     <Container maxWidth="lg" disableGutters  sx={{mb:8 ,py:3 }} >
     <Outlet/>
     </Container>
   <Footer/>
   </Box>
    </>
  )
}
