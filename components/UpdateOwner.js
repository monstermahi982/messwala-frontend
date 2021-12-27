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
import { Grid } from '@mui/material';


const UpdateOwner = () => {

    return (
        <>
            <Box sx={{ py: 1, px: 4 }}>
                <Typography sx={{ textAlign: 'center', fontSize: '30px', letterSpacing: '3px', py: 2 }}>Update Personal Information</Typography>
                <Grid container >
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField sx={{ p: 1 }} id="name" fullWidth label="Name" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField sx={{ p: 1 }} id="phone" type="number" fullWidth label="Phone" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}></Grid>
                </Grid>





                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 3 }}>
                    <Button variant="contained">Update</Button>
                </Box>

            </Box>
        </>
    )
}

export default UpdateOwner
