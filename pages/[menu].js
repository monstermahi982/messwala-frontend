import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader } from '@mui/material';
import { red } from '@mui/material/colors';
import Image from 'next/image'
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import MessImage from '../public/mess2.jpeg'
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CommentIcon from '@mui/icons-material/Comment';
import MenuComment from '../components/MenuComment'
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CheckIcon from '@mui/icons-material/Check';
import PersonIcon from '@mui/icons-material/Person';
import Joi from 'joi'
import mongoose from 'mongoose'
import axios from 'axios'
import { URL } from '../config'
import { checkCookies, getCookie } from 'cookies-next';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const Menu = ({ messInfo }) => {
    const router = useRouter()
    const { menu } = router.query
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [commentData, setCommentData] = React.useState(messInfo.comment);
    const [snackStatus, setsnackStatus] = React.useState(false);
    const [snackAlert, setSnackAlert] = React.useState({});
    const [like, setLike] = React.useState(messInfo.like_count);
    const [dislike, setDisLike] = React.useState(messInfo.dislike_count);
    const [load, setLoad] = React.useState(false);
    const [actionLoad, setActionLoad] = React.useState(false);
    const ApiURL = process.env.NEXT_PUBLIC_URL;

    // computing power saver logic
    const [cacheAction, setCacheAction] = React.useState(false);
    const [cacheComment, setCacheComment] = React.useState(false);

    // handling alert code
    const handleAlertAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackStatus(false);
    };
    // handling dailog logic
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // token auth
    const config = {
        headers: { Authorization: `Bearer ${getCookie('auth')}` }
    };

    // handling comment logic
    const handleComment = async () => {

        setLoad(true)
        const commentError = Joi.object({
            comment: Joi.string().min(10).max(100).required()
        })

        const { error } = commentError.validate({ comment });

        if (error) {
            setSnackAlert({
                type: 'error',
                message: error.message
            })
            setsnackStatus(true)
            setLoad(false)
            return
        }

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

        if (cacheComment) {

            commentData.push({
                name: getCookie('name'),
                comment: comment
            })
            setComment('');
            setSnackAlert({
                type: 'success',
                message: 'Thank you for your Feedback'
            })
            setsnackStatus(true)
            setLoad(false)
            return;

        }

        // axios code
        const data = await axios.post(`${ApiURL}comment`, { "mess_id": messInfo._id, comment }, config);

        // maximum comment limit reached
        if (data.data === "limit reached") {
            setComment('');
            setSnackAlert({
                type: 'warning',
                message: 'Maximum Limit Reached'
            })
            setsnackStatus(true)
            setLoad(false)
            setCacheComment(true);
            setComment('');
            return;
        }

        commentData.push({
            name: getCookie('name'),
            comment: comment
        })
        setComment('');
        setSnackAlert({
            type: 'success',
            message: 'Thank you for your Feedback'
        })
        setsnackStatus(true)
        setLoad(false)
        setCacheComment(true);

    }


    // handling like code
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

        if (cacheAction) {
            setLike(like + 1);
            setSnackAlert({
                type: 'success',
                message: 'We are happy that you like our food'
            })
            setsnackStatus(true)
            return;
        }
        setActionLoad(true)

        //axios code
        if (!token) {
            return;
        }
        const data = await axios.post(`${ApiURL}action/like`, { "mess_id": messInfo._id }, config);

        setLike(like + 1);
        setSnackAlert({
            type: 'success',
            message: 'We are happy that you like our food'
        })
        setsnackStatus(true)
        setActionLoad(false)
        setCacheAction(true)
    }

    // handling dislike code
    const handleDislike = async () => {

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

        if (cacheAction) {
            setDisLike(dislike + 1);
            setSnackAlert({
                type: 'error',
                message: 'We will try to make it more delicious'
            })
            setsnackStatus(true)
            return;
        }
        setActionLoad(true)

        //axios code
        if (!token) {
            return;
        }
        const data = await axios.post(`${ApiURL}action/dislike`, { "mess_id": messInfo._id }, config);

        setDisLike(dislike + 1);
        setSnackAlert({
            type: 'error',
            message: 'We will try to me it more delicious'
        })
        setsnackStatus(true)
        setActionLoad(false)
        setCacheAction(true)
    }



    return (
        <>
            <Head>
                <title>Mess Wala : {messInfo.mess_name}</title>
                <meta name="description" content="online mess menu viewing platform" />
                <meta name="keywords" content="messwala, cattering services, sunny mess, vitthal mess, sinhgad campus, online messwala, messwala online, messwala menus, messwala mess" />
                <meta name="robots" content="index, follow" />
                <meta name="language" content="English" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                {/* display alert code */}
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

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={8}>
                        <Image
                            alt="Picture of the author"
                            width="1000"
                            height={600}
                            src={messInfo.menu_image} sx={{ p: 2 }}
                            onClick={handleClickOpen}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>

                        <Card sx={{ p: 3 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {messInfo.thali_price}
                                    </Avatar>
                                }
                                sx={{ textAlign: 'center', textTransform: 'capitalize' }}
                                title={messInfo.mess_name}
                                subheader={messInfo.mess_address}
                            />
                            <CardContent>
                                <List>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <PersonIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={messInfo.owner_info.owner_name.toUpperCase()}
                                                    secondary="Owner Name"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <LocalPhoneIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={messInfo.owner_info.owner_phone}
                                                    secondary="Phone Number"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {messInfo.non_veg ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Non Veg"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    {messInfo.parcel_service ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Parcel"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <ListItemButton>
                                                <ListItemText
                                                    primary={messInfo.lunch_time}
                                                    secondary="Lunch Time"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <ListItemButton>
                                                <ListItemText
                                                    primary={messInfo.dinner_time}
                                                    secondary="Dinner Time"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                    </Grid>
                                </List>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                {
                                    actionLoad ?
                                        <Box sx={{ width: '100%' }}>
                                            <LinearProgress />
                                        </Box>
                                        :
                                        <>
                                            <IconButton aria-label="share" onClick={handleLike}>
                                                <MoodIcon sx={{ color: 'green' }} />
                                                <Typography sx={{ fontWeight: 'light', mx: 1 }}>{like}</Typography>
                                            </IconButton>
                                            <IconButton aria-label="add to favorites" onClick={handleDislike}>
                                                <MoodBadIcon sx={{ color: 'red' }} />
                                                <Typography sx={{ fontWeight: 'light', mx: 1 }}>{dislike}</Typography>
                                            </IconButton>
                                        </>
                                }

                            </CardActions>

                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 2 }}>
                                <TextField
                                    id="input-with-icon-textfield"
                                    label="Comments"
                                    value={comment}
                                    multiline

                                    onChange={(e) => setComment(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CommentIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                />
                                {
                                    load ?
                                        <CircularProgress />
                                        :
                                        <Button variant="contained" size="small" onClick={handleComment}>add</Button>
                                }

                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </ExpandMore>
                            </Box>

                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>

                                    {
                                        commentData.length === 0 ?
                                            <h3>No Comments...</h3>
                                            :
                                            commentData.map((value, index) => (
                                                <>
                                                    <MenuComment data={value} key={value._id} />
                                                </>
                                            ))
                                    }


                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>
                </Grid>

                <Dialog
                    fullScreen
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Transition}
                >
                    <Box sx={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}>
                        <IconButton
                            onClick={handleClose}
                            aria-label="close"
                            size="large"
                            variant="outlined"
                            color="primary"

                        >
                            <CloseIcon sx={{ fontSize: 40 }} />
                        </IconButton>

                    </Box>
                    <Image
                        src={messInfo.menu_image}
                        sx={{ p: 5 }}
                        alt="Picture of the author"
                        layout='fill'
                        onClick={handleClickOpen}
                    />

                </Dialog>
            </Box>
        </>
    )
}

export default Menu;


export async function getServerSideProps({ req, res, query }) {

    // header file
    const config = {
        headers: { Authorization: `Bearer ${getCookie('auth', { req, res })}` }
    };

    const token = checkCookies('auth', { req, res });
    if (!token) {
        return {
            redirect: {
                destination: '/auth/register',
                permanent: false,
            },
        }
    }

    const data = await axios.get(`${URL}mess/${query.menu}`, config);

    // checking token verfication
    if (data.data === "token not found" || data.data === "not verified" || data.data === "mess not found") {
        return {
            redirect: {
                destination: '/invalid-mess',
                permanent: false,
            },
        }
    }

    return {
        props: { messInfo: data.data },
    }
}