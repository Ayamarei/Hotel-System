import { Outlet, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { THEMECOLOR } from '../../../../Services/ThemeColors';
import { IAuthProps } from '../../../../Interfaces/AuthProps';
import Link from '@mui/material/Link';

export default function AuthLayout() {
    const location = useLocation();

    // Define props for each route dynamically
    const routePropsMap: Record<string, IAuthProps> = {
        '/login': {
        image: '/src/assets/images/auth/login.png',
        title: 'Login',
        description: 'If you don’t have an account, please register.',
        subDescription: 'You Can',
        spanDescription: 'Register here',
        buttonTitle: 'Login',
        href:"/register"
        },
        '/register': {
        image: '/src/assets/images/auth/register.png',
        title: 'Register',
        description: 'If you already have an account ',
        subDescription: 'You Can',
        spanDescription: 'Login here',
        buttonTitle: 'Register',
        href:"/login"
        },
        '/forget-password': {
        image: '/src/assets/images/auth/forget-password.png',
        title: 'Forgot Password',
        description: 'If you already have an account ',
        subDescription: 'You Can',
        spanDescription: 'Login here',
        buttonTitle: 'send',
        href:"/login"
        },
        '/reset-password': {
        image: '/src/assets/images/auth/reset-password.png',
        title: 'Reset Password',
        description: 'If you already have an account ',
        subDescription: 'You Can',
        spanDescription: 'Login here',
        buttonTitle: 'Reset',
        href:"/login"
        },
    };

    // Get the current route's props or set default props
    const { image, title, description, buttonTitle, subDescription, spanDescription ,href} = routePropsMap[location.pathname] || {
        image: '',
        title: '',
        description: '',
        subDescription: '',
        spanDescription: '',
        buttonTitle: '',
        href:'',
    };
    
    return (
        <Grid container spacing={0}  sx={{display:'flex' ,justifyContent:'center' }}>
            <Grid size={{ xs: 12, md: 6 }} >
                <Box sx={{ display:'flex' ,flexDirection:'column' , alignItems:'space-between' }}>
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
                        Stay
                        </Typography>
                        <Typography
                        sx={{
                            fontWeight: '500',
                            fontSize: '26px',
                            lineHeight: '100%',
                        }}
                        component="span" 
                        >
                        cation
                        </Typography>
                    </Typography>
                    <Box sx={{ textAlign: 'start', marginLeft: {xs:'40px', sm:'123px'} ,  marginRight: {xs:'40px', sm:'123px'} }}>
                        <Typography variant="h5" sx={{fontWeight:'bold', marginTop: {xs:2,md:6}, marginBottom: {xs:2,md:3 }}}>
                            {title}
                        </Typography>

                        <Typography component="p" sx={{lineHeight:{xs:'10px',sm:'12px'},color:THEMECOLOR.lightBlack, marginBottom: {xs:1,md:2} ,fontSize:{xs:'14px',sm:'22px'}}}>
                            {description}
                        </Typography>
                        <Typography>
                            <Typography component="span" sx={{ color:THEMECOLOR.lightBlack,marginBottom: {xs:1,md:2} ,fontSize:{xs:'14px',sm:'22px'} }}>
                                {subDescription}  {"  "} 
                            </Typography>
                            <Link href={href} underline="none" sx={{fontWeight:'bold',color:THEMECOLOR.mainRed, marginBottom: {xs:2,md:5} }}>
                                {spanDescription}
                            </Link>
                        </Typography>    

                        <Box sx={{display:'flex',justifyContent: 'flex-start',flexDirection:'column' ,paddingTop:{xs:1,sm:2} ,marginTop:{xs:1,sm:3}}}>
                            <Box sx={{ display:'flex',justifyContent:'start',alignItems:'start',marginBottom:{xs:1,sm:5},flexDirection:'column' }}>
                                <Outlet />
                            </Box>

                            {/* <Button
                                variant="contained"
                                sx={{
                                    display:'block' ,
                                    backgroundColor: THEMECOLOR.mainBlue,
                                    paddingLeft: {xs:16,sm:30},
                                    paddingRight: {xs:16,sm:30},
                                    margin:'auto' 
                                }}
                                >
                                {buttonTitle}
                            </Button> */}
                        </Box>
                        
                
                    </Box>
                </Box>
            </Grid>
            <Grid
                size={{ md: 6 }}
                sx={{
                    display: {xs:'none',md:'block'} ,
                    width:'95%' ,
                    height: '140vh', 
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover', 
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    borderRadius:5
                }}
                >
            </Grid>

        </Grid>
    );
}