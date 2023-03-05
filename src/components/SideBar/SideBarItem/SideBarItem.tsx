import React from 'react';
import { SideBarItemProps } from 'Modal/Modal';

import { useNavigate } from 'react-router-dom';

import './SideBarItem.scss';
import { capiltalLetter } from 'helper/helper';
const SideBarItem: React.FC<SideBarItemProps> = ({ title, icon, path, onToggle }) => {
    const navigator = useNavigate()
    const navigateHandler = () => {
        navigator(path!);
        onToggle!();
    }

    return (
        <li className="nav-list">
            <div className='sidebar-item' onClick={navigateHandler}>
                <div className='sidebar-title'>
                    <span>{capiltalLetter(title)}</span>
                </div>
            </div>
        </li>
    )
}

export default SideBarItem;