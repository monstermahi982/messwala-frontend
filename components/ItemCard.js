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
import Badge from '@mui/material/Badge';
import { Typography } from '@mui/material';
import Link from 'next/link'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { WhatsappIcon, WhatsappShareButton, TelegramShareButton, TelegramIcon, TwitterIcon, TwitterShareButton } from 'react-share'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Box from '@mui/material/Box';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ItemCard = ({ data }) => {

    const [snackStatus, setsnackStatus] = React.useState(false);
    const [snackAlert, setSnackAlert] = React.useState({});
    const [load, setLoad] = React.useState(false);

    // handling alert code
    const handleAlertAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackStatus(false);
    };

    const handleLoad = () => {
        setLoad(false)
    }

    return (
        <>
            <Badge badgeContent={4} color="primary">

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
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={load}
                    onClick={handleLoad}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>

                <Card sx={{ Width: '100%' }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: blue[700] }} aria-label="recipe">
                                {data.price}
                            </Avatar>
                        }
                        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h1.fontSize', textTransform: 'capitalize' }}
                        title={data.name}
                        subheader={data.address.slice(0, 30) + '...'}
                    />
                    <CardMedia
                        component="img"
                        height="80"
                        image="https://source.unsplash.com/1600x900/?nature,water"
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Stack direction="row" sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} spacing={1}>
                            <Chip label="Chapati" variant="outlined" size="small" sx={{ my: 1 }} />
                            <Chip label="Rice" variant="outlined" size="small" sx={{ my: 1 }} />
                            <Chip label="Dal" variant="outlined" size="small" sx={{ my: 1 }} />
                            <Chip label="Palak" variant="outlined" size="small" sx={{ my: 1 }} />
                            <Chip label="Sabzi" variant="outlined" size="small" sx={{ my: 1 }} />
                            <Chip label="crud milk" variant="outlined" size="small" sx={{ my: 1 }} />
                            <Chip label="Soyabean" variant="outlined" size="small" sx={{ my: 1 }} />
                            <Chip label="Alo Sabzi" variant="outlined" size="small" sx={{ my: 1 }} />
                        </Stack>
                    </CardContent>
                    <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Box sx={{ display: 'flex' }}>
                            <InsertEmoticonIcon sx={{ color: 'green' }} />
                            <Typography sx={{ fontWeight: 'light', fontSize: '15px', mx: 1 }}>23</Typography>
                        </Box>
                        <TwitterShareButton url={"https://messwala.com/sunnymess"} title={"Checkout latest menu of Sunny Mess"} hashtags={['messwala, sunnymess']}>
                            <TwitterIcon size={20} round={true} />
                        </TwitterShareButton>
                        <TelegramShareButton url={"https://messwala.com/sunnymess"} title={"Checkout latest menu of Sunny Mess"}>
                            <TelegramIcon size={20} round={true} />
                        </TelegramShareButton>
                        <WhatsappShareButton url={"https://messwala.com/sunnymess"} title={"Checkout latest menu of Sunny Mess"} >
                            <WhatsappIcon size={20} round={true} />
                        </WhatsappShareButton>
                        <IconButton aria-label="like" onClick={handleLoad}>
                            <Link href={`/${data.id}`} passHref><MenuBookIcon sx={{ color: 'blue', fontSize: '30px' }} /></Link>
                        </IconButton>
                    </CardActions>
                </Card>
            </Badge>
        </>
    )
}

export default ItemCard
