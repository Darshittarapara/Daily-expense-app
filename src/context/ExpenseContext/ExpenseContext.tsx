/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
// import { ref, get, child, getDatabase, } from 'firebase/database'
// import { getItem } from 'helper/Storage';
// import { UserProfileDetails } from 'Modal/Modal';
// import { number } from 'yup';
import { ExpenseState } from 'Modal/Modal';
import data from 'assets/data/data.json';

// interface userContextProviderValues {

// };
interface ExpenseContextValues {
    expenseList: {
        id?: string,
        name: string,
        category: string,
        note :string
        
        month: string
        amount: string
    }[]
    isLoading: boolean
}
interface ExpenseContextProps {
    children: JSX.Element,

}



export const expenseContext = React.createContext({} as ExpenseContextValues);
export const ExpenseContext: React.FC<ExpenseContextProps> = (props) => {
    const expenseData = data.expense
    const [expenseList, setExpenseList] = useState<ExpenseState[]>(expenseData);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        setIsLoading(true)
        setExpenseList(expenseData)
    }, [])

    return <expenseContext.Provider value={{ isLoading, expenseList }}>
        {props.children}
    </expenseContext.Provider>
}

export const useExpenseContext = () => {
    return useContext(expenseContext);
};