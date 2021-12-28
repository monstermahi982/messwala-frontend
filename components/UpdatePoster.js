import React from 'react'
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { Avatar, CardHeader, IconButton, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



const Input = styled('input')({
    display: 'none',
});
const UpdatePoster = () => {
    const [poster, setPoster] = React.useState("https://source.unsplash.com/1600x900/?food,maggi")
    const uploadImage = (event) => {
        console.log(event.target.files[0]);
        setPoster(URL.createObjectURL(event.target.files[0]));
    }
    return (
        <>
            < Box sx={{ py: 1, px: 4 }}>
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
                    <Button variant="contained">Update</Button>
                </Box>
            </Box>
        </>
    )
}

export default UpdatePoster
