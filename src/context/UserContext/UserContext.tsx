/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect, useCallback } from "react";
import { ref, get, child, getDatabase } from "firebase/database";
import { UserProfileDetails } from "Modal/Modal";
import { useAuthContext } from "context/AuthContext/AuthContext";

// interface userContextProviderValues {

// };
interface UserContextProvider {
    displayName: string;
    photoURL: string;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}
interface UserContextProps {
    children: JSX.Element;
}
export const logo =
    "https://www.travelperk.com/wp-content/uploads/expensify-logo-1580x232.png";
export const userContext = React.createContext({} as UserContextProvider);
export const UserContext: React.FC<UserContextProps> = (props) => {
    const { userId } = useAuthContext()
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserProfileDetails>({
        displayName: "",
        photoURL: "",
    });
    console.log(userId);
    // const userId = useMemo(() => user, [user]);
    const fetchUserData = useCallback(async () => {
        if (userId) {
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
        }
    }, [userId]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);
    return (
        <userContext.Provider
            value={{
                isLoading,
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
