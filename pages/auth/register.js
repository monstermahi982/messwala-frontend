import React from 'react'
import Head from 'next/head'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleLogin from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Joi from 'joi'
import axios from 'axios'
import { useRouter } from 'next/router'
import Jwt from 'jsonwebtoken'
import { checkCookies, setCookies } from 'cookies-next'
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const theme = createTheme();

const Register = () => {
    const router = useRouter();

    // refer id
    const { refer_id } = router.query;

    const URL = process.env.NEXT_PUBLIC_URL;
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [data, setData] = React.useState(false);
    const [error, setError] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [loader, setLoader] = React.useState(false);
    const [showField, setShowfield] = React.useState(false);
    const [refer, setRefer] = React.useState(refer_id ? refer_id : "");

    const responseGoogle = (response) => {
        setName(response.profileObj.name);
        setEmail(response.profileObj.email)
        setData(true);
        setShowfield(true);
    }

    const addUser = async () => {
        setLoader(true);
        const register = Joi.object({
            email: Joi.string().email({ tlds: { allow: false } }).required(),
            name: Joi.string().min(5).max(40).required(),
            phone: Joi.string().pattern(/^[0-9]+$/).allow('').length(10),
            refer: Joi.string().allow('')
        })

        const { error } = register.validate({ name, email, phone, refer });
        if (error) {
            setError(error.message);
            setOpen(true);
            setLoader(false);
            return
        }

        const user = {
            email, name, phone, refer_id: refer
        }

        // sending data to server
        const data = await axios.post(`${URL}user/register`, user);

        // email already exists
        if (data.data === 'email is already exists') {
            setError('email is already exists');
            setOpen(true);
            setLoader(false);
            return;
        }

        if (data.data === 'blocked') {
            setError('email is blocked by admin');
            setOpen(true);
            setLoader(false);
            return;
        }

        setCookies('auth', data.data, { maxAge: 60 * 60 * 11 })
        const token = Jwt.decode(data.data);
        setCookies('name', token.name, { maxAge: 60 * 60 * 11 });
        setCookies('refer_id', token.refer_id, { maxAge: 60 * 60 * 11 });
        setLoader(false);
        router.push('/');
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <ThemeProvider theme={theme}>

            <Head>
                <title>Mess Wala : register</title>
                <meta name="description" content="online mess menu viewing platform" />
                <meta name="keywords" content="messwala, cattering services, sunny mess, vitthal mess, sinhgad campus, online messwala, messwala online, messwala menus, messwala mess" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>{error}</Alert>
            </Snackbar>

            <Container component="main" maxWidth="xs">
                <Link passHref href="/">
                    <Typography align="center" sx={{ letterSpacing: '2px', fontSize: '50px', fontWeight: 700, cursor: 'pointer' }}>Mess Wala</Typography>
                </Link>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create your Account
                    </Typography>

                    <Box sx={{ my: 2 }}>
                        <GoogleLogin
                            disabled={email ? true : false}
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_URL}
                            render={renderProps => (
                                <Button variant="contained" color="primary" startIcon={<GoogleIcon color="error" />} onClick={renderProps.onClick} disabled={renderProps.disabled}>register with Google</Button>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Box>
                    {
                        showField ?
                            <Box sx={{ mt: 1 }}>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    // label="Email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={email}
                                    disabled

                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="name"
                                    autoFocus
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={data ? false : true}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="phone"
                                    label="Phone (optional)"
                                    name="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    autoComplete="phone"
                                    autoFocus
                                    disabled={data ? false : true}
                                    type="number"
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    id="name"
                                    label="Refer Id (optional)"
                                    name="refer_id"
                                    autoComplete="refer_id"
                                    autoFocus
                                    value={refer}
                                    onChange={(e) => setRefer(e.target.value)}
                                    disabled={data ? false : true}
                                />
                                {
                                    loader ?
                                        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}><CircularProgress color="secondary" /></Box>

                                        :
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            disabled={data ? false : true}
                                            onClick={addUser}
                                        >
                                            Sign In
                                        </Button>
                                }
                            </Box>
                            :
                            <Box sx={{ height: '215px' }}></Box>
                    }

                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: 3 }}>
                        <Box sx={{ marginRight: 2 }}>
                            <Link href="/auth/owner-login" variant="body2">
                                {"Mess Owner"}
                            </Link>
                        </Box>
                        <Box sx={{ marginLeft: 2 }}>
                            <Link href="/" variant="body2">
                                {"Already have an account? Login"}
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    )
}

export default Register


export async function getServerSideProps({ req, res }) {
    const token = checkCookies('auth', { req, res });
    if (token) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {

        }
    }
}