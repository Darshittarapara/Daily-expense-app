import React, { Fragment, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import './List.scss';
import { SectionHeader } from 'components/SectionHeader/SectionHeader';
import { Strings } from 'resource/Strings';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router';
import PaginationItems from 'components/PaginationItems/PaginationItems';
import { IncomeState, useIncomeContext } from 'context/IncomeContext/IncomeContext';
import { formatDDMMYYYFormat } from 'helper/helper';
import { DropDown } from 'components/DropDown/DropDown';

const List = () => {
    const navigator = useNavigate();
    const { incomeList, isLoading, onDelete } = useIncomeContext();
    const row = ["No", "Title", "Category", "Amount", "Month", 'Date', "Time", "Action"];

    const editCategory = (id: string) => {
        navigator(`/income/${id}/edit`);
    }

    const deleteCategory = (id: string) => {
        onDelete(id);
    }

    const viewCategory = (id: string) => {
        navigator(`/income/${id}/view`);
    }

    const showRowData = (item: IncomeState, index: number) => {
        const date = item.date + '';
        return <tr key={`${index}`}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.category}</td>
            <td>{item.amount}</td>
            <td>{item.month}</td>
            <td>{formatDDMMYYYFormat(new Date(date))}</td>
            <td>{new Date(date).toLocaleTimeString()}</td>
            <td>
                <DropDown id='action' menuTitle='Action'>
                    <div className='dropdown-item'>
                        <span title='Edit' onClick={() => editCategory(item.id!)}>{Strings.edit}</span>
                    </div>
                    <div className='dropdown-item'>
                        <span title='Delete' onClick={() =>deleteCategory(item.id || '')}>{Strings.delete}</span>
                    </div>
                    <div className='dropdown-item'>
                        <span title='View' onClick={() => viewCategory(item.id || '')}>{Strings.view}</span>
                    </div>
                </DropDown>
                {/* <span title='Edit' className='btn btn-outline-success actions-btn' onClick={() => editCategory(item.id!)}><FontAwesomeIcon icon={faEdit} /></span>
                    <span title='Delete' className='btn btn-outline-danger actions-btn' onClick={() => deleteCategory(item.id!)}><FontAwesomeIcon icon={faTrash} /></span>
                    <span title='View' className='btn btn-outline-primary actions-btn' onClick={() => viewCategory(item.id!)}><FontAwesomeIcon icon={faEye} /></span> */}

            </td>
        </tr>
    }

    return (
        <Fragment>
            <SectionHeader
                isListingPage={false}
                col="6"
                headerTitle={Strings.income}
            >
                <Button type="button" classes="btn btn-warning" onClick={() => navigator('/income/add')} >
                    {Strings.addIncome}
                </Button>
            </SectionHeader>
            <PaginationItems
                limit={5}
                row={row}
                showRowData={showRowData}
                isLoading={isLoading}
                list={incomeList}
            />
        </Fragment>
    )
}
export default List