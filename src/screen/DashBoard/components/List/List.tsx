import React, { Fragment } from 'react'
import { DashBoardListProps, ExpenseState } from 'Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import { CustomTable } from 'components/CustomTable/CustomTable';
import './List.scss';
import { IncomeState } from 'context/IncomeContext/IncomeContext';
import { DropDown } from 'components/DropDown/DropDown';
import { Strings } from 'resource/Strings';

export const List: React.FC<DashBoardListProps> = (props) => {
    const row = ["No", "Title", "Category", "Month", "Amount", "Action"];
    const showRowData = (item: IncomeState | ExpenseState, index: number) => {
        return <tr key={`${index}`}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.month}</td>
            <td>{item.amount}</td>
            <td>
                <DropDown id='action' menuTitle='Action'>
                    <div className='dropdown-item'>
                        <span title='Edit' onClick={() => props.onEditButtonClick(item.id || '')}>{Strings.edit}</span>
                    </div>
                    <div className='dropdown-item'>
                        <span title='Delete'  onClick={() => props.onDeleteButtonClick(item.id || '')}>{Strings.delete}</span>
                    </div>
                    <div className='dropdown-item'>
                        <span title='View' onClick={() => props.onViewButtonClick(item.id || '')}>{Strings.view}</span>
                    </div>
                </DropDown>
            </td>
        </tr>
    }
    const shortList = props?.data?.filter((item: any, index: number) => index < 5);
    return (
        <Fragment>
            {props.data.length > 0 ? <CustomTable coloum={shortList} row={row} showTableData={showRowData} /> : <h2>You are not add {props.pageName}</h2>}
        </Fragment>
    )
}
