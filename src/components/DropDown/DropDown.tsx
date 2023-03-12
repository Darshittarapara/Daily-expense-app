import { DropDownProps } from 'Modal/Modal';
import React from 'react';
import './DropDown.scss';
export const DropDown: React.FC<DropDownProps> = ({
    children,
    id,
    menuTitle
}) => {

    return (
        <div className={`dropdown dropdown-container`}>
            <button className="btn btn-light dropdown-toggle" type="button" id={id} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                {menuTitle}
            </button>
            <div className={`dropdown-menu`} aria-labelledby={id}>
                {children}
            </div>
        </div>
    )
}