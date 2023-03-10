import React from 'react';
import './Loader.scss';
import { LoaderProps } from 'Modal/Modal';
export const Loader: React.FC<LoaderProps> = ({ className }) => {

    return (
        <div className={`loading ${className || ""}`} ></div >
    )
}