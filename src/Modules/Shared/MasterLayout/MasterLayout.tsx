import React, { useContext, useEffect, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
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
import { ThemeContext } from "../../../context/ThemeContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import { AuthContext } from "../../../context/AuthContext";
import { useTranslation } from "react-i18next";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import { toast } from "react-toastify";
import LanguageIcon from '@mui/icons-material/Language'; 
import {  Menu, MenuItem } from "@mui/material";

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
  const theme = context?.theme || "light";
  const toggleTheme = context?.toggleTheme;

  const [open, setOpen] = React.useState(false);
  const [openChangePasswordModal, setOpenChangePasswordModal] = React.useState(false);
  const handleOpenChangePasswordModal = () => setOpenChangePasswordModal(true);
  const handleCloseChangePasswordModal = () => setOpenChangePasswordModal(false);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    navigate("/auth/login");
    toast.success("User Logged Out Successfully");
  };

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <p>Loading...</p>;
  }
  const { userDetails } = authContext;
  const { i18n, t } = useTranslation();

  const NAV_ITEMS = [
    { text: t("NavIconText.Home"), icon: <DashboardIcon />, path: "/dashboard" },
    { text: t("NavIconText.Users"), icon: <GroupIcon />, path: "/dashboard/list-users" },
    { text: t("NavIconText.Rooms"), icon: <MeetingRoomIcon />, path: "/dashboard/rooms" },
    { text: t("NavIconText.Ads"), icon: <AdsClickIcon />, path: "/dashboard/ads" },
    { text: t("NavIconText.List-Booking"), icon: <EventIcon />, path: "/dashboard/list-booking" },
    { text: t("NavIconText.Facilities"), icon: <BuildIcon />, path: "/dashboard/facilities" },
    { text: t("NavIconText.Change-Password"), icon: <LockIcon />, onClick: handleOpenChangePasswordModal },
    { text: t("NavIconText.Logout"), icon: <ExitToAppIcon />, onClick: handleLogout },
  ];

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "rgba(50, 82, 223, 1)",
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
        main: "rgba(50, 82, 223, 1)",
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

  const user = {
    name: userDetails?.userName,
    avatarUrl: userDetails?.profileImage,
  };
console.log(userDetails);

  useEffect(() => {
    document.body.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [i18n.language]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose(); 
};

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
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
                  mx: 1,
                },
                open && { display: "none" },
              ]}
            >
              <MenuIcon />
            </IconButton>

            <Typography sx={{ mx: 1 }} variant="h6" noWrap component="div">
              Staycation.
            </Typography>

            <Box>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              edge="end"
              sx={{px:"20px"}}
            >
              {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton> 
            
       <IconButton onClick={handleClick} color="inherit">
        <LanguageIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleChangeLanguage("ar")}>{t("LanguageSwitcher.arabic")}</MenuItem>
        <MenuItem onClick={() => handleChangeLanguage("en")}>{t("LanguageSwitcher.english")}</MenuItem>
       </Menu>
       </Box>



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
          anchor={i18n.language === "ar" ? "right" : "left"}
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {i18n.language === "ar" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.text} disablePadding>
              {item.path ? (
                <ListItemButton component={Link} to={item.path} onClick={item.onClick}>
                  <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              ) : (
                <ListItemButton onClick={item.onClick}>
                  <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </Drawer>
        <Main open={open} lang={i18n.language}>
          <DrawerHeader />
          <Box sx={{ overflowX: "auto" }}>
            <Outlet />
          </Box>
        </Main>
        <ChangePasswordModal
          handleClose={handleCloseChangePasswordModal}
          open={openChangePasswordModal}
        />
      </Box>
    </ThemeProvider>
  );
}

