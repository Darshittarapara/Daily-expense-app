import React from 'react'
import { LayOutProps } from '../../Modal/Modal'
export const WithAuthLayout: React.FC<LayOutProps> = ({
    component: Component
}) => {
    return (
        <div>
            <Component />
        </div>
    )
}

export default WithAuthLayout