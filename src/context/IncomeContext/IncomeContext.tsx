/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthContext } from 'context/AuthContext/AuthContext';
import { AlertMessage, Message } from 'helper/AlertMessage';
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addIncome, deleteIncome, getIncomes, updateIncome } from 'service/IncomeService';

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
    onDelete: (id: string) => void
    fetchIncome: () => void
    onUpdateIncome: (payload: IncomeState, id: string) => void
    onAddIncome: (payload: IncomeState) => void
}
interface IncomeContextProps {
    children: JSX.Element,

}

export const IncomeContext = React.createContext({} as IncomeContextValues);
export const IncomeContextProvider: React.FC<IncomeContextProps> = (props) => {
    const [incomeList, setIncomeList] = useState<IncomeState[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { userId } = useAuthContext();
    const navigator = useNavigate();

    const fetchIncome = useCallback(async () => {
        if (userId) {
            setIsLoading(true);
            const data = await getIncomes(userId);
            if (data) {
                const income = Object.entries(data).map(([key, value]) => {
                    /**
                     * @param key = is the firebase alphabetical key (-NKYD.. type)
                     * store that object into state
                     */
                    const values = value as IncomeState;
                    return {
                        id: key,
                        ...values,
                    };
                });
                setIncomeList(income)
            } else {
                setIncomeList([]);
            }
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchIncome();
    }, [fetchIncome]);

    const deleteIncomeHandler = (id: string) => {
        AlertMessage().then(async (result) => {
            if (result.isConfirmed) {
                await deleteIncome(userId, id).then(async (res) => {
                    await fetchIncome();
                });
            }
        });
    };
    const addIncomeItemHandler = async (payload: IncomeState) => {
        setIsLoading(true);
        const data = await addIncome(payload, userId)
        if (data) {
            setIsLoading(false);
            Message("success", 'Income added successfully')
                .then(async (res) => {
                    if (res.isConfirmed) {
                        await fetchIncome();
                        navigator('/incomes');
                    }
                })
        }
        setIsLoading(false);
    };

    const editIncomeItemHandler = async (payload: IncomeState, id: string) => {
        setIsLoading(true);
        const data = await updateIncome(userId, id, payload)
        if (data) {
            setIsLoading(false);
            Message("success", 'Income updated successfully')
                .then(async (res) => {
                    if (res.isConfirmed) {
                        navigator('/incomes');
                        await fetchIncome();
                    }
                })
        }
        setIsLoading(false);
    };

    return <IncomeContext.Provider value={{ onUpdateIncome: editIncomeItemHandler, onDelete: deleteIncomeHandler, fetchIncome, isLoading, incomeList, onAddIncome: addIncomeItemHandler }}>
        {props.children}
    </IncomeContext.Provider>
}

export const useIncomeContext = () => {
    return useContext(IncomeContext);
};