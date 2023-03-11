/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useCallback } from 'react';
import { ExpenseState } from 'Modal/Modal';
import { addExpense, deleteExpense, getExpenses, updateExpense } from 'service/ExpenseService';
import { useAuthContext } from 'context/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AlertMessage, Message } from 'helper/AlertMessage';
interface ExpenseContextValues {
    expenseList: {
        id?: string
        name: string
        note: string,
        date?: Date,
        category: string,
        amount: string | number,
        month: string
    }[]
    onDelete: (id: string) => void
    fetchExpense: () => void
    onUpdateExpense: (payload: ExpenseState, id: string) => void
    onAddExpense: (payload: ExpenseState) => void
    isLoading: boolean
}
interface ExpenseContextProps {
    children: JSX.Element,

}

export const expenseContext = React.createContext({} as ExpenseContextValues);
export const ExpenseContext: React.FC<ExpenseContextProps> = (props) => {
    const [expenseList, setExpenseList] = useState<ExpenseState[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { userId } = useAuthContext();
    const navigator = useNavigate();

    const fetchExpense = useCallback(async () => {
        if (userId) {
            setIsLoading(true);
            const data = await getExpenses(userId);
            if (data) {
                const income = Object.entries(data).map(([key, value]) => {
                    /**
                     * @param key = is the firebase alphabetical key (-NKYD.. type)
                     * store that object into state
                     */
                    const values = value as ExpenseState;
                    return {
                        id: key,
                        ...values,
                    };
                });
                setExpenseList(income)
            } else {
                setExpenseList([]);
            }
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchExpense();
    }, [fetchExpense]);

    const deleteExpenseHandler = (id: string) => {
        AlertMessage().then(async (result) => {
            if (result.isConfirmed) {
                await deleteExpense(userId, id).then(async (res) => {
                    await fetchExpense();
                });
            }
        });
    };
    const addExpenseItemHandler = async (payload: ExpenseState) => {
        setIsLoading(true);
        const data = await addExpense(payload, userId)
        if (data) {
            setIsLoading(false);
            Message("success", 'Expense added successfully')
                .then(async (res) => {
                    if (res.isConfirmed) {
                        navigator('/expenses');
                        await fetchExpense();
                    }
                })
        }
        setIsLoading(false);
    };

    const editExpenseItemHandler = async (payload: ExpenseState, id: string) => {
        setIsLoading(true);
        const data = await updateExpense(userId, id, payload)
        if (data) {
            setIsLoading(false);
            Message("success", 'Expense updated successfully')
                .then(async (res) => {
                    if (res.isConfirmed) {
                        navigator('/expenses');
                        await fetchExpense();
                    }
                })
        }
        setIsLoading(false);
    };

    return <expenseContext.Provider value={{
        onDelete: deleteExpenseHandler,
        onAddExpense: addExpenseItemHandler,
        onUpdateExpense: editExpenseItemHandler,
        fetchExpense,
        isLoading,
        expenseList
    }}>
        {props.children}
    </expenseContext.Provider>
}

export const useExpenseContext = () => {
    return useContext(expenseContext);
};