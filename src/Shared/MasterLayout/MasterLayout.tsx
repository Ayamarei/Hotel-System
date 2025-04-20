// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import { Link } from 'react-router-dom';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import AdsClickIcon from '@mui/icons-material/AdsClick';
// import EventIcon from '@mui/icons-material/Event';
// import BuildIcon from '@mui/icons-material/Build';
// import LockIcon from '@mui/icons-material/Lock';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { Outlet } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { useTranslation } from 'react-i18next';

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         transition: theme.transitions.create('margin', {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//         marginLeft: 0,
//       },
//     },
//   ],
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   variants: [
//     {
//       props: ({ open }) => open,
//       style: {
//         width: `calc(100% - ${drawerWidth}px)`,
//         marginLeft: `${drawerWidth}px`,
//         transition: theme.transitions.create(['margin', 'width'], {
//           easing: theme.transitions.easing.easeOut,
//           duration: theme.transitions.duration.enteringScreen,
//         }),
//       },
//     },
//   ],
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// export default function PersistentDrawerLeft() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const [darkMode, setDarkMode] = React.useState(false); 

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const NAV_ITEMS = [
//     { text: 'Home', icon: <DashboardIcon />, path: '/dashboard' },
//     { text: 'Users', icon: <GroupIcon />, path: '/dashboard/list-users' },
//     { text: 'Rooms', icon: <MeetingRoomIcon />, path: '/dashboard/rooms' },
//     { text: 'Ads', icon: <AdsClickIcon />, path: '/dashboard/ads' },
//     { text: 'List Booking', icon: <EventIcon />, path: '/dashboard/list-booking' },
//     { text: 'Facilities', icon: <BuildIcon />, path: '/dashboard/facilities' },
//     { text: 'Change Password', icon: <LockIcon />, path: '/change-password' },
//     { text: 'Logout', icon: <ExitToAppIcon />, path: '/dashboard/logout' },
//   ];


// // Dark and light
// const lightTheme = createTheme({
//     palette: {
//       mode: 'light',
//       primary: {
//         main: '#203FC7', //main color for sidebar
//       },
//       secondary: {
//         // main color for navebar
//         main: '#F8F9FB',
//       },
//       background: {
//         default: '#f3f4f6', 
//         paper: '#ffffff',
//       },
//       text: {
//         primary: '#212121', // text color
//       },
//     },
//   });
  
//   const darkTheme = createTheme({
//     palette: {
//       mode: 'dark',
//       primary: {
//         main: '#203FC7', 
//       },
//       secondary: {
//         main: '#F8F9FB',
//       },
//       background: {
//         default: '#121212', 
//         paper: '#1f1f1f',  
//       },
//       text: {
//         primary: '#ffffff', 
//       },
//     },
//   });
  
//   // const{t}=useTranslation()
//   return (
//     <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
//       <Box sx={{ display: 'flex' }}>
//         <CssBaseline />
//         <AppBar position="fixed" open={open} sx={{ bgcolor: 'secondary.main', color: 'black' }}>
//           <Toolbar>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               onClick={handleDrawerOpen}
//               edge="start"
//               sx={[
//                 {
//                   mr: 2,
//                 },
//                 open && { display: 'none'},
//               ]}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div">
//               Staycation.
//             </Typography>
//             <IconButton
//               color="inherit"
//               aria-label="toggle dark mode"
//               onClick={toggleDarkMode}
//               edge="end"
              
//             >
//               {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//             </IconButton>
//           </Toolbar>
//         </AppBar >
//         <Drawer
//           sx={{
//             width: drawerWidth,
//             flexShrink: 0,
//             '& .MuiDrawer-paper': {
//               width: drawerWidth,
//               boxSizing: 'border-box',
//               bgcolor: 'primary.main', 
//               text: '#ffffff',
//               color: '#ffffff',
//             },
            
//           }}
//           variant="persistent"
//           anchor="left"
//           open={open}
          
//         >
//           <DrawerHeader>
//             <IconButton onClick={handleDrawerClose}  sx={{ color: 'white' }}  >
//               {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//             </IconButton>
//           </DrawerHeader>

         
//           {NAV_ITEMS.map((item) => (
//             <ListItem key={item.text} disablePadding>
//               <ListItemButton component={Link} to={item.path} >
//                 <ListItemIcon  sx={{ color: 'white' }} >
//                   {item.icon }
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </Drawer>

//         <Main open={open}>
//           <DrawerHeader />
//           <Outlet />
//         </Main>
//       </Box>
//     </ThemeProvider>
//   );
// }





// // في PersistentDrawerLeft.tsx
// import * as React from 'react';
// import { styled, useTheme } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// import CssBaseline from '@mui/material/CssBaseline';
// import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import { Link } from 'react-router-dom';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import GroupIcon from '@mui/icons-material/Group';
// import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
// import AdsClickIcon from '@mui/icons-material/AdsClick';
// import EventIcon from '@mui/icons-material/Event';
// import BuildIcon from '@mui/icons-material/Build';
// import LockIcon from '@mui/icons-material/Lock';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
// import Brightness7Icon from '@mui/icons-material/Brightness7';
// import { Outlet } from 'react-router-dom';
// import { useThemeMode } from '../../context/ThemeContext'; 

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: open ? 0 : `-${drawerWidth}px`,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })<AppBarProps>(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));

// export default function PersistentDrawerLeft() {
//   const theme = useTheme();
//   const [open, setOpen] = React.useState(false);
//   const { darkMode, toggleDarkMode } = useThemeMode();     

//   const handleDrawerOpen = () => setOpen(true);
//   const handleDrawerClose = () => setOpen(false);

//   const NAV_ITEMS = [
//     { text: 'Home', icon: <DashboardIcon />, path: '/dashboard' },
//     { text: 'Users', icon: <GroupIcon />, path: '/dashboard/list-users' },
//     { text: 'Rooms', icon: <MeetingRoomIcon />, path: '/dashboard/rooms' },
//     { text: 'Ads', icon: <AdsClickIcon />, path: '/dashboard/ads' },
//     { text: 'List Booking', icon: <EventIcon />, path: '/dashboard/list-booking' },
//     { text: 'Facilities', icon: <BuildIcon />, path: '/dashboard/facilities' },
//     { text: 'Change Password', icon: <LockIcon />, path: '/change-password' },
//     { text: 'Logout', icon: <ExitToAppIcon />, path: '/dashboard/logout' },
//   ];

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" open={open} sx={{ bgcolor: '#fff', color: 'black', boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", }}>
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             onClick={handleDrawerOpen}
//             edge="start"
//             sx={[
//               {
//                 mr: 2,
//               },
//               open && { display: 'none' },
//             ]}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div">
//             Staycation.
//           </Typography>
//           <IconButton color="inherit" onClick={toggleDarkMode} edge="end" sx={{ ml: 'auto' }}>
//             {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
//           </IconButton>
//         </Toolbar>
//       </AppBar>

