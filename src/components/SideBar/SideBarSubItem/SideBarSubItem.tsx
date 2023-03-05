import React, { Fragment, useState } from 'react';
import { SideBarSubItemProps } from 'Modal/Modal';
import SideBarItem from '../SideBarItem/SideBarItem';
import { capiltalLetter } from 'helper/helper';
import './SideBarSubItem.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const SideBarSubItem: React.FC<SideBarSubItemProps> = (props) => {
    const [isShowSubItem, setIsShowSubItem] = useState<boolean>(false);
    const toggleSubItem = () => {
        setIsShowSubItem((preViewState) => !preViewState);
    }
    return (
        <Fragment>
            <li className='nav-list label' onClick={toggleSubItem}>
                <span>
                    {capiltalLetter(props.label)}
                </span>
                <FontAwesomeIcon icon={isShowSubItem ? faAngleDown : faAngleUp} className="toggle-arrow" />
            </li>
            <div className={isShowSubItem ? 'show-sub-item' : "sub-item"}>
                <ul>
                    {props.list.map((item, index) => <SideBarItem onToggle={() =>props.onToggle()} key={`${index}`} title={item.title} icon={item.icon} path={item.path} />)}
                </ul>

            </div>
        </Fragment>
    )
}

export default SideBarSubItem;