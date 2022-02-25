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
import CircularProgress from '@mui/material/CircularProgress';
import MessLogo from '../public/messlogo.svg'
import Image from 'next/image'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Navbar = () => {
    const router = useRouter();
    const [loader, setLoader] = React.useState(false);
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
        setLoader(true);
        const data = await axios.post(`${URL}user/login`, { email: profileObj.email });
        if (data.data === "user not found") {
            setAlertMessage({ message: "Account not found!... Please Register", status: "error" })
            setAlert(true);
            return setLoader(false);
        } if (data.data === "your account is blocked") {
            setAlertMessage({ message: "your account is blocked by admin", status: "warning" })
            setAlert(true);
            return setLoader(false);;
        }
        const token = await Jwt.decode(data.data);
        setCookies('auth', data.data, { maxAge: 60 * 60 * 11 });
        setCookies('name', token.name, { maxAge: 60 * 60 * 11 });
        setUserAuth(true)
        setAlertMessage({ message: `welcome back ${token.name}`, status: "success" })
        setAlert(true);
        setLoader(false);
    }

    const logout = () => {
        removeCookies('auth');
        removeCookies('name');
        setUserAuth(false);
        setAlertMessage({ message: "Thank you ..,.. visit us again", status: "warning" })
        setAlert(true);
        router.push('/')
    }

    React.useEffect(() => {

        const token = getCookie('auth');
        const name = getCookie('name');
        if (token && name) {
            const tokenData = Jwt.decode(token);
            if (tokenData !== null) {
                setCookies('name', tokenData.name, { maxAge: 60 * 60 * 11 });
                setUserAuth(true);
            }
        }

    }, [])

    return (
        <>
            <Snackbar open={alert} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity={alertMessage.status} sx={{ width: '100%' }}>
                    {alertMessage.message}
                </Alert>
            </Snackbar>
            <Box sx={{ flexGrow: 1, mb: 8 }}>
                <AppBar position="fixed">
                    <Toolbar sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link href="/" passHref><Typography sx={{ cursor: 'pointer', fontWeight: '800', fontSize: '20px', letterSpacing: '2px' }} variant="h6" component="div">
                            <Image src={MessLogo} alt="mess-poster" width={'100%'} height={50} />
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
                                            clientId={process.env.NEXT_PUBLIC_GOOGLE_URL}
                                            render={renderProps => (
                                                <Button variant="contained" endIcon={loader ? <> <CircularProgress size={30} color="secondary" /> </> : <><GoogleIcon color="error" /> </>} onClick={renderProps.onClick} disabled={renderProps.disabled}>{loader ? "" : "LOGIN"}</Button>
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
        </>
    )
}

export default Navbar
