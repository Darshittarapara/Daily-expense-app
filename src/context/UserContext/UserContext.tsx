/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { ref, get, child, getDatabase, } from 'firebase/database'
import { getItem } from 'helper/Storage';
import { UserProfileDetails } from 'Modal/Modal';


// interface userContextProviderValues {

// };
interface UserContextProvider {
    displayName: string,
    photoURL: string
    isLoading: boolean
}
interface UserContextProps {
    children: JSX.Element,

}
export const logo = "https://www.travelperk.com/wp-content/uploads/expensify-logo-1580x232.png"
export const userContext = React.createContext({} as UserContextProvider);
export const UserContext: React.FC<UserContextProps> = (props) => {
    const user = getItem('user');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserProfileDetails>({
        displayName: '',
        photoURL: ''
    });
    const userId = useMemo(() => user, [user]);
    const fetchUserData = useCallback(
        async () => {
            setIsLoading(true)
            const { uid } = userId;
            const startRef = ref(getDatabase());
            const response = await get(child(startRef, `users/${uid}`))
            if (response.exists()) {
                setUserData(response.val());
                setIsLoading(false)
            }
            else {
                setIsLoading(false);
                console.log('no data found')
            }
        },
        [userId],
    )

    useEffect(() => {
        fetchUserData()
    }, []);
    return <userContext.Provider value={{ isLoading, displayName: userData.displayName, photoURL: userData.photoURL }}>
        {props.children}
    </userContext.Provider>
}

export const useUserContext = () => {
    return useContext(userContext);
};