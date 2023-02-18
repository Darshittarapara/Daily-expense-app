import React from 'react'
interface AccountContainProps {
    label: string
    value: string
}
export const AccountContain: React.FC<AccountContainProps> = (props) => {
    return (
        <div className='account-contain'>
            <div className='card-title'>{props.label}</div>
            <div className='card-subtitle'>{props.value}</div>
        </div>
    )
}