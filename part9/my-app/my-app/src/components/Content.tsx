import React from 'react';
import Part from './Part';
import { ContentProps } from '../types';

const Content: React.FC<ContentProps> = ({courseParts}) => {
    return (
        <div>
            {courseParts.map(part => {
                return <Part key={part.name} {...part} /> 
            })}
        </div>
    )
};

export default Content;