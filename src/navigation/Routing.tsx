import { useAuthContext } from "context/AuthContext/AuthContext";
import { useUserContext } from "context/UserContext/UserContext";
import { getItem } from "helper/Storage";
import AuthLayout from "layout/AuthLayout/AuthLayout";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginWithOtp from "screen/Auth/LoginWithOtp/LoginWithOtp";
import SignUp from "screen/Auth/SignUp/SignUp";
import { DashBoard } from "screen/DashBoard/DashBoard";
import WithAuthLayout from "../layout/WithAuthLayout/WithAuthLayout";
import Login from "../screen/Auth/Login/Login";
import CategoryForm from "screen/Category/Add";
export const Routing = () => {
  const { userId, setUserId } = useAuthContext();
  const { setIsLoading, isLoading } = useUserContext();
  const uId = getItem('user')
  useEffect(() => {
    const user = getItem("user");
   
    let clearTimer: string | number | NodeJS.Timeout | undefined;
    setIsLoading(true);
    if (user) {
      setUserId(user.uid);
      clearTimer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
    return () => {
      clearTimeout(clearTimer);
    };
  }, [setIsLoading, setUserId]);
  return (
    <Routes>
      {userId && (
        <Route path="/" element={<AuthLayout component={DashBoard} />} />
      )}
      {!userId && !uId && (
        <Route path="/" element={<WithAuthLayout component={Login} />} />
      )}

      <Route path="/dashboard" element={<AuthLayout component={DashBoard} />} />

      <Route
        path="/category/add"
        element={<AuthLayout component={CategoryForm} />}
      />

      <Route
        path="/login-with-otp"
        element={<WithAuthLayout component={LoginWithOtp} />}
      />
      <Route path="/signUp" element={<WithAuthLayout component={SignUp} />} />
    </Routes>
  );
};
