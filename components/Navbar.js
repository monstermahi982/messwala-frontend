import React from 'react'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import GoogleLogin from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import axios from 'axios'
import Jwt from 'jsonwebtoken'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'next/router'
import { setCookies, getCookie, removeCookies } from 'cookies-next';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
    const router = useRouter();
    const [alert, setAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState({});
    const handleAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(false);
    };
    const URL = process.env.NEXT_PUBLIC_URL;
    const [userAuth, setUserAuth] = React.useState(false);
    const responseGoogle = async ({ profileObj }) => {
        const data = await axios.post(`${URL}user/login`, { email: profileObj.email })
        if (data.data.data === "email not found") {
            setAlertMessage({ message: "email not found", status: "error" })
            setAlert(true);
            return;
        }
        const token = await Jwt.decode(data.data);
        // console.log(data.data);
        setCookies('auth', data.data);
        setCookies('name', token.name);
        setUserAuth(true)
        setAlertMessage({ message: `welcome back ${token.name}`, status: "success" })
        setAlert(true);
    }

    const logout = () => {
        removeCookies('auth');
        removeCookies('name');
        setUserAuth(false);
        setAlertMessage({ message: "visit us again", status: "warning" })
        setAlert(true);
        router.push('/')
    }

    React.useEffect(() => {

        const token = getCookie('auth');
        if (token) {
            const tokenData = Jwt.decode(token);
            setCookies('name', tokenData.name);
            setUserAuth(true);
        }

    }, [])

    return (
        <div>
            <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alertMessage.status} sx={{ width: '100%' }}>
                    {alertMessage.message}
                </Alert>
            </Snackbar>
            <Box sx={{ flexGrow: 1, mb: 8 }}>
                <AppBar position="fixed">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link href="/" passHref><Typography sx={{ cursor: 'pointer', fontWeight: '800', fontSize: '20px', letterSpacing: '2px' }} variant="h6" component="div">
                            Mess Wala
                        </Typography></Link>
                        <Box>
                            {
                                userAuth ?
                                    <>
                                        <Typography variant="overline" sx={{ fontWeight: 'bold', fontFamily: 'Monospace', pr: 2, textTransform: 'capitalize' }} >Hii {getCookie('name').split(' ')[0]}</Typography>
                                        <Button variant="contained" onClick={logout}>Logout</Button>

                                    </>
                                    :
                                    <>
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
                                    </>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar
