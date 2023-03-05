import React, { Fragment, useState } from 'react';
import { logo } from 'context/AuthContext/AuthContext';
import './SideBar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSignOut } from '@fortawesome/free-solid-svg-icons';
import SideBarItem from './SideBarItem/SideBarItem';
import SideBarSubItem from './SideBarSubItem/SideBarSubItem';
const sidebarList = {
    dashBoard: {
        title: "dashboard",
        path: "/dashboard",
        icon: faSignOut
    },
    income: [
        {
            title: "income",
            path: "/incomes",
            icon: faSignOut
        },
        {
            title: "Add income",
            path: "/incomes/add",
            icon: faSignOut
        },

    ],
    expense: [
        {
            title: "expense",
            path: "/expense",
            icon: faSignOut
        },
        {
            title: "Add expense",
            path: "/expense/add",
            icon: faSignOut
        },
    ],
    category: [
        {
            title: "Category",
            path: "/category",
            icon: faSignOut
        },
        {
            title: "Add category",
            path: "/category/add",
            icon: faSignOut
        },
    ],

}
export const SideBar = () => {
    const [isShowSideBar, setIsShowSideBar] = useState<boolean>(false)

    const toggleSideBar = () => {
        setIsShowSideBar((preViewState) => !preViewState);
    }

    return (
        <Fragment>
            <div id='menu-bar'>
                {
                    isShowSideBar ? (
                        <div className='close-sidebar'>
                            <FontAwesomeIcon icon={faClose} className='close-icon' onClick={toggleSideBar} />
                        </div>
                    ) : <div onClick={() => toggleSideBar()}>
                        <div id="first-line" />
                        <div id="middle-line" />
                        <div id='botton-line' />
                    </div>
                }

            </div>

            <div className={isShowSideBar ? 'show-sidebar-container sidebar-container' : 'sidebar-container'}>
                <div className='profile'>

                    <img src={logo} alt='logo' />
                </div>
                <div className='divider' />
                <ul className='sidebar-list-item'>
                    {Object.entries(sidebarList).map(([key, value], index) => {
                        return Array.isArray(value) ? (
                            <SideBarSubItem
                                onToggle={toggleSideBar}
                                key={`${index}`}
                                list={value}
                                label={key} />) :
                            (
                                <SideBarItem
                                    onToggle={toggleSideBar}
                                    key={`${index}`}
                                    title={value.title}
                                    icon={value.icon}
                                    path={value.path} />
                            )

                    })}
                </ul>
                <div className='divider' />

            </div>

        </Fragment>

    )
}