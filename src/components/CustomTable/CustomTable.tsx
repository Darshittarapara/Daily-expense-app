import React from 'react';
import './CustomTable.scss'
import { Strings } from 'resource/Strings';
import { useCategoryContext } from 'context/CategoryContext/CategoryContext';
import { Loader } from 'components/Loader/Loader';
interface CustomTableProps {
    row: any[]
    coloum: any[]
    isLoading?: boolean
    isError?: boolean
    showTableData: (item: any, index: number) => JSX.Element
}
export const CustomTable: React.FC<CustomTableProps> = ({ isLoading, isError, row, coloum, showTableData }) => {

    return (
        <div className='table-wrapper'>
            <table className="table table-hover">
                <thead>
                    <tr>
                        {row.map((header, index) => <td key={`${index}`}>{header}</td>)}
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <tr><td><Loader /></td></tr>}
                    {isError && !isLoading && <tr><td>{Strings.noMoreItem}</td></tr>}
                    {!isError && !isLoading && coloum.map((data, index) => showTableData(data, index))}
                </tbody>
            </table>
        </div>

    )
}