import React from 'react'
import Typography from '@mui/material/Typography';
// import { Avatar } from '@mui/material';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';


const MenuComment = ({ data }) => {
    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {data.name[0]}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={data.name}
                    secondary={data.comment}
                />
            </ListItem>
            <Divider variant="inset" />
        </>
    )
}

export default MenuComment
