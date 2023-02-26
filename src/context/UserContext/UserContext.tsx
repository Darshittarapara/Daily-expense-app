/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useCallback } from "react";
import { ref, get, child, getDatabase } from "firebase/database";
import { UserProfileDetails } from "Modal/Modal";
import { useAuthContext } from "context/AuthContext/AuthContext";
import { auth } from "FirebaseConfig/FireBaseConfig";
import { getItem } from "helper/Storage";
interface UserContextProvider {
    displayName: string;
    photoURL: string;
    user: any
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
interface UserContextProps {
    children: JSX.Element;
}
export const logo ="https://www.travelperk.com/wp-content/uploads/expensify-logo-1580x232.png";
export const userContext = React.createContext({} as UserContextProvider);
export const UserContext: React.FC<UserContextProps> = (props) => {
    const { setUserId, setLoading } = useAuthContext();
    const [user, setUser] = useState(() => {
        const user = auth.currentUser;
        return user;
    });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserProfileDetails>({
        displayName: "",
        photoURL: "",
    });

    const fetchUserData = useCallback(async (userId: string) => {
        setIsLoading(true);
        const startRef = ref(getDatabase());
        const response = await get(child(startRef, `users/${userId}`));
        if (response.exists()) {
            setUserData(response.val());
            setIsLoading(false);
        } else {
            setIsLoading(false);
            console.log("no data found");
        }

    }, []);

    useEffect(() => {
        const userDetails = getItem('user');
        setUser(userDetails);
        setUserId(userDetails!.uid);
        fetchUserData(userDetails!.uid);
    }, [setUserId, setLoading]);

    return (
        <userContext.Provider
            value={{
                isLoading,
                user,
                displayName: userData.displayName,
                photoURL: userData.photoURL,
                setIsLoading
            }}
        >
            {props.children}
        </userContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(userContext);
};
