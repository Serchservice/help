import React from 'react';

const Image = ({ url, alt }) => {
    return (
        <img src={url} alt={alt} style={{ width: "100%" }}/>
    );
};

export default Image;