import React from 'react'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, CardHeader, IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import posterImageAs from '../public/menuImage.jpeg'
import { getCookie } from 'cookies-next'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const Input = styled('input')({
    display: 'none',
});
const UpdatePoster = ({ data }) => {
    const ApiURL = process.env.NEXT_PUBLIC_URL;
    const [poster, setPoster] = React.useState(data.mess_poster)
    const [posterImage, setPosterImage] = React.useState('');
    const [alert, setAlert] = React.useState(true)
    const [alertMess, setAlertMess] = React.useState({})
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };

    // header file
    const config = {
        headers: { Authorization: `Bearer ${getCookie('auth')}` }
    };

    const uploadImage = (event) => {
        if (event.target.files[0] === undefined) {
            setAlertMess({ "message": "image not found", "status": "error" })
            setAlert(true);
            return;
        }
        if (event.target.files[0].size > 10000000) {
            setAlertMess({ "message": "image size limit exceed", "status": "error" })
            setAlert(true);
            return;
        }
        setPosterImage(event.target.files[0]);
        setPoster(URL.createObjectURL(event.target.files[0]));
        setAlertMess({ "message": "Poster Uploaded", "status": "success" })
        setAlert(true);
    }

    const updatePoster = async () => {
        const formData = new FormData();
        formData.append('image', posterImage)
        formData.append('id', data._id);

        const posterUpdate = await axios.put(`${ApiURL}mess/poster/61f976e2ed3de32c038ea1eb`, formData, config);

        // checking token verfication
        if (posterUpdate.data === "token not found" || posterUpdate.data === "not verified") {
            setAlertMess({ "message": "Something went wrong", "status": "error" })
            setAlert(true);
            return;
        }

        setAlertMess({ "message": "Menu Uploaded", "status": "success" })
        setAlert(true);
    }

    return (
        <>
            < Box sx={{ py: 1, px: 4 }}>
                <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertMess.status} sx={{ width: '100%' }}>
                        {alertMess.message}
                    </Alert>
                </Snackbar>
                <Typography sx={{ textAlign: 'center', fontSize: '30px', letterSpacing: '3px', py: 2 }}>Update Poster</Typography>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ display: 'flex', justifyContent: 'space-evenly', my: 3 }}>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" multiple type="file" />
                        <Button variant="contained" color="secondary" component="span">
                            Upload
                        </Button>
                    </label>
                    <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => uploadImage(e)} />
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera color="secondary" />
                        </IconButton>
                    </label>
                </Stack>
                <Image
                    src={poster}
                    alt="Picture of the author"
                    width="1000"
                    height={500}
                    sx={{ p: 2, height: '10px' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 3 }}>
                    <Button variant="contained" onClick={updatePoster}>Update</Button>
                </Box>
            </Box>
        </>
    )
}

export default UpdatePoster
