import { getItem } from 'helper/Storage';
import AuthLayout from 'layout/AuthLayout/AuthLayout';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import LoginWithOtp from 'screen/Auth/LoginWithOtp/LoginWithOtp';
import SignUp from 'screen/Auth/SignUp/SignUp';
import { DashBoard } from 'screen/DashBoard/DashBoard';
import WithAuthLayout from '../layout/WithAuthLayout/WithAuthLayout';
import Login from '../screen/Auth/Login/Login';

export const Routing = () => {
    const navigator = useNavigate();
    const { pathname } = useLocation();
    const user = getItem('user');
    useEffect(() => {
        if (!user && pathname === '/') {
            navigator("/auth")
        }
    }, [navigator, pathname, user])
    return (
        <Routes>
            {user && (
                <Route path='/' element={
                    <AuthLayout component={DashBoard} />
                } />
            )}
            <Route path='/auth' element={
                <WithAuthLayout component={Login} />
            } />
            <Route path='/auth/login-with-otp' element={
                <WithAuthLayout component={LoginWithOtp} />
            } />
            <Route path='/auth/signUp' element={
                <WithAuthLayout component={SignUp} />
            } />
        </Routes>
    )
}