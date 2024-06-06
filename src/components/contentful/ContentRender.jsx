import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import Image from './Image';

// Assuming `content` is the JSON content from Contentful
const ContentRender = ({ content }) => {
    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                const entry = node.data.target.fields;
                if (entry.image) {
                    const url = entry.image.fields.file.url;
                    const alt = entry.image.fields.title || 'Embedded Image';
                    return <Image url={url} alt={alt} />;
                }
                // If not an image, return null to handle other embedded entry types or render them differently
                return null;
            },
            [BLOCKS.UL_LIST]: (_node, children) => {
                return <ul style={{ paddingLeft: '20px' }}>{children}</ul>;
            },
            [BLOCKS.OL_LIST]: (_node, children) => {
                return <ol style={{ paddingLeft: '20px' }}>{children}</ol>;
            },
            [BLOCKS.LIST_ITEM]: (_node, children) => {
                return <li>{children}</li>;
            },
            // Add other renderNode handlers if necessary
        },
    };

    return (documentToReactComponents(content, options));
};

export default ContentRender;