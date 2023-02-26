import React from 'react';
interface ContentTitleProps {
    title: string
}
const ContentTitle: React.FC<ContentTitleProps> = (props) => {
    return <div className='title' style={{ display: "inline-block", margin: '5px 5px', fontSize: "20px" }}>
        <h4>{props.title}</h4>
    </div>
};

export default ContentTitle;