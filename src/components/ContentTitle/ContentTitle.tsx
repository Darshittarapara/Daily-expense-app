import React from 'react';
interface ContentTitleProps {
    title: string
}
const ContentTitle: React.FC<ContentTitleProps> = (props) => {
    return <div className='title'>
        <h4>{props.title}</h4>
    </div>
};

export default ContentTitle;