import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart from 'react-apexcharts'

interface ColoumChartProps {
    id: string
    data: any
    width: number
}
export const ColumnChart: React.FC<ColoumChartProps> = (props) => {
    console.log(props.data[0].data)
    const options: ApexOptions = {
        chart: {
            id: props.id
        },
    }
    const series = [{
        data: [{
            x: 'category A',
            y: 10
        }, {
            x: 'category B',
            y: 18
        }, {
            x: 'category C',
            y: 13
        }]
    }]
    return (
        <div className="row">
            <div className="mixed-chart">
                <ReactApexChart
                    series={series}
                    options={options}
                    type="bar"
                    width={props.width}
                />
            </div>
        </div>
    )

}