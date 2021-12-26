import '../styles/globals.css'
import Navbar from '../components/Navbar';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PollIcon from '@mui/icons-material/Poll';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Footer from '../components/Footer';

const actions = [
  { icon: <AccountCircleIcon />, name: 'Profile' },
  { icon: <StarBorderIcon />, name: 'Favorites' },
  { icon: <PollIcon />, name: 'Polls' },
  { icon: <TrendingUpIcon />, name: 'Trending' },
];

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Box sx={{ position: 'fixed', bottom: 10, right: 10, height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<MenuIcon />}
        >
          {/* openIcon={<CloseIcon />} */}
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
            />
          ))}
        </SpeedDial>
      </Box>
      <Footer />
    </>

  )
}

export default MyApp
