/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from 'react';
// import { ref, get, child, getDatabase, } from 'firebase/database'
// import { getItem } from 'helper/Storage';
// import { UserProfileDetails } from 'Modal/Modal';
// import { number } from 'yup';
import data from 'assets/data/data.json';

// interface userContextProviderValues {

// };
interface IncomeContextValues {
    incomeList: {
        id: string,
        month: string
        name: string,
        category: string,
        note: string,
        amount: string
    }[]
    isLoading: boolean
}
interface IncomeContextProps {
    children: JSX.Element,

}
interface IncomeState {
    id: string
    name: string
    category: string
    note: string,
    month: string
    amount: string
}


export const IncomeContext = React.createContext({} as IncomeContextValues);
export const IncomeContextProvider: React.FC<IncomeContextProps> = (props) => {
    const incomeData = [...data.income]
    const [incomeList, setIncomeList] = useState<IncomeState[]>(incomeData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    // useEffect(() => {
    //     fetchUserData()
    // }, []);
    return <IncomeContext.Provider value={{ isLoading, incomeList }}>
        {props.children}
    </IncomeContext.Provider>
}

export const useIncomeContext = () => {
    return useContext(IncomeContext);
};