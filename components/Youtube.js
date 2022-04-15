import React from 'react'
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Youtube = () => {
    return (
        <>
            <Typography sx={{ letterSpacing: 4, textAlign: 'center', fontWeight: 'bold', fontSize: 'h4.fontSize', textTransform: 'capitalize', color: '#1976d2', mt: 2 }} >Messwala Youtube</Typography>
            <Grid container spacing={2} sx={{ p: 2 }}>
                <Grid item xs={12} sm={4} md={4}>
                    <Box sx={{ boxShadow: 10, p: 1 }}>

                        <iframe width="100%" height="200" src="https://www.youtube.com/embed/KHg0-wCD9xM"
                            title="messwala youtube" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>{" "}
                    </Box>

                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Box sx={{ boxShadow: 3, p: 1 }}>

                        <iframe width="100%" height="200" src="https://www.youtube.com/embed/oxOyhjNXK1M"
                            title="messwala youtube" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>{" "}
                    </Box>

                </Grid>
                <Grid item xs={12} sm={4} md={4}>
                    <Box sx={{ boxShadow: 3, p: 1 }}>

                        <iframe width="100%" height="200" src="https://www.youtube.com/embed/PimCePnocYc"
                            title="messwala youtube" allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>{" "}
                    </Box>

                </Grid>
            </Grid>
        </>
    )
}

export default Youtube