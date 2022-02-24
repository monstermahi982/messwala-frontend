import React from 'react'
import Head from 'next/head'
import Grid from '@mui/material/Grid';
import ItemCard from '../components/ItemCard'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Count from '../components/Count'
import axios from 'axios'
import { URL } from '../config'
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function valuetext(value) {
  return `${value}°C`;
}

export default function Home({ messDataItem, dish_item }) {
  const [value, setValue] = React.useState([40, 60]);
  const [item, setItem] = React.useState([])
  const PageCount = Math.ceil(messDataItem.length / 5);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState([])
  const [filter, setFilter] = React.useState('');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const PageMenu = async () => {
    if (page * 10 - 1 > messDataItem.length) {

      setData(messDataItem.slice(page * 10 - 10, messDataItem.length));

    } else {
      setData(messDataItem.slice(page * 10 - 10, page * 10))
    }
  }

  React.useState(() => {
    PageMenu()
    return PageMenu()
  }, [page])


  const handlePageChange = (event, value) => {
    setPage(value);
    PageMenu()
  }

  return (
    <>
      <Head>
        <title>Mess Wala</title>
        <meta name="description" content="online mess menu viewing platform" />
        <meta name="keywords" content="messwala, cattering services, sunny mess, vitthal mess, sinhgad campus, online messwala, messwala online, messwala menus, messwala mess" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {
        messDataItem.length === 0 ?
          <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '47vh' }}>
              <PriorityHighIcon color="primary" sx={{ fontSize: 30 }} />
              <Typography color="primary" sx={{ fontSize: '20px', letterSpacing: '4px', fontWeight: '800', textAlign: 'center' }}>No menus available..,checkout after 11 AM or 6PM.</Typography>
            </Box>
          </>
          :
          <>
            <Grid container spacing={2} sx={{ p: 2 }}>
              <Grid item xs={12} sm={4} md={3}>
                <Card sx={{ Width: '100%' }}>
                  <CardHeader
                    sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'h6.fontSize', m: 0, p: 0, pt: 2 }}
                    title="Filter"
                  />
                  <CardContent>
                    <TextField onChange={(e) => setFilter(e.target.value)} value={filter} size="small" sx={{ mb: 1 }} fullWidth id="messname" label="Mess Name" variant="outlined" />

                    <Autocomplete
                      sx={{ mb: 1, width: '100%' }}
                      multiple
                      id="checkboxes-tags-demo"
                      options={dish_item}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.dish_name}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                          />
                          {option.dish_name}
                        </li>
                      )}

                      onChange={(event, value) => setItem(value)}

                      fullWidth
                      disabled
                      renderInput={(params) => (
                        <TextField {...params} size="small" label="Checkboxes" placeholder="Favorites" />
                      )}
                    />

                    <Box sx={{ width: '100%' }}>
                      <Typography sx={{ fontSize: '18px', my: 1, letterSpacing: '2px' }}>
                        Price Range
                      </Typography>
                      <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        size="small"
                        step={10}
                        marks
                        min={30}
                        max={150}
                        disabled
                      />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                      <Button disabled size="small" variant="contained" onClick={() => setLoad(true)}>Comming Soon</Button>
                    </Box>


                  </CardContent>
                </Card>
              </Grid>

              {

                filter ?

                  messDataItem.filter((messData) => messData.mess_name.includes(filter)).map((value, index) => (
                    <Grid item xs={12} sm={4} md={3} key={value._id}>
                      <ItemCard data={value} />
                    </Grid>
                  ))

                  :

                  data ?
                    data.map((value, index) => (
                      <Grid item xs={12} sm={4} md={3} key={value._id}>
                        <ItemCard data={value} />
                      </Grid>
                    ))
                    :
                    "not thing is there"

              }

            </Grid>

            {
              filter ? "" : <Stack spacing={2} sx={{ display: 'grid', justifyContent: 'center', py: 3 }}>
                <Pagination count={PageCount} page={page} onChange={handlePageChange} color="primary" size="large" />
              </Stack>
            }

          </>
      }
      <Count />

    </>
  )
}


export async function getServerSideProps(context) {
  const data = await axios.get(`${URL}mess`);

  const dish_item = await axios.get(`${process.env.URL}item`);

  return {
    props: { messDataItem: data.data, dish_item: dish_item.data }
  }
}