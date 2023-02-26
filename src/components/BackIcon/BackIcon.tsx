import React from 'react'
import { BackIconProps } from 'Modal/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router'
import './BackIcon.scss';
const BackIcon: React.FC<BackIconProps> = ({ path }) => {
    const navigator = useNavigate();
    return (
        <div className='backIcon-container'>
            <FontAwesomeIcon icon={faArrowLeft} onClick={() => navigator(path)} />
        </div>
    )
}

export default BackIcon