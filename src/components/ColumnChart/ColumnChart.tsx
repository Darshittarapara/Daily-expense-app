import { ApexOptions } from 'apexcharts';
import React from 'react'
import ReactApexChart  from 'react-apexcharts'

interface ColoumChartProps {
    id: string
    width: number
    months:string[]
    series : {name : string, data : number[]}[]
}
export const ColumnChart: React.FC<ColoumChartProps> = (props) => {
   
    const options: ApexOptions = {
        chart: {
            id: props.id
        },
    
        xaxis: {
            categories: props.months
          }
    }
   
    return (
        <div className="row">
            <div className="mixed-chart">
                <ReactApexChart                 
                    series={props.series}
                    options={options}
                    type="bar"
                    width={props.width}
                />
            </div>
        </div>
    )

}