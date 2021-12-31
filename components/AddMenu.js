import React from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Image from 'next/image'
import menuItem from '../Controllers/menuItem'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const theme = createTheme();
const Input = styled('input')({
    display: 'none',
});

const AddMenu = () => {

    const [data, setData] = React.useState(false);
    const [image, setImage] = React.useState('');
    const [item, setItem] = React.useState([])
    const [alert, setAlert] = React.useState(true)
    const [alertMess, setAlertMess] = React.useState({})
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
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
        setImage(URL.createObjectURL(event.target.files[0]));
        setAlertMess({ "message": "Image Uploaded", "status": "success" })
        setAlert(true);
    }

    React.useEffect(() => {
        if (image !== '' && item.length !== 0) {
            setData(true)
        } else {
            setData(false)
        }
    }, [image, item])


    const submitMenu = async () => {
        const formData = new FormData();
        formData.append('image', image)
        formData.append('items', item)
        console.log(formData);
        setAlertMess({ "message": "Menu Uploaded", "status": "success" })
        setAlert(true);
    }


    return (
        <ThemeProvider theme={theme}>
            <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertMess.status} sx={{ width: '100%' }}>
                    {alertMess.message}
                </Alert>
            </Snackbar>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Upload Todays Menu
                    </Typography>

                    <Box component="form" noValidate sx={{ mt: 1, }}>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ display: 'flex', justifyContent: 'space-evenly', my: 3 }}>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                <Button variant="contained" component="span">
                                    Upload
                                </Button>
                            </label>
                            <label htmlFor="icon-button-file">
                                <Input accept="image/*" id="icon-button-file" type="file" onChange={(e) => uploadImage(e)} />
                                <IconButton color="primary" aria-label="upload picture" component="span">
                                    <PhotoCamera />
                                </IconButton>
                            </label>
                        </Stack>
                        {/* handling image` */}
                        {
                            image ?
                                <Box sx={{ my: 2 }}>
                                    <Image
                                        src={image}
                                        alt="Picture of the author"
                                        width="1000"
                                        height={500}
                                        sx={{ m: 2 }}
                                    />
                                </Box>
                                : ""
                        }

                        {/* menu titles code */}
                        <Autocomplete
                            multiple
                            id="checkboxes-tags-demo"
                            options={menuItem}
                            disableCloseOnSelect
                            getOptionLabel={(option) => option.name}
                            renderOption={(props, option, { selected }) => (
                                <li {...props}>
                                    <Checkbox
                                        icon={icon}
                                        checkedIcon={checkedIcon}
                                        style={{ marginRight: 8 }}
                                        checked={selected}
                                    />
                                    {option.name}
                                </li>
                            )}

                            onChange={(event, value) => setItem(value)}

                            fullWidth
                            sx={{ width: '100%' }}
                            renderInput={(params) => (
                                <TextField {...params} label="Checkboxes" placeholder="Favorites" />
                            )}
                        />

                        {/* submit button */}
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ my: 3 }}
                            disabled={data ? false : true}
                            onClick={submitMenu}
                        >
                            Update Menu
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default AddMenu
