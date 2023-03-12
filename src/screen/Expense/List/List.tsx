import React, { Fragment, useState } from 'react'
import './List.scss';
import { SectionHeader } from 'components/SectionHeader/SectionHeader';
import { Strings } from 'resource/Strings';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router';
import PaginationItems from 'components/PaginationItems/PaginationItems';
import { IncomeState } from 'context/IncomeContext/IncomeContext';
import { formatDDMMYYYFormat } from 'helper/helper';
import { useExpenseContext } from 'context/ExpenseContext/ExpenseContext';
import { DropDown } from 'components/DropDown/DropDown';
import { useSearchItem } from 'hooks/useSearchItem';
import { ExpenseState } from 'Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const List = () => {
    let list;
    const navigator = useNavigate();
    const [searchItems, setSearchItems] = useState<ExpenseState[]>([]);
    const [searchStatus, setSearchStatus] = useState("pending");
    const { expenseList, isLoading, onDelete } = useExpenseContext();
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const inputElement = useSearchItem({
        label: Strings.expense,
        list: expenseList,
        setSearchItems,
        setSearchStatus
    });

    const row = ["No", "Title", "Category", "Amount", "Month", 'Date', "Time", "Action"]
    if (searchStatus === "pending") {
        list = expenseList
    }
    if (searchStatus === "success") {
        list = searchItems
    }
    if (searchStatus === "error") {
        list = [];
    }
    const editCategory = (id: string) => {
        navigator(`/expense/${id}/edit`);
    }

    const deleteCategory = (id: string) => {
        onDelete(id);
    }

    const viewCategory = (id: string) => {
        navigator(`/expense/${id}/view`);
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
                    <div className='dropdown-item' onClick={() => editCategory(item.id!)}>
                        <span title='Edit'>{Strings.edit}</span>
                    </div>
                    <div className='dropdown-item' onClick={() => deleteCategory(item.id || '')}>
                        <span title='Delete'>{Strings.delete}</span>
                    </div>
                    <div className='dropdown-item' onClick={() => viewCategory(item.id || '')}>
                        <span title='View'>{Strings.view}</span>
                    </div>
                </DropDown>
            </td>
        </tr>
    }

    return (
        <Fragment>
            <SectionHeader
                isListingPage={false}
                col="6"
                headerTitle={Strings.expense}
            >
                {isSearch ? <>
                    {inputElement}
                    <FontAwesomeIcon className='close-icon' icon={faClose} onClick={() => setIsSearch(false)} />
                </> : (
                    <DropDown id='expense-options' menuTitle={Strings.options}>
                        <div className='dropdown-item'>
                            <span onClick={() => setIsSearch(true)}>
                                {Strings.search}
                            </span>
                        </div>
                        <div className='dropdown-item'>
                            <span onClick={() => navigator('/expense/add')} >
                                {Strings.addExpense}
                            </span>
                        </div>
                    </DropDown>
                )}
            </SectionHeader>
            <PaginationItems
                limit={5}
                row={row}
                showRowData={showRowData}
                isLoading={isLoading}
                list={list}
            />
        </Fragment >
    )
}
export default List