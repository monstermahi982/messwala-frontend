import React from 'react'
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
import MessImage from '../public/menuImage.jpeg'
import Collapse from '@mui/material/Collapse';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import CommentIcon from '@mui/icons-material/Comment';
import commentData from '../Controllers/commentData'
import MenuComment from '../components/MenuComment'
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import Badge from '@mui/material/Badge';
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

const Menu = () => {


    const router = useRouter()
    const { menu } = router.query
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [snackStatus, setsnackStatus] = React.useState(false);
    const [snackAlert, setSnackAlert] = React.useState({});
    const [like, setLike] = React.useState(14);
    const [dislike, setDisLike] = React.useState(6);
    const [load, setLoad] = React.useState(false);
    const [actionLoad, setActionLoad] = React.useState(false);

    // handling comment logic
    const handleComment = () => {

        setLoad(true)
        if (comment.length < 10) {
            setSnackAlert({
                type: 'error',
                message: 'Please more response'
            })
            setsnackStatus(true)
            setLoad(false)
            return
        }
        commentData.push({
            name: 'bot comment',
            comment: comment
        })
        setComment('');
        setSnackAlert({
            type: 'success',
            message: 'Thank you for your Feedback'
        })
        setsnackStatus(true)
        setLoad(false)
    }

    // handling alert code
    const handleAlertAlertClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackStatus(false);
    };

    // handling like code
    const handleLike = () => {
        setActionLoad(true)
        setLike(like + 1);
        setSnackAlert({
            type: 'success',
            message: 'We are happy that you like our food'
        })
        setsnackStatus(true)
        setActionLoad(false)

    }

    // handling dislike code
    const handleDislike = () => {
        setActionLoad(true)
        setDisLike(dislike + 1);
        setSnackAlert({
            type: 'error',
            message: 'We will try to me it more delicious'
        })
        setsnackStatus(true)
        setActionLoad(false)
    }

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


    return (
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
                        height={500}
                        src={MessImage.src} sx={{ p: 2 }}
                        onClick={handleClickOpen}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Badge badgeContent={4} color="primary" anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                        <Card sx={{ p: 3 }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        60
                                    </Avatar>
                                }
                                sx={{ textAlign: 'center' }}
                                title="Sunny Mess"
                                subheader="lorefidjf sdf sdfhnauicvf"
                            />
                            <CardContent>
                                <List>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <LocalPhoneIcon color="primary" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Phone no."
                                                    secondary="1231231234"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <CloseIcon color="error" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Non Veg"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <ListItemButton>
                                                <ListItemIcon>
                                                    <CheckIcon color="success" />
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary="Parcel"
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <ListItemButton>
                                                <ListItemText
                                                    primary="Lunch Time"
                                                    secondary='12pm to 3pm'
                                                />
                                            </ListItemButton>
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6}>
                                            <ListItemButton>
                                                <ListItemText
                                                    primary="Dinner Time"
                                                    secondary='7pm to 10pm'
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
                                        commentData.map((value, index) => (
                                            <>
                                                <MenuComment data={value} key={index} />
                                            </>
                                        ))
                                    }


                                </CardContent>
                            </Collapse>
                        </Card>
                    </Badge>
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
                    src={MessImage.src}
                    sx={{ p: 5 }}
                    alt="Picture of the author"
                    width="100%"
                    height={500}
                    onClick={handleClickOpen}
                />

            </Dialog>
        </Box>
    )
}

export default Menu;
