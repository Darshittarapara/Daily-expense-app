import { useAuthContext } from 'context/AuthContext/AuthContext';
import { useUserContext } from 'context/UserContext/UserContext';
import { getItem } from 'helper/Storage';
import AuthLayout from 'layout/AuthLayout/AuthLayout';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginWithOtp from 'screen/Auth/LoginWithOtp/LoginWithOtp';
import SignUp from 'screen/Auth/SignUp/SignUp';
import { DashBoard } from 'screen/DashBoard/DashBoard';
import WithAuthLayout from '../layout/WithAuthLayout/WithAuthLayout';
import Login from '../screen/Auth/Login/Login';

export const Routing = () => {
const {userId, setUserId} = useAuthContext();
const {setIsLoading} = useUserContext()
useEffect(() => {
    const user = getItem('user');
    let clearTimer: string | number | NodeJS.Timeout | undefined;
    setIsLoading(true)
    if (user) {
        setUserId(user.uid)
        clearTimer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
    }
    return () => {
        clearTimeout(clearTimer)
    }
}, []);
    return (
        <Routes>
            {userId ? (
                <Route path='/' element={
                    <AuthLayout component={DashBoard} />
                } />
            ) :   <Route path='/' element={
                <WithAuthLayout component={Login} />
            } />}
          
            <Route path='/login-with-otp' element={
                <WithAuthLayout component={LoginWithOtp} />
            } />
            <Route path='/signUp' element={
                <WithAuthLayout component={SignUp} />
            } />
        </Routes>
    )
}