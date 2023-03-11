import React, { Fragment } from 'react'
import { DashBoardListProps, ExpenseState } from 'Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CustomTable } from 'components/CustomTable/CustomTable';
import './List.scss';
export const List: React.FC<DashBoardListProps> = (props) => {
    const row = ["No", "Title", "Category", "Month", "Amount", "Note", "Action"];
    console.log(props.data)
    const showRowData = (item: any, index: number) => {
        return <tr key={`${index}`}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.month}</td>
            <td>{item.amount}</td>
            <td>{item.note}</td>
            <td>
                <div className='action-cell'>
                    <span title='Edit' className='btn btn-outline-success actions-btn'><FontAwesomeIcon icon={faEdit} /></span>
                    <span title='Delete' className='btn btn-outline-danger actions-btn'><FontAwesomeIcon icon={faTrash} /></span>
                    <span title='View' className='btn btn-outline-primary actions-btn'><FontAwesomeIcon icon={faEye} /></span>
                </div>

            </td>
        </tr>
    }
    const shortList = props?.data?.filter((item: any, index: number) => index < 5);
    return (
        <Fragment>
            {props.data.length > 0 && <CustomTable coloum={shortList} row={row} showTableData={showRowData} />}
        </Fragment>
    )
}
