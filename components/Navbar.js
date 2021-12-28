import React from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
const Navbar = () => {

    const responseGoogle = (response) => {
        console.log(response);
    }

    const name = "Mahesh Gaikwad"

    return (
        <div>
            <Box sx={{ flexGrow: 1, mb: 8 }}>
                <AppBar position="fixed">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link href="/" passHref><Typography sx={{ cursor: 'pointer', fontWeight: '800', fontSize: '20px', letterSpacing: '2px' }} variant="h6" component="div">
                            Mess Wala
                        </Typography></Link>
                        <Box>
                            <Link href="/auth/register" passHref><Button sx={{ px: 3 }} color="inherit">Signup</Button></Link>
                            <GoogleLogin
                                clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
                                render={renderProps => (
                                    <Button variant="contained" endIcon={<GoogleIcon color="error" />} onClick={renderProps.onClick} disabled={renderProps.disabled}>Login</Button>
                                )}
                                buttonText="Login"
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />

                            {/* <Typography variant="overline" sx={{ fontWeight: 'bold', fontFamily: 'Monospace', pr: 2, textTransform: 'capitalize' }} >Hii {name.split(' ')[0]}</Typography>
                            <Button variant="contained">Logout</Button> */}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar
