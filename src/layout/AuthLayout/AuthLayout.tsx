import React, { Fragment } from 'react'
// import MainHeader from 'components/MainHeader/MainHeader'
import { LayOutProps } from '../../Modal/Modal'

export const AuthLayout: React.FC<LayOutProps> = ({
    component: Component
}) => {

    return (
        <div>

            <Fragment>
                {/* <MainHeader /> */}
                <Component />
            </Fragment>


        </div>
    )
}

export default AuthLayout