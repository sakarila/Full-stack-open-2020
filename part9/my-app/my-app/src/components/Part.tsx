import React from 'react';
import { CoursePart  } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part: React.FC<CoursePart> = (coursePart) => {
    console.log(coursePart);
    switch (coursePart.name) {
        case "Deeper type usage":
            console.log(coursePart.name);
            return (
                <div>
                    <p>{coursePart.name} {coursePart.description} {coursePart.exerciseCount}</p>
                </div>
            )
        case "Fundamentals":
            console.log(coursePart.name);
            return (
                <div>
                    <p>{coursePart.name} {coursePart.description} {coursePart.exerciseCount}</p>
                </div>
            )
        case "Using props to pass data":
            console.log(coursePart.name)
            return (
                <div>
                    <p>{coursePart.name} {coursePart.exerciseCount} {coursePart.groupProjectCount}</p>
                </div>
            )
        case "Typescript and React":
            return (
                <div>
                    <p>{coursePart.name} {coursePart.description} {coursePart.exerciseCount} {coursePart.studentOpinion}</p>
                </div>
            )
        default:
            return assertNever(coursePart)
    }
};

export default Part;