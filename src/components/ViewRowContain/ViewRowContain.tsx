import ContentTitle from 'components/ContentTitle/ContentTitle'
import { ViewRowContainProps } from 'Modal/Modal'
import React from 'react'

export const ViewRowContain: React.FC<ViewRowContainProps> = (props) => {
    return (
        <div className='row'>
            <div className='col-md-4 col-lg-4 col-xl-4 col-6'>
                <ContentTitle title={props.label} />
            </div>
            <div className='col-md-4 col-lg-4 col-xl-4 col-6'>
                {props.value.includes("http") ? <img src={props.value} alt='icon' /> : <ContentTitle title={props.value} />}

            </div>

        </div>
    )
}
