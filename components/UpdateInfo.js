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


const UpdateInfo = () => {
    const [startLunch, setStartLunch] = React.useState(12)
    const [endLunch, setEndLunch] = React.useState(3)
    const [startDinner, setStartDinner] = React.useState(7)
    const [endDinner, setEndDinner] = React.useState(10)
    return (
        <>
            <Box sx={{ py: 1, px: 4 }}>
                <Typography sx={{ textAlign: 'center', fontSize: '30px', letterSpacing: '3px', py: 2 }}>Update Informations</Typography>
                <TextField sx={{ my: 1 }} id="name" fullWidth label="Mess Name" variant="outlined" />
                <TextField sx={{ my: 1 }} id="address" fullWidth label="Mess Address" variant="outlined" />
                <TextField sx={{ my: 1 }} id="phone" type="number" fullWidth label="Thali Price" variant="outlined" />
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 1 }}>
                    <FormControlLabel control={<Switch defaultChecked />} label="Non Veg" />
                    <FormControlLabel control={<Switch />} label="Parcel" />
                </Box>
                <InputLabel id="demo-simple-select-label">Lunch Time</InputLabel>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 1 }}>

                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label">Start</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={startLunch}
                            label="Age"
                            onChange={(e) => setStartLunch(e.target.value)}
                        >
                            <MenuItem value={10}>11</MenuItem>
                            <MenuItem value={20}>12</MenuItem>
                            <MenuItem value={30}>13</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label">End</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={endLunch}
                            label="Age"
                            onChange={(e) => setEndLunch(e.target.value)}
                        >
                            <MenuItem value={10}>2</MenuItem>
                            <MenuItem value={20}>3</MenuItem>
                            <MenuItem value={30}>4</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <InputLabel id="demo-simple-select-label">Dinner Time</InputLabel>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 1 }}>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label">Start</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={startDinner}
                            label="Age"
                            onChange={(e) => setStartDinner(e.target.value)}
                        >
                            <MenuItem value={10}>{startDinner}</MenuItem>
                            <MenuItem value={20}>7</MenuItem>
                            <MenuItem value={30}>8</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ width: '50%' }}>
                        <InputLabel id="demo-simple-select-label">End</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={endDinner}
                            label="Age"
                            onChange={(e) => setEndDinner(e.target.value)}
                        >
                            <MenuItem value={10}>9</MenuItem>
                            <MenuItem value={20}>10</MenuItem>
                            <MenuItem value={30}>11</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: 3 }}>
                    <Button variant="contained">Update</Button>
                </Box>

            </Box>
        </>
    )
}

export default UpdateInfo
