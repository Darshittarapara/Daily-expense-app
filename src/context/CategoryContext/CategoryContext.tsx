/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useCallback, useEffect } from 'react';
import { getCategory, getIndividualCategory, searchCategoryIcon, addCategory } from 'service/CategoryService';
import { useAuthContext } from 'context/AuthContext/AuthContext';
import { useNavigate } from 'react-router';
import { getItem } from 'helper/Storage';


interface CategoryContextValues {
    onSubmit: (name: string, type: "income" | 'expense') => void
    isLoading: boolean
    onDelete: (id: string) => void
    categoryList: CategoryListState[]
}
interface CategoryContextProps {
    children: JSX.Element,

}
export interface CategoryListState {
    name: string,
    type: string,
    id: string,

}


export const categoryContext = React.createContext({} as CategoryContextValues);
export const CategoryContextProvider: React.FC<CategoryContextProps> = (props) => {
    const { userId } = useAuthContext();
    const flatIconToken = getItem('flatIconToken')
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [categoryList, setCategoryList] = useState<CategoryListState[]>([]);

    const fetchCategory = useCallback(async () => {
        if (userId) {
            const data = await getCategory(userId);
            const category = Object.entries(data).map(([key, value]) => {
                const values = value as { name: string, type: string }
                return {
                    id: key,
                    ...values
                }
            })

            setCategoryList(category);
        }
    }, [userId]);

    useEffect(() => {

        fetchCategory();
    }, [fetchCategory])


    const deleteCategoryHandler = async (id: string) => {
        const reponse = await getIndividualCategory(userId, id)
        console.log(reponse)
    }
    const addCategoriesHandler = async (name: string, type: "expense" | "income") => {
        setIsLoading(true);
        const icon = await searchCategoryIcon(flatIconToken?.token, name);
        const payload = {
            name: icon as string, type
        }
        const data = await addCategory(payload, userId)
        if (data) {
            await fetchCategory();
            navigator('/category')
        }
        setIsLoading(false);
    }

    return <categoryContext.Provider value={{
        isLoading,
        onSubmit: addCategoriesHandler,
        onDelete: deleteCategoryHandler,
        categoryList
    }}>
        {props.children}
    </categoryContext.Provider>
}

export const useCategoryContext = () => {
    return useContext(categoryContext);
};