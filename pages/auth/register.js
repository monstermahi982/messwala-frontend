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

const theme = createTheme();

const Register = () => {

    const [name, setName] = React.useState();
    const [email, setEmail] = React.useState();
    const [phone, setPhone] = React.useState();
    const [data, setData] = React.useState(false);

    const responseGoogle = (response) => {
        console.log(response.profileObj);
        setName(response.profileObj.name);
        setEmail(response.profileObj.email)
        setData(true);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
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
                            clientId="716248828673-kjpok8rlfaqv95m46vpjuk55hc6tpjso.apps.googleusercontent.com"
                            render={renderProps => (
                                <Button variant="contained" color="primary" startIcon={<GoogleIcon color="error" />} onClick={renderProps.onClick} disabled={renderProps.disabled}>register with Google</Button>
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Box>
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
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            autoComplete="phone"
                            autoFocus
                            disabled={data ? false : true}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={data ? false : true}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item sx={{ pb: 1 }}>
                                <Link href="/" variant="body2">
                                    {"Already have an account? Login"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Register
