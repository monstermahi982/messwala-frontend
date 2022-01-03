import React from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const ErrorPage = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '68vh' }}>
                <Typography sx={{ fontSize: '40px', letterSpacing: '3px', fontWeight: '800' }}>Page Not found</Typography>
            </Box>
        </>
    )
}

export default ErrorPage;
