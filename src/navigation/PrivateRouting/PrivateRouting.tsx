import React, { Fragment } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { DashBoard } from 'screen/DashBoard/DashBoard';
import AuthLayOut from "layout/AuthLayout/AuthLayout";
import CategoryForm from 'screen/Category/Add'
import CategoryList from 'screen/Category/List/List'
import { useAuthContext } from 'context/AuthContext/AuthContext';
import { Loader } from 'components/Loader/Loader';
const PrivateRouting = () => {
    const { isLoading } = useAuthContext();
    console.log(isLoading)
    return (
        <Routes>
            {isLoading && <Route path="/" element={<Loader />} />}
            {!isLoading && <Route path="/" element={<AuthLayOut component={DashBoard} />} />}

            <Route path="/dashboard" element={<AuthLayOut component={DashBoard} />} />
            <Route
                path="/category/add"
                element={<AuthLayOut component={CategoryForm} />}
            />
            <Route
                path="/category"
                element={<AuthLayOut component={CategoryList} />}
            />
        </Routes>


    )
}

export default PrivateRouting