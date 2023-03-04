import React, { Fragment, useState } from 'react'
import { CustomTable } from 'components/CustomTable/CustomTable';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PaginationItems: React.FC<any> = ({ list, isLoading, row, showRowData, limit }) => {
    const [itemOffset, setItemOffset] = useState(0);
    const endOffset = itemOffset + limit;
    const currentItems = list.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(list.length / limit);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * limit) % list.length;
        setItemOffset(newOffset);
    };
    return (
        <Fragment>
            <CustomTable
                isLoading={isLoading}
                isError={currentItems.length > 0 ? false : true}
                coloum={currentItems}
                row={row}
                showTableData={showRowData}
            />
            <ReactPaginate
                breakLabel="..."
                nextLabel={list.length > 5 ? <FontAwesomeIcon icon={faChevronRight} />: ""}
                onPageChange={handlePageClick}
                pageRangeDisplayed={limit}
                pageCount={pageCount}
                className="pagination"
                activeClassName="active"
                previousLabel={list.length > 5 ?<FontAwesomeIcon icon={faChevronLeft} /> : ""}

            />
        </Fragment>

    )
}

export default PaginationItems