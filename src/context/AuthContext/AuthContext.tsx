import React, { useState, useContext } from 'react';
import * as firebase from 'firebase/auth';
import { auth, db } from 'FirebaseConfig/FireBaseConfig';
import { setItem } from 'helper/Storage';
import { authErrorHandler } from 'helper/Validation';
import { useNavigate } from 'react-router-dom'; import { SignUpSubmitPayLoad } from 'Modal/Modal';
import { ref, set } from 'firebase/database'
import { clearStorage } from 'helper/Storage';
import { getAccessToken } from 'service/FlatIconAuthService';
interface authContextProviderValues {
    onLogin: (email: string, password: string) => void,
    isLoading: boolean
    error: string
    userId: string
    logOut: () => void
    onSignUp: (payload: SignUpSubmitPayLoad) => void
    setError: React.Dispatch<React.SetStateAction<string>>
    setUserId: React.Dispatch<React.SetStateAction<string>>
    setUpRecaptcha: any
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

interface AuthContextProps {
    children: JSX.Element,
};
export const logo = "https://www.travelperk.com/wp-content/uploads/expensify-logo-1580x232.png"
export const authContext = React.createContext({} as authContextProviderValues);
export const AuthContext: React.FC<AuthContextProps> = (props) => {
    const { RecaptchaVerifier, signInWithPhoneNumber } = firebase
    const navigator = useNavigate();
    const [userId, setUserId] = useState<string>('');
    const [error, setError] = useState<string>("");
    const [isLoading, setLoading] = useState<boolean>(false);


    const loginHandler = async (email: string, password: string) => {
        setLoading(true);
        firebase.signInWithEmailAndPassword(auth, email, password)
            .then(async (response) => {
                await getAccessToken();
                navigator('/');
                setItem('user', response.user);
                setUserId(response.user.uid);
                setLoading(false);
            }).catch((error) => {
                const errors = authErrorHandler(new Error(error).message);
                setError(errors);
                setLoading(false);
            })
    }

    const logOutHandler = () => {
        clearStorage();
        window.location.reload();
    };
    const setUpRecaptcha = (phoneNumber: string) => {
        setLoading(true)
        const number = "+91" + phoneNumber;
        alert(number)
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth)
        recaptchaVerifier.render().then(() => setLoading(false)).catch(() => setLoading(false))
        return signInWithPhoneNumber(auth, number, recaptchaVerifier)
    }
    
    const signUpHandler = async (payload: SignUpSubmitPayLoad) => {
        setLoading(true);
        firebase.createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then((response) => {
                setItem('user', response.user);
                setUserId(response.user.uid);
                set(ref(db, 'users/' + response.user.uid), {
                    displayName: payload.displayName,
                    photoURL: payload.pictureUrl
                }).then((response) => {
                    navigator('/');
                    setLoading(false);

                })
            }).catch((error) => {
                const errors = authErrorHandler(new Error(error).message);
                setError(errors);
                setLoading(false);
            })
    }
    const ctx = {
        onLogin: loginHandler,
        isLoading,
        error,
        setError,
        setUpRecaptcha,
        userId,
        setUserId,
        setLoading,
        logOut: logOutHandler,
        onSignUp: signUpHandler
    }
    return <authContext.Provider value={ctx}>
        {props.children}
    </authContext.Provider>
}

export const useAuthContext = () => {
    return useContext(authContext);
};