import React from 'react';
import { logo } from 'context/AuthContext/AuthContext';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import { clearStorage } from 'helper/Storage';
import Button from 'components/Button/Button';
export const SideBar = () => {


    const logOutHandler = () => {
        clearStorage();
        window.location.reload();
    };

    return (
        <div className='sidebar-container'>
            <div className='profile'>
                <img src="https://images.hivisasa.com/1200/It9Rrm02rE20.jpg" alt='profile' />
                <h3>Tester</h3>
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
            <div className='logout'>
                <Button classes="btn btn-light" type="button" onClick={() => logOutHandler()}>Log out</Button>
            </div>
        </div>
    )
}