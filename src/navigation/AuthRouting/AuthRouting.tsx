import React from 'react'
import { Route, Routes } from 'react-router'
import LoginWithOtp from "screen/Auth/LoginWithOtp/LoginWithOtp";
import SignUp from "screen/Auth/SignUp/SignUp";
import WithAuthLayout from "layout/WithAuthLayout/WithAuthLayout";
import Login from "screen/Auth/Login/Login";
const AuthRouting = () => {
    return (
        <Routes>
            <Route path="/*" element={<WithAuthLayout component={Login} />} />
            <Route
                path="/login-with-otp"
                element={<WithAuthLayout component={LoginWithOtp} />}
            />
            <Route path="/signUp" element={<WithAuthLayout component={SignUp} />} />
        </Routes>


    )
}

export default AuthRouting