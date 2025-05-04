import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { THEMECOLOR } from '../../../../Services/ThemeColors';
import { IAuthProps } from '../../../../Interfaces/AuthProps';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../../context/ThemeContext';
import { useContext } from 'react';
import loginImg from  '../../../../assets/images/auth/login.png'
import registerImg from  '../../../../assets/images/auth/register.png'
import resetImg from  '../../../../assets/images/auth/reset-password.png'
import forgetImg from  '../../../../assets/images/auth/forget-password.png'


export default function AuthLayout() {
    const{t}=useTranslation();
    const location = useLocation();

  const ContextColor=useContext(ThemeContext);
  if (!ContextColor) throw new Error("AuthContext must be used within AuthProvider");
  const { theme } = ContextColor;

    // Define props for each route dynamically
    const routePropsMap: Record<string, IAuthProps> = {
        '/auth/login': {
        image: loginImg,
        title: t("AuthLogin.title"),
        description: t("AuthLogin.description"),
        subDescription:t("AuthLogin.subDescription"),
        spanDescription:t("AuthLogin.subDescription"),
        // buttonTitle: 'Login',
        href:"/auth/register"
        },
        '/auth/register': {
        image: registerImg,
        title: t("AuthRegister.title"),
        description:t("AuthRegister.description"),
        subDescription:t("AuthRegister.subDescription"),
        spanDescription:t("AuthRegister.spanDescription"),
        buttonTitle:t("AuthRegister.buttonTitle"),
        href:"/auth/login"
        },
        '/auth/forget-password': {
        image: forgetImg,
        title: t("AuthForget.title"),
        description:  t("AuthForget.description"),
        subDescription: t("AuthForget.subDescription"),
        spanDescription: t("AuthForget.spanDescription"),
        buttonTitle: t("AuthForget.buttonTitle"),
        href:"/auth/login"
        },
        '/auth/reset-password': {
        image: resetImg,
        title: t("AuthRest.title"),
        description:t("AuthRest.description"),
        subDescription:t("AuthRest.subDescription"),
        spanDescription:t("AuthRest.spanDescription"),
        buttonTitle:t("AuthRest.buttonTitle"),
        href:"/auth/login"
        },
    };

    // Get the current route's props or set default props
    const { image, title, description, subDescription, spanDescription ,href} = routePropsMap[location.pathname] || {
        image: '',
        title: '',
        description: '',
        subDescription: '',
        spanDescription: '',
        buttonTitle: '',
        href:'',
    };
    
    return (
        <>
        <Grid  container spacing={0}  sx={{display:'flex' ,justifyContent:'center',backgroundColor: theme === "light" ? "white" : "#121212"}}>
            <Grid size={{ xs: 12, md: 6 }} >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'space-between',
                    height: '100vh',
                    overflowY: 'auto',
                    scrollbarWidth: 'none',        
                    msOverflowStyle: 'none',       
                    '&::-webkit-scrollbar': {
                        display: 'none'              
                    }
                    }}
                    >

                    <Typography
                        sx={{ textAlign: 'left', marginLeft: {xs:'15px',sm:'49px'}  ,marginTop:'15px' }}
                        component="div" 
                    >
                        <Typography
                            sx={{
                                fontWeight: '500',
                                fontSize: '26px',
                                lineHeight: '100%',
                                color: THEMECOLOR.mainBlue,
                            }}
                            component="span" 
                        >
                        {t("AuthLayout.stay")}
                        </Typography>
                        <Typography
                        sx={{
                            fontWeight: '500',
                            fontSize: '26px',
                            lineHeight: '100%',
                            color: theme === 'dark' ? 'white' : 'black',
                        }}
                        component="span" 
                        >
                        {t("AuthLayout.cation")}
                        </Typography>
                    </Typography>
                    <Box sx={{ textAlign: 'start', marginLeft: {xs:'40px', sm:'123px'} ,  marginRight: {xs:'40px', sm:'123px'} }}>
                        <Typography variant="h5" sx={{fontWeight:'bold', marginTop: {xs:2,md:6}, marginBottom: {xs:2,md:3 },color: theme === 'dark' ? 'white' : 'black',}}>
                            {title}
                        </Typography>
                        <Typography component="p" sx={{ lineHeight: { xs: '18px', sm: '22px' }, color: theme === 'dark' ? 'white' : 'black', marginBottom: { xs: 2, md: 2 }, fontSize: { xs: '16px', sm: '20px' } }}>
                        {description}
                        </Typography>

                        <Typography>
                            <Typography component="span" sx={{color: theme === 'dark' ? 'white' : 'black',marginBottom: {xs:1,md:2} ,fontSize:{xs:'14px',sm:'22px'} }}>
                                {subDescription}  {"  "} 
                            </Typography>
                            <Link component={RouterLink}  to={href || "#"} underline="none" sx={{fontWeight:'bold',color:THEMECOLOR.mainRed, marginBottom: {xs:2,md:5} }}>
                                {spanDescription}
                            </Link>
                        </Typography>    

                        <Box sx={{display:'flex',justifyContent: 'flex-start',flexDirection:'column' ,paddingTop:{xs:1,sm:2} ,marginTop:{xs:1,sm:3}}}>
                            <Box sx={{ display:'flex',justifyContent:'start',alignItems:'start',marginBottom:{xs:1,sm:5},flexDirection:'column' }}>
                                <Outlet />
                            </Box>
                        </Box>

                        
                
                    </Box>
                </Box>
            </Grid>
            <Grid
                size={{ md: 6 }}
                sx={{
                    display: {xs:'none',md:'block'} ,
                    width:'95%' ,
                    height: '98vh', 
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius:5
                    
                }}
                >
            </Grid>

        </Grid>
        </>
    );
}