import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import YouTubeIcon from '@mui/icons-material/YouTube';

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
                                <a href={"https://www.instagram.com/messwala.online/"} target={"_blank"}><IconButton><InstagramIcon sx={{ color: red[50] }} /></IconButton></a>
                                <a href={"https://www.youtube.com/channel/UC4F42ykasamJNXa8qrwrW9w"} target={"_blank"}><IconButton><YouTubeIcon sx={{ color: red[50] }} /></IconButton></a>
                                <a href={"https://twitter.com/maheshg78239999"} target={"_blank"}><IconButton><TwitterIcon sx={{ color: red[50] }} /></IconButton></a>
                                <a href={"https://chat.whatsapp.com/EE7diVgkNf9GJ5RHzb0yQq"} target={"_blank"}><IconButton><WhatsAppIcon sx={{ color: red[50] }} /></IconButton></a>
                                <a href={"https://www.linkedin.com/company/messwala"} target={"_blank"}><IconButton><LinkedInIcon sx={{ color: red[50] }} /></IconButton></a>
                                <a href={"https://t.me/messwala"} target={"_blank"}><IconButton><TelegramIcon sx={{ color: red[50] }} /></IconButton></a>
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
