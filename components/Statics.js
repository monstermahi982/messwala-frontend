import { Box } from '@mui/material';
import React from 'react'
import { Chart } from "react-google-charts";

const Statics = ({ data }) => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['action', 'count'],
                        ['Likes', data.likes],
                        ['Dislikes', data.dislikes],
                        ['Views', data.views],
                        ['Comments', data.comments]
                    ]}
                    options={{
                        title: 'Todays Users Responses',
                        // Just add this option
                        is3D: true,
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            </Box>
        </>
    )
}

export default Statics
