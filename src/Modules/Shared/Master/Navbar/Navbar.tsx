import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthContext';
import { Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { toast } from 'react-toastify';
import { ThemeContext } from '../../../../context/ThemeContext';
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";





const pages = [
  { name: 'Home', path: '' },
  { name: 'Explore', path: '/user-room' },
];

const privatePages = [
  // { name: 'Reviews', path: '' },
  { name: 'Favorites', path: '/user-room-fav' },
];


function ResponsiveAppBar() {
  

  const ContextColor = useContext(ThemeContext);
    if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
    const {theme, toggleTheme }=ContextColor;
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  const authContext = useContext(AuthContext);

  if (!authContext) {
    return <p>Loading...</p>;
  }
  const { userDetails } = authContext;
  const user = {
    name: userDetails?.userName,
    avatarUrl: userDetails?.profileImage,
  };


  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleCloseNavMenu();
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    console.log("User logged out");
    navigate("/");
    toast.success("User Logged Out Successfully");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#fff", color: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700, color: 'inherit', mr: 2 }}
           
          >
            Staycation.
          </Typography>



          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map(({ name, path }) => (
                <MenuItem key={name} onClick={() => handleNavigate(path)}>
                  <Typography textAlign="center">{name}</Typography>
                </MenuItem>
              ))}
              {isLoggedIn &&
                privatePages.map(({ name, path }) => (
                  <MenuItem key={name} onClick={() => handleNavigate(path)}>
                    <Typography textAlign="center">{name}</Typography>
                  </MenuItem>
                ))}
              {!isLoggedIn && (
                <>
                  <MenuItem onClick={() => handleNavigate('/auth/login')}>
                    <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => handleNavigate('/auth/register')}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 2 }}>
            {pages.map(({ name, path }) => (
              <Button key={name} onClick={() => handleNavigate(path)} sx={{ color: '#000' }}>
                {name}
              </Button>
            ))}
            {isLoggedIn &&
              privatePages.map(({ name, path }) => (
                <Button key={name} onClick={() => handleNavigate(path)} sx={{ color: '#000' }}>
                  {name}
                </Button>
              ))}
          </Box>


          {isLoggedIn && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
              <Avatar alt={user.name} src={user.avatarUrl} />
              <Typography variant="body1">{user.name}</Typography>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>

                <ArrowDropDownIcon sx={{ color: '#000' }} />
              </IconButton>

              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => { handleNavigate('/profile'); handleCloseUserMenu(); }}>
                  Profile
                </MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleCloseUserMenu(); }}>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}



          <IconButton
              color="inherit"
              onClick={toggleTheme}
              edge="end"
              sx={{px:"20px"}}
            >
              {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
            </IconButton> 

          <Box sx={{ display: { md: 'flex' }, gap: 1 }}>
            {isLoggedIn ? (
              ""
            ) : (
              <>
                <Button  variant="contained" color="primary" onClick={() => handleNavigate('/auth/login')}>
                  Login
                </Button>
                <Button variant="contained"
                  color="primary"
                  onClick={() => handleNavigate('/auth/register')}>
                  Register
                </Button>
              </>
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
