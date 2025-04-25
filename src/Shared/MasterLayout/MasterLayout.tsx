import React, { useContext, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import EventIcon from "@mui/icons-material/Event";
import BuildIcon from "@mui/icons-material/Build";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";

const drawerWidth = 240;

const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "lang",
})<{
  open?: boolean;
  lang: string;
}>(({ theme, open, lang }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(lang === "ar"
    ? { marginRight: open ? 0 : `-${drawerWidth}px` }
    : { marginLeft: open ? 0 : `-${drawerWidth}px` }),
}));


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "lang",
})<AppBarProps & { lang: string }>(({ theme, open, lang }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    ...(lang === "ar"
      ? { marginRight: `${drawerWidth}px` }
      : { marginLeft: `${drawerWidth}px` }),
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const context = useContext(ThemeContext);
  // Ensure context is not null before accessing theme and toggleTheme
  const theme = context?.theme || "light"; // Default to 'light' if context is null
  const toggleTheme = context?.toggleTheme;

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <p>Loading...</p>; 
  }
  const { userDetails } = authContext;

  const{i18n}=useTranslation()
 // HANDLE LOGOUT
//  const handleLogOut = () => {
//   console.log("User logging out...");
//   localStorage.removeItem("tkn");
//   navigate("/login");
// };

  const NAV_ITEMS = [
    { text: "Home", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Users", icon: <GroupIcon />, path: "/dashboard/list-users" },
    { text: "Rooms", icon: <MeetingRoomIcon />, path: "/dashboard/rooms" },
    { text: "Ads", icon: <AdsClickIcon />, path: "/dashboard/ads" },
    {
      text: "List Booking",
      icon: <EventIcon />,
      path: "/dashboard/list-booking",
    },
    { text: "Facilities", icon: <BuildIcon />, path: "/dashboard/facilities" },
    { text: "Change Password", icon: <LockIcon />, path: "/change-password" },
    { text: "Logout", icon: <ExitToAppIcon />, path: "/login"},
  ];

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#203FC7",
      },
      secondary: {
        main: "#F8F9FB",
      },
      background: {
        default: "#f3f4f6",
        paper: "#ffffff",
      },
      text: {
        primary: "#212121",
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#203FC7",
      },
      secondary: {
        main: "#F8F9FB",
      },
      background: {
        default: "#121212",
        paper: "#1f1f1f",
      },
      text: {
        primary: "#ffffff",
      },
    },
  });

  // Example user data
  const user = {
    name: userDetails?.userName, 
    avatarUrl:userDetails?.profileImage, 
  };
  useEffect(() => {
    document.body.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);
  
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        {/* navbar */}
        <AppBar
          position="fixed"
          lang={i18n.language}
          open={open}
          sx={{
            bgcolor: "#fff",
            color: "black",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={[
                {
                  mr: 2,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Staycation.
            </Typography>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              edge="end"
              sx={{ ml: 2 }}
            >
              {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton>
            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar alt={user.name} src={user.avatarUrl} sx={{ mr: 1 }} />
              <Typography variant="body1">{user.name}</Typography>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "primary.main",
              color: "#ffffff",
            },
          }}
          variant="persistent"
          // anchor="left"
          anchor={i18n.language==="ar"?"right":"left"}
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {i18n.language==="ar"?<ChevronLeftIcon/>:<ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <button onClick={()=>{i18n.changeLanguage("ar")}}>Ar</button>
          <button  onClick={()=>{i18n.changeLanguage("en")}}>En</button>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </Drawer>
        <Main open={open}  lang={i18n.language}>
          <DrawerHeader />
          <Box sx={{overflowX:"auto"}}>
          <Outlet />
          </Box>
        </Main>
      </Box>
    </ThemeProvider>
  );
}




