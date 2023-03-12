import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.scss';
export const PageNotFound = () => {
    const navigator = useNavigate();
    return (
        <div className='error-wrapper'>
            <div className='error-container'>
                <div className='error-block'>
                    <h1 className='error-heading'>404</h1>
                    <div className="info">
                        <h2 className='error-info-title'>We can't find that page</h2>
                        <p className='error-info-description'>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p>
                        <button className='home-navigate-btn' type="button" onClick={() => navigator('/')}>Home</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
