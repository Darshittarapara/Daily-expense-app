/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from 'react';
import { ref, get, child, getDatabase, } from 'firebase/database'
// import { getItem } from 'helper/Storage';
import { db } from 'FirebaseConfig/FireBaseConfig';
// import { UserProfileDetails } from 'Modal/Modal';
// import { number } from 'yup';
import { ExpenseState } from 'Modal/Modal';
import data from 'assets/data/data.json';

// interface userContextProviderValues {

// };
interface CategoryContextValues {
    onSubmit : (name:string, type:"income"|'expense') => void
    isLoading: boolean
}
interface CategoryContextProps {
    children: JSX.Element,

}



export const categoryContext = React.createContext({} as CategoryContextValues);
export const CategoryContextProvider: React.FC<CategoryContextProps> = (props) => {
    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addCategoriesHandler =async (name:string ,type:"expense"|"income") => {
console.log(name, type);

    }
    // const fetchUserData = useCallback(
    //     async () => {
    //         setIsLoading(true)
    //         const { uid } = userId;
    //         const startRef = ref(getDatabase());
    //         const response = await get(child(startRef, `users/${uid}`))
    //         if (response.exists()) {
    //             setUserData(response.val());
    //             setIsLoading(false)
    //         }
    //         else {
    //             setIsLoading(false);
    //             console.log('no data found')
    //         }
    //     },
    //     [userId],
    // )

    //
    return <categoryContext.Provider value={{ isLoading, onSubmit:addCategoriesHandler }}>
        {props.children}
    </categoryContext.Provider>
}

export const useCategoryContext = () => {
    return useContext(categoryContext);
};