// import { Outlet } from "react-router-dom";
// import ResponsiveAppBar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import { Box, Container } from "@mui/material";
// import { useContext } from "react";
// import { ThemeContext } from "../../../../context/ThemeContext";



// export default function UserMasterLayout() {

//   const ContextColor = useContext(ThemeContext);
//   if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
//   const { theme }=ContextColor;
//   return (
//     <>
//     <ResponsiveAppBar/>
//     <Box sx={{bgcolor: theme === "dark" ? "#121212" : "#fff", 
//       color: theme === "dark" ? "#fff" : "#000"}}>
//      <Container maxWidth={false} disableGutters sx={{ width: "90%", mb: 8, py: 3 }} >
//      <Outlet/>
//      </Container>
//    <Footer/>
//    </Box>
//     </>
//   )
// }


import { Outlet } from "react-router-dom";
import ResponsiveAppBar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Box, Container } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

export default function UserMasterLayout() {
  const ContextColor = useContext(ThemeContext);
  if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
  const { theme } = ContextColor;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme === "dark" ? "#121212" : "#fff",
        color: theme === "dark" ? "#fff" : "#000"
      }}
    >
      <ResponsiveAppBar />
      
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          width: "90%",
          py: 3,
          flexGrow: 1, 
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}