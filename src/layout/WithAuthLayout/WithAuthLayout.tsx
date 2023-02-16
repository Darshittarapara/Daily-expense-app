import React from 'react'
import { LayOutProps } from '../../Modal/Modal'
import './WithAuthLayout.css';
export const WithAuthLayout: React.FC<LayOutProps> = ({
    component: Component
}) => {
    return (
        <div className='auth container-fluid'>
            <Component />
        </div>
    )
}

export default WithAuthLayout