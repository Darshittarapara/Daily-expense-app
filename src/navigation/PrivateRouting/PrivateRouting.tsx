import React from 'react'
import { Route, Routes } from 'react-router'
import { DashBoard } from 'screen/DashBoard/DashBoard';
import AuthLayOut from "layout/AuthLayout/AuthLayout";
import CategoryForm from 'screen/Category/Add'
import ViewCategory from 'screen/Category/View/View';
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
            {!isLoading && <Route
                path="/category/:id/view"
                element={<AuthLayOut component={ViewCategory} />}
            />}

            <Route
                path="/category"
                element={<AuthLayOut component={CategoryList} />}
            />
        </Routes>


    )
}

export default PrivateRouting