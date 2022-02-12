import React from 'react'
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
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import Jwt from 'jsonwebtoken';
import { useRouter } from 'next/router'
import { setCookies, checkCookies } from 'cookies-next';
import Joi from 'joi'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);
const theme = createTheme();

const OwnerLogin = () => {
    const router = useRouter();
    const URL = process.env.NEXT_PUBLIC_URL;
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordShow, setPasswordShow] = React.useState(false);
    const [show, setShow] = React.useState(false)
    const [error, setError] = React.useState('');
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const responseGoogle = (response) => {
    }

    const handleClickShowPassword = () => {
        setPasswordShow(!passwordShow)
    };

    const phoneAuth = async () => {

        const loginOwner = Joi.object({
            password: Joi.string().required(),
            phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
        })

        const { error } = loginOwner.validate({ password, phone });
        if (error) {

            setError(error.message);
            setOpen(true);
            return
        }

        const data = await axios.post(`${URL}owner/login`, {
            owner_phone: phone, owner_password: password
        })
        if (data.data === 'not found') {
            setError('account not found');
            setOpen(true);
            return;
        }
        if (data.data === 'wrong password') {
            setError('please enter correct password');
            setOpen(true);
            return;
        }
        setCookies('auth', data.data);

        const tokeninfo = Jwt.decode(data.data);
        setCookies('name', tokeninfo.name, { maxAge: 60 * 10 });
        setCookies('id', tokeninfo.mess_id, { maxAge: 60 * 10 });
        router.push('/dashboard');
    }

    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose} sx={{ width: '100%' }}>{error}</Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs" sx={{ minHeight: '100vh' }}>
                <CssBaseline />
                <Link passHref href="/">
                    <Typography align="center" sx={{ letterSpacing: '2px', fontSize: '50px', fontWeight: 700, cursor: 'pointer' }}>Mess Wala</Typography>
                </Link>
                <Box
                    sx={{
                        marginTop: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Owner Login
                    </Typography>

                    <Box sx={{ my: 2 }}>
                        <GoogleLogin
                            clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
                            render={renderProps => (
                                <Button variant="contained" color="primary" startIcon={<GoogleIcon color="error" />} onClick={renderProps.onClick} disabled={renderProps.disabled}>register with Google</Button>
                            )}
                            disabled
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Box>

                    <Box >
                        <Divider sx={{ color: "red" }}>
                            <Chip label="OR" />
                        </Divider>
                    </Box>

                    <Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <FormControl sx={{ width: '100%' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput

                                id="outlined-adornment-password"
                                type={passwordShow ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}

                                            edge="end"
                                        >
                                            {passwordShow ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={phoneAuth}
                        >
                            Login
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item sx={{ pb: 1 }}>
                                <Button onClick={() => setShow(!show)}>
                                    {"Don't have an account?"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                {
                    show ?
                        <Card sx={{ width: '100%', my: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    Mahesh Gaikwad
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    Founder & CEO of messwala
                                </Typography>
                                <Typography variant="body2">
                                    9370963976
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => window.open('tel:9370963976')}>Click to Call</Button>
                            </CardActions>
                        </Card>
                        : ""
                }
            </Container>
        </ThemeProvider >
    )
}

export default OwnerLogin

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