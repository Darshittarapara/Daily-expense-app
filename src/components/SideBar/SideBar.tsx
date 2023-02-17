import React, { Fragment, useState } from 'react';
import { logo } from 'context/AuthContext/AuthContext';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import { clearStorage } from 'helper/Storage';
import Button from 'components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

export const SideBar = () => {
    const [isShowSideBar, setIsShowSideBar] = useState<boolean>(false)

    const logOutHandler = () => {
        clearStorage();
        window.location.reload();
    };
    const toggleSideBar = () => {
        setIsShowSideBar((preViewState) => !preViewState);
    }
    return (
        <Fragment>
            <div id='menu-bar' onClick={() => toggleSideBar()}>
                <div id="first-line" />
                <div id="middle-line" />
                <div id='botton-line' />
            </div>
            <div className={isShowSideBar ? ' show-sidebar-container sidebar-container' : 'sidebar-container'}>
                <div className='profile'>
                    <div className='close-sidebar'>
                        <FontAwesomeIcon icon={faClose} className='close-icon' onClick={toggleSideBar} />
                    </div>
                    <img src={logo} alt='logo' />
                </div>
                <div className='divider' />
                <ul className='sidebar-list-item'>
                    <li className="nav-list">
                        <NavLink to='/' className='nav-link'>Profile</NavLink>
                    </li>
                    <li className="nav-list">
                        <NavLink to='/' className='nav-link'>Dashboard</NavLink>
                    </li>
                    <li className="nav-list">
                        <NavLink to='/' className='nav-link'>Income</NavLink>
                    </li>
                    <li className="nav-list">
                        <NavLink to='/' className='nav-link'>
                            Add Income
                        </NavLink>
                    </li>
                    <li className="nav-list">
                        <NavLink to='/' className='nav-link'>
                            Expense
                        </NavLink>
                    </li>
                    <li className="nav-list">
                        <NavLink to='/' className='nav-link'>
                            Add expense
                        </NavLink>
                    </li>
                </ul>
                <div className='divider' />
                <div className='logout'>
                    <Button classes="btn btn-outline-danger" type="button" onClick={() => logOutHandler()}>Log out</Button>
                </div>
            </div>
        </Fragment>

    )
}