import React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { WhatsappIcon, WhatsappShareButton, TelegramShareButton, TelegramIcon, TwitterIcon, TwitterShareButton } from 'react-share'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import { checkCookies, getCookie } from 'cookies-next';
import Jwt from 'jsonwebtoken';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { blue } from '@mui/material/colors';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Referral = ({ refer_offer, refer_user }) => {
    console.log(refer_offer)
    const ApiURL = process.env.NEXT_PUBLIC_URL;
    const [like, setLike] = React.useState(Object.keys(refer_offer).length !== 0 ? refer_offer.offer_data.likes : 0);
    const [cacheLike, setCacheLike] = React.useState(false);
    const [load, setLoad] = React.useState(false);
    const [snackStatus, setsnackStatus] = React.useState(false);
    const [snackAlert, setSnackAlert] = React.useState({});
    const [refer, setRefer] = React.useState(getCookie('refer_id'));
    const [name, setName] = React.useState(getCookie('name'));

    // handling alert code
    const handleAlertAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackStatus(false);
    };

    if (Object.keys(refer_offer).length !== 0) {

        // token auth
        const config = {
            headers: { Authorization: `Bearer ${getCookie('auth')}` }
        };

        const tokenCheck = Jwt.decode(getCookie('auth'));

        const handleLike = async () => {

            // checking token
            let token;
            try {
                token = checkCookies('auth');
                if (!token) {
                    setSnackAlert({
                        type: 'error',
                        message: "please login first"
                    })
                    setsnackStatus(true)
                    setLoad(false)
                    return
                }

            } catch (error) {
                alert()
                return
            }

            if (cacheLike) {
                setLike(like + 1);
                setSnackAlert({
                    type: 'success',
                    message: 'use MESSWALA, save your time'
                })
                setsnackStatus(true)
                return;
            }
            setLoad(true)

            //axios code
            if (!token || tokenCheck === null) {
                setSnackAlert({
                    type: 'warning',
                    message: 'Something went Wrong'
                })
                setsnackStatus(true)
                setLoad(false)
                setCacheLike(true);
                setLoad(false)
                return;
            }

            const data = await axios.put(`${ApiURL}referal/offer/likes/${refer_offer.offer_data._id}`, {}, config);

            // maximum comment limit reached
            if (data.data === "not verified" || data.data.message === "jwt malformed" || data.data === "refer offer not exists") {
                setSnackAlert({
                    type: 'warning',
                    message: 'Something went Wrong'
                })
                setsnackStatus(true)
                setLoad(false)
                setCacheLike(true);
                setLoad(false)
                return;
            }

            setLike(like + 1);
            setSnackAlert({
                type: 'success',
                message: 'use MESSWALA, save your time'
            })
            setsnackStatus(true)
            setLoad(false)
            setCacheLike(true)
        }

        const countView = async () => {

            try {
                await axios.put(`${ApiURL}referal/offer/views/${refer_offer.offer_data._id}`, {});
            } catch (error) { }

        }
    }

    React.useEffect(() => {
        if (Object.keys(refer_offer).length !== 0) {
            countView();
            return countView;
        }
    }, [])

    return (
        <>
            <Head>
                <title>Mess Wala : referral</title>
                <meta name="description" content="online mess menu viewing platform" />
                <meta name="keywords" content="messwala, cattering services, sunny mess, vitthal mess, sinhgad campus, online messwala, messwala online, messwala menus, messwala mess" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
            <Box sx={{ flexGrow: 1, mx: 2, my: 5 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={8} md={8}>

                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">No.</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">Refer Id</TableCell>
                                        <TableCell align="center">Refer Count</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        refer_user.map((data, index) => (
                                            <TableRow key={data._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">{data.name}</TableCell>
                                                <TableCell align="center">{data.refer_id}</TableCell>
                                                <TableCell align="center">{data.refer_count}</TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4}>
                        {
                            Object.keys(refer_offer).length === 0
                                ?
                                <>
                                    <Box sx={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Typography sx={{ textAlign: 'center', fontSize: '30px' }}>No Offer Available</Typography>
                                    </Box>
                                </>
                                :
                                <Card sx={{ width: '100%', px: 3, py: 3 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                                                {refer_offer.mess.thali_price}
                                            </Avatar>
                                        }
                                        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h1.fontSize', textTransform: 'capitalize' }}
                                        title={refer_offer.mess.mess_name}
                                        subheader={refer_offer.mess.mess_address}
                                    />
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={refer_offer.mess.mess_poster}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {refer_offer.offer_data.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {refer_offer.offer_data.description}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                        {
                                            load ?
                                                <CircularProgress />
                                                :
                                                <Box sx={{ display: 'flex' }}>
                                                    <Button onClick={() => handleLike()} variant="outlined">
                                                        <InsertEmoticonIcon sx={{ color: 'green' }} />
                                                        <Typography sx={{ fontWeight: 'light', fontSize: '12px', ml: 1 }}>{like}</Typography>
                                                    </Button>
                                                </Box>
                                        }
                                        <Box sx={{ display: 'flex' }}>
                                            <VisibilityIcon sx={{ color: 'red' }} />
                                            <Typography sx={{ fontWeight: 'light', fontSize: '12px', ml: 1 }}>{refer_offer.offer_data.views}</Typography>
                                        </Box>
                                        {
                                            name && refer
                                                ?
                                                <>
                                                    <TwitterShareButton url={`https://www.messwala.online/auth/register?refer_id=${refer}`} title={`Hello ${name} here join me on MESSWALA`} hashtags={['messwala', 'sunnymess', 'OnlineMenu']}>
                                                        <TwitterIcon size={20} round={true} />
                                                    </TwitterShareButton>
                                                    <TelegramShareButton url={`https://www.messwala.online/auth/register?refer_id=${refer}`} title={`Hello ${name} here join me on MESSWALA`}>
                                                        <TelegramIcon size={20} round={true} />
                                                    </TelegramShareButton>
                                                    <WhatsappShareButton url={`https://www.messwala.online/auth/register?refer_id=${refer}`} title={`Hello ${name} here join me on MESSWALA`} >
                                                        <WhatsappIcon size={20} round={true} />
                                                    </WhatsappShareButton>
                                                </>
                                                :

                                                <>
                                                    <TwitterShareButton url={`https://www.messwala.online/referal`} title={`Hello MESSWALA here, starting referring yours friends and win some free meals with others winners.`} hashtags={['messwala', 'sunnymess', 'OnlineMenu']}>
                                                        <TwitterIcon size={20} round={true} />
                                                    </TwitterShareButton>
                                                    <TelegramShareButton url={`https://www.messwala.online/referal`} title={`Hello MESSWALA here, starting referring yours friends and win some free meals with others winners.`}>
                                                        <TelegramIcon size={20} round={true} />
                                                    </TelegramShareButton>
                                                    <WhatsappShareButton url={`https://www.messwala.online/referal`} title={`Hello MESSWALA here, starting referring yours friends and win some free meals with others winners.`} >
                                                        <WhatsappIcon size={20} round={true} />
                                                    </WhatsappShareButton>
                                                </>

                                        }

                                    </CardActions>
                                </Card>

                        }

                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Referral;

export async function getServerSideProps({ req, res }) {

    let refer_offer = {};
    try {

        refer_offer = await axios.get(`${process.env.URL}referal/offer/`);

    } catch (error) {
        refer_offer.data = {};
    }

    let refer_user;
    try {
        refer_user = await axios.get(`${process.env.URL}referal/`);
    } catch (error) { }

    return {
        props: { refer_offer: refer_offer.data, refer_user: refer_user.data }
    }
}