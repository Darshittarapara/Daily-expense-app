import React from 'react'
import { Route, Routes } from 'react-router'
import { DashBoard } from 'screen/DashBoard/DashBoard';
import AuthLayOut from "layout/AuthLayout/AuthLayout";
import CategoryForm from 'screen/Category/Form'
import ViewCategory from 'screen/Category/View/View';
import CategoryList from 'screen/Category/List/List'
import { useAuthContext } from 'context/AuthContext/AuthContext';
import { Loader } from 'components/Loader/Loader';
import IncomeForm from 'screen/Income/Form';
import ViewIncome from 'screen/Income/View/View';
import Incomes from 'screen/Income/List/List';

const PrivateRouting = () => {
    const { isLoading } = useAuthContext();
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
                path="/category/:id/view"
                element={<AuthLayOut component={ViewCategory} />}
            />
            <Route
                path="/category/:id/edit"
                element={<AuthLayOut component={CategoryForm} />}
            />
            <Route
                path="/category"
                element={<AuthLayOut component={CategoryList} />}
            />
            <Route
                path="/income/add"
                element={<AuthLayOut component={IncomeForm} />}
            />
            <Route
                path="/income/:id/view"
                element={<AuthLayOut component={ViewIncome} />}
            />
            <Route
                path="/income/:id/edit"
                element={<AuthLayOut component={IncomeForm} />}
            />
            <Route
                path="/incomes"
                element={<AuthLayOut component={Incomes} />}
            />
        </Routes>
    )
}

export default PrivateRouting