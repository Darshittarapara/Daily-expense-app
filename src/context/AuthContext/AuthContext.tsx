import React, { useState, useContext } from 'react';
import * as firebase from 'firebase/auth';
import { auth } from 'FirebaseConfig/FireBaseConfig';
import { setItem } from 'helper/Storage';
import { authErrorHandler } from 'helper/Validation';
import { useNavigate } from 'react-router-dom';;

interface authContextProviderValues {
    onLogin: (email: string, password: string) => void,
    isLoading: boolean
    error: string
    setError: React.Dispatch<React.SetStateAction<string>>
    setUpRecaptcha: any
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

interface AuthContextProps {
    children: JSX.Element,
};

export const authContext = React.createContext({} as authContextProviderValues);
export const AuthContext: React.FC<AuthContextProps> = (props) => {
    const { RecaptchaVerifier, signInWithPhoneNumber } = firebase
    const navigator = useNavigate();
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);
    const loginHandler = async (email: string, password: string) => {

        setLoading(true);
        firebase.signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                navigator('/');
                setItem('user', response.user);
                setLoading(false);

            }).catch((error) => {
                const errors = authErrorHandler(new Error(error).message);
                setError(errors);
                setLoading(false);
            })
    }

    const setUpRecaptcha = (phoneNumber: string) => {
        setLoading(true)
        const number = "+91" + phoneNumber;
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
        recaptchaVerifier.render().then(() => setLoading(false)).catch(() => setLoading(false))
        return signInWithPhoneNumber(auth, number, recaptchaVerifier)
    }
    const ctx = {
        onLogin: loginHandler,
        isLoading,
        error,
        setError,
        setUpRecaptcha,
        setLoading
    }
    return <authContext.Provider value={ctx}>
        {props.children}
    </authContext.Provider>
}

export const useAuthContext = () => {
    return useContext(authContext);
};