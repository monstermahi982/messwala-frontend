import React from 'react'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BallotIcon from '@mui/icons-material/Ballot';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddMenu from '../components/AddMenu'
import OwnerProfile from '../components/OwnerProfile'
import Polls from '../components/Polls'
import Statics from '../components/Statics'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const Dashboard = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: '100vh', }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab icon={<MenuBookIcon />} aria-label="Menu" {...a11yProps(0)} label="Menu" />
                    <Tab icon={<BallotIcon />} aria-label="Poll" {...a11yProps(1)} label="Poll" />
                    <Tab icon={<AccountCircleIcon />} aria-label="Profile" {...a11yProps(2)} label="Profile" />
                    <Tab icon={<LeaderboardIcon />} aria-label="Statics" {...a11yProps(3)} label="Statics" />
                </Tabs>

                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <AddMenu />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <Polls />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        <OwnerProfile />
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <Statics />
                    </TabPanel>
                </SwipeableViews>
            </Box>

        </>
    )
}

export default Dashboard
