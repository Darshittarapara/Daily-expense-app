import { ColumnChart } from 'components/ColumnChart/ColumnChart';
import React, { useEffect, useState, Fragment } from 'react'
import { MonthWiseData, MonthlyChartProp } from 'Modal/Modal';

export const MonthlyCharts: React.FC<MonthlyChartProp> = (props) => {

    const [monthWiseExpense, setMonthWiseExpense] = useState<MonthWiseData[]>([])
    useEffect(() => {
        const monthWiseData: any = {
            data: []
        };
        props.data.forEach((currentElemet) => {
            const { month, amount } = currentElemet
            monthWiseData.data.push({
                x: month,
                y: amount
            })
        })

        setMonthWiseExpense(monthWiseData);
    }, [props.data]);
    console.log(monthWiseExpense)
    return (
        <Fragment>
            {monthWiseExpense.length > 0 && <ColumnChart
                width={500}
                id={props.id}
                data={monthWiseExpense} />}
        </Fragment>
    )
}
