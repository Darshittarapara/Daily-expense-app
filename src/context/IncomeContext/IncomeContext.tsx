/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';

export interface IncomeState {
    id?: string
    name: string
    note: string,
    date?: Date,
    category: string,
    amount: string | number,
    month: string
}
interface IncomeContextValues {
    incomeList: IncomeState[]
    isLoading: boolean
    onAddIncome: (payload: IncomeState) => void
}
interface IncomeContextProps {
    children: JSX.Element,

}



export const IncomeContext = React.createContext({} as IncomeContextValues);
export const IncomeContextProvider: React.FC<IncomeContextProps> = (props) => {
    const [incomeList, setIncomeList] = useState<IncomeState[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const addIncomeItemHandler = (payload: IncomeState) => {
        setIsLoading(true);
        const newIncomeItem = [...incomeList];
        newIncomeItem.push(payload);
        setIncomeList(newIncomeItem)
        setIsLoading(false);
    };

    return <IncomeContext.Provider value={{ isLoading, incomeList, onAddIncome: addIncomeItemHandler }}>
        {props.children}
    </IncomeContext.Provider>
}

export const useIncomeContext = () => {
    return useContext(IncomeContext);
};