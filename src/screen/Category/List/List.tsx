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
                <div className='action-cell'>
                    <span title='Edit' className='btn btn-outline-success actions-btn' onClick={() => editCategory(item.id)}><FontAwesomeIcon icon={faEdit} /></span>
                    <span title='Delete' className='btn btn-outline-danger actions-btn' onClick={() => deleteCategory(item.id)}><FontAwesomeIcon icon={faTrash} /></span>
                    <span title='View' className='btn btn-outline-primary actions-btn' onClick={() => viewCategory(item.id)}><FontAwesomeIcon icon={faEye} /></span>
                </div>

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