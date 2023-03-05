import React, { Fragment } from 'react';
import { TextAreaProps } from 'Modal/Modal';
const TextArea: React.FC<TextAreaProps> = (props) => {
    const {
        name,
        placeHolder,
        className,
        id,
        formilk,
        value
    } = props;

    return (
        <Fragment>
            <label htmlFor={name}>{placeHolder}</label>
            <textarea id={id}
                cols={7}
                rows={3}
                placeholder={placeHolder}
                className={className + " form-control"}
                {...formilk.getFieldProps(name)}
                value={value}
            >
            </textarea>
        </Fragment>

    )
};

export default TextArea;