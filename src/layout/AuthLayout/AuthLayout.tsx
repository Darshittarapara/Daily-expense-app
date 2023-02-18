import React, { Fragment } from 'react'
import MainHeader from 'components/MainHeader/MainHeader';
import { LayOutProps } from '../../Modal/Modal'
import { SideBar } from 'components/SideBar/SideBar'
import './AuthLayout.scss';
import { useUserContext } from 'context/UserContext/UserContext';
import { Loader } from 'components/Loader/Loader';

export const AuthLayout: React.FC<LayOutProps> = ({
    component: Component
}) => {
    const { isLoading } = useUserContext()
    return (
        <div>
            <Fragment>
                {isLoading ? <div className='loader'><Loader /></div> : (
                    <Fragment>
                        <MainHeader name='tester' url='' />
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-md-3 col-lg-3 col-xl-3 col-3'>
                                    <SideBar />
                                </div>
                                <div className='col-12 col-md-9 col-xl-9 col-lg-9'>
                                    <Component />
                                </div>
                            </div>


                        </div>
                    </Fragment>
                )}


            </Fragment>


        </div>
    )
}

export default AuthLayout