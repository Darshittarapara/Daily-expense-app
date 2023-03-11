import { ColumnChart } from 'components/ColumnChart/ColumnChart';
import React, { Fragment } from 'react'
import { MonthlyChartProp } from 'Modal/Modal';
import { getMonthWiseAmounts } from 'helper/helper';

export const MonthlyCharts: React.FC<MonthlyChartProp> = (props) => {
    const { monthList } = getMonthWiseAmounts(props.data)

    return (
        <Fragment>
            {props.monthlyChartData.length > 0 ? <ColumnChart
                width={390}
                series={[{ name: props.seriesName, data: props.monthlyChartData }]}
                id={props.id}
                months={monthList}
            /> : <h2>You are not add {props.seriesName.split(' ')?.[1]}</h2>}
        </Fragment>
    )
}
