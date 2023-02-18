import React from 'react';
import { SideBarItemProps } from 'Modal/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { clearStorage } from 'helper/Storage';
import './SideBarItem.scss';
import { capiltalLetter } from 'helper/helper';
const SideBarItem: React.FC<SideBarItemProps> = ({ title, icon, path }) => {
    const navigator = useNavigate()
    const navigateHandler = () => {
        navigator(path!);
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