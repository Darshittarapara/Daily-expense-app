/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useCallback } from "react";
import { ref, get, child, getDatabase } from "firebase/database";
import { UserProfileDetails } from "Modal/Modal";
import { useAuthContext } from "context/AuthContext/AuthContext";
import { getItem } from "helper/Storage";
interface UserContextProvider {
    displayName: string;
    photoURL: string;
    user: any
}
interface UserContextProps {
    children: JSX.Element;
}
export const logo = "https://www.travelperk.com/wp-content/uploads/expensify-logo-1580x232.png";
export const userContext = React.createContext({} as UserContextProvider);
export const UserContext: React.FC<UserContextProps> = (props) => {
    const { setUserId, setIsStartUserProfileLoading, userId } = useAuthContext();
    const [user, setUser] = useState();
    const [userData, setUserData] = useState<UserProfileDetails>({
        displayName: "",
        photoURL: "",
    });

    const fetchUserData = useCallback(async () => {
        if (userId) {
            setIsStartUserProfileLoading(true);
            const startRef = ref(getDatabase());
            const response = await get(child(startRef, `users/${userId}`));
            if (response.exists()) {
                setUserData(response.val());
                setIsStartUserProfileLoading(false);
            } else {
                setIsStartUserProfileLoading(false);
                console.log("no data found");

            }
        }
    }, [userId]);

    useEffect(() => {
        const userDetails = getItem('user');
        setUser(userDetails);
        setUserId(userDetails!?.uid);
        fetchUserData();
    }, [setUserId, setIsStartUserProfileLoading, fetchUserData]);

    return (
        <userContext.Provider
            value={{
                user,
                displayName: userData.displayName,
                photoURL: userData.photoURL,                
            }}
        >
            {props.children}
        </userContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(userContext);
};