//       <Drawer
//         sx={{
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             bgcolor: 'primary.main',
//             color: '#ffffff',
//           },
//         }}
//         variant="persistent"
//         anchor="left"
//         open={open}
//       >
//         <DrawerHeader>
//           <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
//             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
//           </IconButton>
//         </DrawerHeader>

//         {NAV_ITEMS.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton component={Link} to={item.path}>
//               <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </Drawer>

//       <Main open={open}>
//         <DrawerHeader />
//         <Outlet />
//       </Main>
//     </Box>
//   );
// }


















import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import EventIcon from '@mui/icons-material/Event';
import BuildIcon from '@mui/icons-material/Build';
import LockIcon from '@mui/icons-material/Lock';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext } from 'react';
const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: open ? 0 : `-${drawerWidth}px`,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const { theme, toggleTheme } = useContext(ThemeContext) ?? {};

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const NAV_ITEMS = [
    { text: 'Home', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Users', icon: <GroupIcon />, path: '/dashboard/list-users' },
    { text: 'Rooms', icon: <MeetingRoomIcon />, path: '/dashboard/rooms' },
    { text: 'Ads', icon: <AdsClickIcon />, path: '/dashboard/ads' },
    { text: 'List Booking', icon: <EventIcon />, path: '/dashboard/list-booking' },
    { text: 'Facilities', icon: <BuildIcon />, path: '/dashboard/facilities' },
    { text: 'Change Password', icon: <LockIcon />, path: '/change-password' },
    { text: 'Logout', icon: <ExitToAppIcon />, path: '/dashboard/logout' },
  ];

  return (
    
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: '#fff', color: 'black', boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", }}>
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
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Staycation.
          </Typography>
          {/* toggleButton*/}
          <IconButton color="inherit" onClick={toggleTheme} edge="end" sx={{ ml: 'auto' }}>
            {theme ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            bgcolor: 'primary.main',
            color: '#ffffff',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        

        </DrawerHeader>

        {NAV_ITEMS.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </Drawer>

      <Main open={open}>
        {/* navbar */}
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}
