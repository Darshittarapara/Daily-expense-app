import React, { Fragment } from 'react'
import MainHeader from 'components/MainHeader/MainHeader';
import { LayOutProps } from '../../Modal/Modal'
import { SideBar } from 'components/SideBar/SideBar'
import './AuthLayout.scss';
import { useUserContext } from 'context/UserContext/UserContext';
import { Loader } from 'components/Loader/Loader';
import Card from 'components/UI/Card';
import { useLocation } from 'react-router-dom';
export const AuthLayout: React.FC<LayOutProps> = ({
    component: Component
}) => {
    const { isLoading } = useUserContext();
    
    return (
            <Fragment>
                {isLoading ? <div className='loader'><Loader /></div> : (
                    <Fragment>
                        <MainHeader name='tester' url='' />
                            <div className='row' >
                                <div className='col-md-3 col-lg-3 col-xl-3 col-3'>
                                    <SideBar />
                                </div>
                                <div className='col-12 col-md-9 col-xl-9 col-lg-9 screen-container'>
                                    <Component /> 
                                </div>
                            </div>
                        
                    </Fragment>
                )}
            </Fragment>
    )
}

export default AuthLayout