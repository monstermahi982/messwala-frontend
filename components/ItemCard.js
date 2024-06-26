import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { blue } from '@mui/material/colors';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Link from 'next/link'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { WhatsappIcon, WhatsappShareButton, TelegramShareButton, TelegramIcon, TwitterIcon, TwitterShareButton } from 'react-share'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { checkCookies, getCookie, removeCookies } from 'cookies-next';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ItemCard = ({ data }) => {
    const router = useRouter();
    const [snackStatus, setsnackStatus] = React.useState(false);
    const [snackAlert, setSnackAlert] = React.useState({});

    // handling alert code
    const handleAlertAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackStatus(false);
    };

    // redirect user to mess page if token is present 
    const showMenu = (id) => {
        // const token = checkCookies('auth');
        // if (!token) {
        //     setSnackAlert({ message: "please login first", type: "warning" });
        //     setsnackStatus(true);
        //     return;
        // }
        router.push(`/${id}`);
    }

    return (
        <>
            <Snackbar
                open={snackStatus}
                autoHideDuration={6000}
                onClose={handleAlertAlertClose}
                message="Note archived"
            >
                <Alert onClose={handleAlertAlertClose} severity={snackAlert.type} sx={{ width: '100%' }}>
                    {snackAlert.message}
                </Alert>
            </Snackbar>
            <Card sx={{ Width: '100%', boxShadow: 10 }}>
                <CardHeader
                    avatar={
                        <Avatar sx={{ bgcolor: blue[700] }} aria-label="recipe">
                            {data.thali_price}
                        </Avatar>
                    }
                    sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h1.fontSize', textTransform: 'capitalize' }}
                    title={data.mess_name}
                    subheader={data.mess_address.slice(0, 25) + '...'}
                />
                <CardMedia
                    component="img"
                    height="80"
                    image={data.mess_poster}
                    alt={data.mess_name}
                    sx={{ width: '100%', height: '120px' }}
                />
                <CardContent>
                    <Stack direction="row" sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} spacing={1}>
                        {
                            data.menu_list.length === 0 ?
                                <>
                                    <Typography sx={{ textAlign: 'center', fontWeight: 'light', fontSize: '15px', mx: 1, letterSpacing: '2px' }}>No item mentioned</Typography>
                                </>
                                :
                                data.menu_list.map((value, index) => (
                                    <Box key={index}>
                                        <Chip label={value.dish_name} variant="outlined" size="small" sx={{ my: 1, backgroundColor: '#1976d2', color: '#fff', boxShadow: 5, border: 0 }} />
                                    </Box>

                                ))
                        }
                        <Chip onClick={() => showMenu(data.slug)} label="more" variant="outlined" size="small" sx={{ my: 1, backgroundColor: '#1976d2', color: '#fff', boxShadow: 5, border: 0 }} />
                    </Stack>
                </CardContent>
                <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-evenly', borderTop: 1, borderColor: '#1976d2' }}>
                    <Box sx={{ display: 'flex' }}>
                        <VisibilityIcon color="primary" />
                        <Typography sx={{ fontWeight: 'light', fontSize: '12px', ml: 1 }}>{data.views}</Typography>
                    </Box>
                    <Link href={`https://www.google.com/maps/dir/?api=1&destination=${data.google_location}`} passHref><a target={"_blank"}>
                        <IconButton color="error">
                            <LocationOnIcon />
                        </IconButton>
                    </a></Link>
                    <TelegramShareButton url={`https://www.messwala.online/${data.slug}`} title={`Todays ${data.mess_name} menu ${data.menu_list.length && data.menu_list.map((value, index) => (value.dish_name + ", "))} and more..., checkout full menu on MESSWALA App`}>
                        <TelegramIcon size={20} round={true} />
                    </TelegramShareButton>
                    <WhatsappShareButton url={`https://www.messwala.online/${data.slug}`} title={`Todays ${data.mess_name} menu ${data.menu_list.length && data.menu_list.map((value, index) => (value.dish_name + ", "))} and more..., checkout full menu on MESSWALA App`} >
                        <WhatsappIcon size={20} round={true} />
                    </WhatsappShareButton>
                    <Button variant="contained" aria-label="like" onClick={() => showMenu(data.slug)}>
                        <MenuBookIcon sx={{ color: '#fff', fontSize: '18px' }} />
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ItemCard
