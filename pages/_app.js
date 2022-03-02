import '../styles/globals.css'
import React from 'react';
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuIcon from '@mui/icons-material/Menu';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PollIcon from '@mui/icons-material/Poll';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from '../components/Footer';
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import Link from 'next/link';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HomeIcon from '@mui/icons-material/Home';

function MyApp({ Component, pageProps }) {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link href="/" passHref>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={"HOME"} />
          </ListItem>
        </Link>
        <Link href="/referral" passHref>
          <ListItem button>
            <ListItemIcon>
              <GroupAddIcon color='primary' />
            </ListItemIcon>
            <ListItemText primary={"REFERRAL"} />
          </ListItem>
        </Link>
      </List>
    </Box>
  );

  const router = useRouter()
  if (router.pathname === '/auth/register') {
    return (
      <>
        <Component {...pageProps} />
        <SwipeableDrawer
          anchor={'top'}
          open={state['top']}
          onClose={toggleDrawer('top', false)}
          onOpen={toggleDrawer('top', true)}
        >
          {list('top')}
        </SwipeableDrawer>
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <Button onClick={toggleDrawer('top', true)} sx={{ borderRadius: '75%', p: 2 }} variant="contained"><MenuIcon /></Button>
        </Box>
        <Footer />
      </>
    )
  }
  if (router.pathname === '/auth/owner-login') {
    return (
      <>
        <Component {...pageProps} />
        <SwipeableDrawer
          anchor={'top'}
          open={state['top']}
          onClose={toggleDrawer('top', false)}
          onOpen={toggleDrawer('top', true)}
        >
          {list('top')}
        </SwipeableDrawer>
        <Box sx={{ position: 'fixed', bottom: 20, right: 20, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <Button onClick={toggleDrawer('top', true)} sx={{ borderRadius: '75%', p: 2 }} variant="contained"><MenuIcon /></Button>
        </Box>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <SwipeableDrawer
        anchor={'top'}
        open={state['top']}
        onClose={toggleDrawer('top', false)}
        onOpen={toggleDrawer('top', true)}
      >
        {list('top')}
      </SwipeableDrawer>
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <Button onClick={toggleDrawer('top', true)} sx={{ borderRadius: '75%', p: 2 }} variant="contained"><MenuIcon /></Button>
      </Box>
      <Footer />
    </>

  )
}

export default MyApp
