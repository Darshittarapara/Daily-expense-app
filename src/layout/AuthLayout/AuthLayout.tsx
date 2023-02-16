import React, { Fragment } from 'react'
import MainHeader from 'components/MainHeader/MainHeader'
import { LayOutProps } from '../../Modal/Modal'
import { SideBar } from 'components/SideBar/SideBar'
import './AuthLayout.scss';

export const AuthLayout: React.FC<LayOutProps> = ({
    component: Component
}) => {

    return (
        <div>
            <Fragment>
                {/* <MainHeader /> */}
                <div className='main'>
                    <div className='main-sidebar'>
                        <SideBar />
                    </div>
                    <div className='main-sidebar'>
                        <Component />
                    </div>

                </div>

            </Fragment>


        </div>
    )
}

export default AuthLayout