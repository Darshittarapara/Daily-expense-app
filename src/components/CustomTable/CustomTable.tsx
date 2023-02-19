import React from 'react';
interface CustomTableProps {
    row: any[]
    coloum: any[]
    showTableData: (item: any, index: number) => JSX.Element
}
export const CustomTable: React.FC<CustomTableProps> = ({ row, coloum, showTableData }) => {
    return (
       

        <table className="table table-striped table-bordered table-hover">
            <thead>
                <tr>
                {row.map((header, index) => <td key={`${index}`}>{header}</td>)}
                </tr>
            </thead>
            <tbody>
                {coloum.map((data, index) => showTableData(data,index))}
            </tbody>
        </table>
    )
}