import React from 'react'
import {Chart} from 'react-google-charts'


const Charts = props => {

    return (
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={[
                    ['Category', 'Element'],
                    ['Bills', props.bills],
                    ['Personal', props.bills],
                    ['Debts', props.debt],
                    ['Entertainment', props.entertainment],
                    ['Groceries', props.groceries],
                    ['Other', props.other]
                ]}
                options={{
                    title: 'Where Your Money is Going',
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}

export default Charts