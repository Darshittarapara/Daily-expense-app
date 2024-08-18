import React, { Fragment, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faIndianRupeeSign, faClose } from '@fortawesome/free-solid-svg-icons';
import dummyIcon from 'assets/image/image-not-found-icon.png'
import './List.scss';
import { SectionHeader } from 'components/SectionHeader/SectionHeader';
import { CategoryListState, useCategoryContext } from 'context/CategoryContext/CategoryContext';
import { Strings } from 'resource/Strings';
import { useNavigate } from 'react-router';
import PaginationItems from 'components/PaginationItems/PaginationItems';
import { DropDown } from 'components/DropDown/DropDown';
import { useSearchItem } from 'hooks/useSearchItem';

const List = () => {
    let list;
    const navigator = useNavigate();
    const { categoryList, onDelete, isLoading } = useCategoryContext();
    const [searchItems, setSearchItems] = useState<CategoryListState[]>([]);
    const [searchStatus, setSearchStatus] = useState("pending");
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const inputElement = useSearchItem({
        label: Strings.expense,
        list: categoryList,
        setSearchItems,
        setSearchStatus
    });
    const row = ["No", "Title", "Type", "Action"]
    if (searchStatus === "pending") {
        list = categoryList
    }
    if (searchStatus === "success") {
        list = searchItems
    }
    if (searchStatus === "error") {
        list = [];
    }
    const editCategory = (id: string) => {
        navigator(`/category/${id}/edit`);
    }

    const deleteCategory = (id: string) => {
        onDelete(id)
    }

    const viewCategory = (id: string) => {
        navigator(`/category/${id}/view`);
    }

    const showRowData = (item: CategoryListState, index: number) => {
        const typeCellClasses = item.type.toLocaleLowerCase() === "expense" ? "expense-type-icon" : "income-type-icon";
        return <tr key={`${index}`}>
            <td>{index + 1}</td>
            <td>
                {item?.name}
            </td>
            <td className={typeCellClasses}>
                <FontAwesomeIcon icon={faIndianRupeeSign} />
            </td>
            <td>
                <DropDown id='action' menuTitle='Action'>
                    <div className='dropdown-item' onClick={() => editCategory(item.id!)}>
                        <span title='Edit' >{Strings.edit}</span>
                    </div>
                    <div className='dropdown-item' onClick={() => deleteCategory(item.id || '')}>
                        <span title='Delete' >{Strings.delete}</span>
                    </div>
                    <div className='dropdown-item' onClick={() => viewCategory(item.id || '')}>
                        <span title='View' >{Strings.view}</span>
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
                headerTitle={Strings.category}
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
                            <span onClick={() => navigator('/category/add')} >
                                {Strings.addCategory}
                            </span>
                        </div>
                    </DropDown>
                )}
            </SectionHeader>
            <PaginationItems limit={5} row={row} showRowData={showRowData} isLoading={isLoading} list={list} />
        </Fragment>
    )
}
export default List
