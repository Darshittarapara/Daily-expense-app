import { capiltalLetter } from 'helper/helper'
import React from 'react'

interface SelectInputProp {
    options: string[]
    onChange: (value: string) => void
    className?: string
    value: string
    name: string
}
export const SelectInput: React.FC<SelectInputProp> = (props) => {
    const classes = props.className ? `form-control ${props.className}` : "form-control"
    return (
        <select value={props.value} onChange={(e: React.BaseSyntheticEvent) => props.onChange(e.target.value)} className={classes} name={props.name}>
            {props.options.map((option) => {
                return <option key={option} value={option} >{capiltalLetter(option)}</option>
            })}
        </select>
    )
}