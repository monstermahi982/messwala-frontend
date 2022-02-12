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
import { WhatsappIcon, WhatsappShareButton, TelegramShareButton, TelegramIcon, TwitterIcon, TwitterShareButton } from 'react-share'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Box from '@mui/material/Box';
import MessIcon from '../public/sunny.jpeg'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const ItemCard = ({ data }) => {

    const [snackStatus, setsnackStatus] = React.useState(false);
    const [snackAlert, setSnackAlert] = React.useState({});

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
            <Badge badgeContent={data.views} color="primary">

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

                <Card sx={{ Width: '100%' }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: blue[700] }} aria-label="recipe">
                                {data.thali_price}
                            </Avatar>
                        }
                        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h1.fontSize', textTransform: 'capitalize' }}
                        title={data.mess_name}
                        subheader={data.mess_address.slice(0, 30) + '...'}
                    />
                    <CardMedia
                        component="img"
                        height="80"
                        image={MessIcon.src}
                        alt="Paella dish"
                    />
                    <CardContent>
                        <Stack direction="row" sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }} spacing={1}>
                            {
                                data.menu_list.length === 0 ?
                                    <>
                                        <Typography sx={{ textAlign: 'center', fontWeight: 'light', fontSize: '15px', mx: 1, letterSpacing: '2px' }}>no item available</Typography>
                                    </>
                                    :
                                    data.menu_list.map((value, index) => (
                                        <Box key={index}>
                                            <Chip label={value.dish_name} variant="outlined" size="small" sx={{ my: 1 }} />
                                        </Box>

                                    ))
                            }
                        </Stack>
                    </CardContent>
                    <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Box sx={{ display: 'flex' }}>
                            <InsertEmoticonIcon sx={{ color: 'green' }} />
                            <Typography sx={{ fontWeight: 'light', fontSize: '15px', mx: 1 }}>{data.like_count}</Typography>
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
                            <Link href={`/${data._id}`} passHref><MenuBookIcon sx={{ color: 'blue', fontSize: '30px' }} /></Link>
                        </IconButton>
                    </CardActions>
                </Card>
            </Badge>
        </>
    )
}

export default ItemCard
