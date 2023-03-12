import React, { Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash, faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import dummyIcon from 'assets/image/image-not-found-icon.png'
import './List.scss';
import { SectionHeader } from 'components/SectionHeader/SectionHeader';
import { CategoryListState, useCategoryContext } from 'context/CategoryContext/CategoryContext';
import { Strings } from 'resource/Strings';
import Button from 'components/Button/Button';
import { useNavigate } from 'react-router';
import PaginationItems from 'components/PaginationItems/PaginationItems';
import { DropDown } from 'components/DropDown/DropDown';

const List = () => {
    const navigator = useNavigate();

    const { categoryList, onDelete, isLoading } = useCategoryContext();
    const row = ["No", "Title", "Type", "Action"]

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
                <img className='categoryImage' src={item.icon || dummyIcon} alt="category Name" />
            </td>
            <td className={typeCellClasses}>
                <FontAwesomeIcon icon={faIndianRupeeSign} />
            </td>
            <td>
                <DropDown id='action' menuTitle='Action'>
                    <div className='dropdown-item'>
                        <span title='Edit' onClick={() => editCategory(item.id!)}>{Strings.edit}</span>
                    </div>
                    <div className='dropdown-item'>
                        <span title='Delete' onClick={() => deleteCategory(item.id || '')}>{Strings.delete}</span>
                    </div>
                    <div className='dropdown-item'>
                        <span title='View' onClick={() => viewCategory(item.id || '')}>{Strings.view}</span>
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
                <Button type="button" classes="btn btn-warning" onClick={() => navigator('/category/add')} >
                    {Strings.addCategory}
                </Button>
            </SectionHeader>
            <PaginationItems limit={5} row={row} showRowData={showRowData} isLoading={isLoading} list={categoryList} />
        </Fragment>
    )
}
export default List