import React from 'react'
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CountUp from 'react-countup';
import Stack from '@mui/material/Stack';

const Count = () => {
    return (
        <>
            <Stack direction="row"
                sx={{ justifyContent: 'space-evenly', my: 1 }}
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}>
                <Paper elevation={0} sx={{ p: 2, borderRadius: '25%' }}>
                    <GroupAddIcon color="primary" fontSize="small" />
                    <Typography sx={{ fontSize: '25px' }}>
                        <CountUp duration={10} end={1540} />
                    </Typography>
                    <Typography>Total Users</Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 2, borderRadius: '25%' }}>
                    <MenuBookIcon color="primary" fontSize="small" />
                    <Typography sx={{ fontSize: '25px' }}>
                        <CountUp duration={5} end={17} />
                    </Typography>
                    <Typography>Total Messes</Typography>
                </Paper>
                <Paper elevation={0} sx={{ p: 2, borderRadius: '25%' }}>
                    <VisibilityIcon color="primary" fontSize="small" />
                    <Typography sx={{ fontSize: '25px' }}>
                        <CountUp duration={10} end={3450} />
                    </Typography>
                    <Typography>Daily Views</Typography>
                </Paper>
            </Stack>
        </>
    )
}

export default Count
