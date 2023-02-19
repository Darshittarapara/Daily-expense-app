import { ColumnChart } from 'components/ColumnChart/ColumnChart';
import React, { useEffect, useState, Fragment } from 'react'
import {  MonthlyChartProp } from 'Modal/Modal';
import { getMonthWiseAmounts } from 'helper/helper';

export const MonthlyCharts: React.FC<MonthlyChartProp> = (props) => {
    const [months, setMonths] = useState<string[]>([]);
    console.log(props.data)
    useEffect(() => {
      const {monthList} = getMonthWiseAmounts(props.data)
        setMonths(monthList)
    }, [props.data]);

    return (
        <Fragment>
            { props.monthlyChartData.length > 0 && months.length > 0 && <ColumnChart
                width={460}
                series = {[{name : props.seriesName, data : props.monthlyChartData}]}
                id={props.id}
                months={months}
              />}
        </Fragment>
    )
}
