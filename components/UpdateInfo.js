import React from 'react'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateInfo = ({ data }) => {
    const URL = process.env.NEXT_PUBLIC_URL;
    const [lunch, setLunch] = React.useState("12:30");
    const [dinner, setDinner] = React.useState("19:30");
    const [name, setName] = React.useState(data.mess_name);
    const [address, setAddress] = React.useState(data.mess_address);
    const [price, setPrice] = React.useState(data.thali_price);
    const [nonveg, setNonveg] = React.useState(data.non_veg);
    const [parcel, setParcel] = React.useState(data.parcel_service);

    const updateMess = async () => {

        const mess = {
            mess_name: name,
            mess_address: address,
            thali_price: price,
            non_veg: nonveg,
            parcel_service: parcel,
            lunch_time: lunch,
            dinner_time: dinner
        }
        const updateData = await axios.put(`${URL}mess/info/${data._id}`, mess);
        if (updateData.data === "info updated") {
            setAlertMessage({ message: updateData.data, status: "success" });
            setAlert(true);
        }
    }

    const [alert, setAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState({});

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setAlert(false);
    };

    return (
        <>
            <Box sx={{ py: 1, px: 4 }}>
                <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={alertMessage.status} sx={{ width: '100%' }}>
                        {alertMessage.message}
                    </Alert>
                </Snackbar>
                <Typography sx={{ textAlign: 'center', fontSize: '30px', letterSpacing: '3px', py: 2 }}>Update Informations</Typography>
                <TextField sx={{ my: 1 }} id="name" value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Mess Name" variant="outlined" />
                <TextField sx={{ my: 1 }} id="address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth label="Mess Address" variant="outlined" />
                <TextField sx={{ my: 1 }} id="phone" value={price} onChange={(e) => setPrice(e.target.value)} type="number" fullWidth label="Thali Price" variant="outlined" />
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 1 }}>
                    <FormControlLabel control={<Switch checked={nonveg} onChange={(e) => setNonveg(e.target.checked)} />} label="Non Veg" />
                    <FormControlLabel control={<Switch checked={parcel} onChange={(e) => setParcel(e.target.checked)} />} label="Parcel" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 1 }}>
                    <TextField type="time" sx={{ my: 1 }} id="lunchTime" value={lunch} onChange={(e) => setLunch(e.target.value)} fullWidth label="Lunch Time" variant="outlined" />
                    <TextField type="time" sx={{ my: 1 }} id="dinnerTime" value={dinner} onChange={(e) => setDinner(e.target.value)} fullWidth label="Dinner Time" variant="outlined" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 3 }}>
                    <Button variant="contained" onClick={updateMess}>Update</Button>
                </Box>

            </Box>
        </>
    )
}

export default UpdateInfo
