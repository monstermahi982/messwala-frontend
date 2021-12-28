import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';

function Copyright() {
    return (
        <Typography sx={{ color: red[0], pt: 3 }} align="center" variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link href="#" sx={{ color: red[100] }}>
                messwala
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    return (
        <>
            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 0,
                    mt: 'auto',
                    bgcolor: 'primary.main',
                    color: 'white'
                }}
            >
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{ fontSize: '20px', letterSpacing: '2px', fontWeight: '800' }}>Mess Wala</Typography>
                            <Typography sx={{ fontSize: '10px', letterSpacing: '2px' }}>All Menus in 1 App</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{ fontSize: '20px', letterSpacing: '2px' }}>Office Location</Typography>
                            <Typography sx={{ fontSize: '10px', letterSpacing: '2px' }}>Ambegoan Budruk, Pune</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Stack direction="row" spacing={2}>
                                <IconButton><InstagramIcon sx={{ color: red[50] }} /></IconButton>
                                <IconButton><FacebookIcon sx={{ color: red[50] }} /></IconButton>
                                <IconButton><TwitterIcon sx={{ color: red[50] }} /></IconButton>
                                <IconButton><WhatsAppIcon sx={{ color: red[50] }} /></IconButton>
                                <IconButton><LinkedInIcon sx={{ color: red[50] }} /></IconButton>
                                <IconButton><TelegramIcon sx={{ color: red[50] }} /></IconButton>
                            </Stack>
                        </Grid>
                    </Grid>
                    <Copyright />
                </Container>
            </Box>
        </>
    )
}

export default Footer
