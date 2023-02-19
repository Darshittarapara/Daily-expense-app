import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart  from 'react-apexcharts'

interface ColoumChartProps {
    id: string
    data: any
    width: number
}
export const ColumnChart: React.FC<ColoumChartProps> = (props) => {
    console.log(props.id)
    const options: ApexOptions = {
        chart: {
            id: props.id
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
          }
    }
    const series =  [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    return (
        <div className="row">
            <div className="mixed-chart">
                <ReactApexChart                 
                    series={series}
                    options={options}
                    type="line"
                    width={props.width}
                />
            </div>
        </div>
    )

}