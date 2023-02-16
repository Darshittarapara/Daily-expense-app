import React, { useEffect, Fragment } from 'react';
import './Input.css';

const Input = (props) => {
    const { type,
        name, placeHolder, className, id, formilk, value } = props;

    return (
        <Fragment>
            <label htmlFor={name}>{placeHolder}</label>
            <input
                type={type}
                id={id}
                autoComplete="off"
                className={className + " form-control"}
                name={name}
                placeholder={props.placeholder}
                {...formilk.getFieldProps(name)}
                value={value}
            />
        </Fragment>

    )
};

export default Input;