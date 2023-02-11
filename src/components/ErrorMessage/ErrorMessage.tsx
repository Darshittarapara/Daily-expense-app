import { ErrorMessageProps } from '../../Modal/Modal';
import React from "react";
import './ErrorMessage.css';

export const ErrorMessage: React.FC<ErrorMessageProps> = (props) => {
    return (
        <div className='error'>
            <p>
                {props.message}
            </p>
        </div>
    )
}