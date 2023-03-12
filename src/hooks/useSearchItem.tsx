import { CategoryListState } from 'context/CategoryContext/CategoryContext';
import { IncomeState } from 'context/IncomeContext/IncomeContext';
import { ExpenseState } from 'Modal/Modal';
import React, { SetStateAction } from 'react'

interface ISearchHookProps {
    label: string
    list: any[]
    setSearchItems: React.Dispatch<SetStateAction<any[]>>
    setSearchStatus: React.Dispatch<SetStateAction<string>>
}

export const useSearchItem: React.FC<ISearchHookProps> = ({
    label,
    list,
    setSearchItems,
    setSearchStatus
}): JSX.Element => {
    const searchChangeHandler = (value: string) => {
        if (value === "") {
            setSearchStatus("pending");
        }
        const searchList = list.filter((item) => {
            return (
                item?.name?.toLocaleLowerCase()?.includes(value.toLocaleLowerCase()) ||
                item?.amount?.toString().toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                item?.category?.toLocaleLowerCase().includes(value.toLocaleLowerCase()) ||
                item?.month?.toLocaleLowerCase().includes(value.toLocaleLowerCase())
            )
        });
        if (searchList.length > 0) {
            setSearchStatus("success");
        } else if (searchList.length === 0) {
            setSearchStatus('error');
        }
        setSearchItems(searchList);
    };

    const inputJSX = (
        <input
            type="text"
            onChange={(e) => searchChangeHandler(e.target.value)}
            placeholder={"Search " + label}
            name="searchInput"
        />
    );

    return (
        inputJSX
    )
};
