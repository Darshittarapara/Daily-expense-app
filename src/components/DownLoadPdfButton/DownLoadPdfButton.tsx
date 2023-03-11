import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Strings } from 'resource/Strings';
import './DownLoadPdfButton.scss';
interface DownLoadPdfButtonProps {
    onDownload: () => void
};

export const DownLoadPdfButton: React.FC<DownLoadPdfButtonProps> = ({
    onDownload
}) => {
    return <div className='download-pdf-container' onClick={() => onDownload()}>

        <button type='button' className='btn btn-danger'>
            <FontAwesomeIcon icon={faDownload} /> {Strings.downloadPdf}
        </button>
    </div>
}