import React from 'react';
import { TotalProps } from '../types';

const Total: React.FC<TotalProps> = ({amount}) => {
    return <p>Number of exercises: {amount}</p>;
}

export default Total;