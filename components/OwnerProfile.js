import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader, IconButton, Stack } from '@mui/material';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import UpdatePoster from './UpdatePoster';
import UpdateInfo from './UpdateInfo';
import UpdateOwner from './UpdateOwner'

const OwnerProfile = ({ data }) => {

    const [updateStatus, setUpdateStatus] = React.useState('')
    const [deleteConfirm, setDeleteConfirm] = React.useState(false);

    const handleClose = () => {
        setDeleteConfirm(false);
    };

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Card sx={{ width: '100%' }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                        {data.thali_price}
                                    </Avatar>
                                }
                                sx={{ textAlign: 'center' }}
                                title={data.mess_name}
                                subheader={data.mess_address}
                            />
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://source.unsplash.com/1600x900/?nature,water"
                                alt="green iguana"
                            />
                            <CardContent>
                                <List sx={{ px: 3 }}>
                                    <Grid container>
                                        <Grid item xs={6}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary="Name" secondary={data.owner_name} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary="Phone" secondary={data.owner_phone} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary="Non Veg" secondary={data.non_veg ? "Yes" : "No"} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary="Parcel" secondary={data.parcel_service ? "Yes" : "No"} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary="Lunch Time" secondary={data.lunch_time} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItem disablePadding>
                                                <ListItemButton>
                                                    <ListItemText primary="Dinner Time" secondary={data.dinner_time} />
                                                </ListItemButton>
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                </List>
                            </CardContent>
                            <CardActions sx={{ display: 'flex', justifyContent: 'space-evenly', px: 3 }}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <IconButton aria-label="poster" size="small" onClick={() => setUpdateStatus('poster')}>
                                            <EditIcon color="primary" /> <Typography sx={{ pl: 1, fontSize: '15px' }}> Poster</Typography>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IconButton aria-label="info" onClick={() => setUpdateStatus('info')}>
                                            <EditIcon color="primary" /> <Typography sx={{ pl: 1, fontSize: '15px' }}> Info</Typography>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IconButton aria-label="info" onClick={() => setUpdateStatus('owner')}>
                                            <EditIcon color="primary" /> <Typography sx={{ pl: 1, fontSize: '15px' }}> Personal</Typography>
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <IconButton aria-label="delete" onClick={() => setDeleteConfirm(true)}>
                                            <DeleteIcon color="error" /><Typography sx={{ pl: 1, fontSize: '15px' }}> Account</Typography>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>

                        {
                            updateStatus === 'info' && <UpdateInfo data={data} />

                        }

                        {
                            updateStatus === 'poster' && <UpdatePoster data={data} />
                        }

                        {
                            updateStatus === 'owner' && <UpdateOwner data={data} />
                        }

                    </Grid>

                </Grid>
            </Box>

            <Dialog open={deleteConfirm} onClose={handleClose}>
                <DialogTitle>Account Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You will not able to get your account back
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Phone Number"
                        type="number"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose} variant="outlined" color="error">Delete</Button>
                </DialogActions>
            </Dialog>

        </>
    )
}

export default OwnerProfile
