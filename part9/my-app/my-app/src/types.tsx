export interface HeaderProps {
    courseName: string;
}

export interface TotalProps {
    amount: number;
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
}
  
interface CoursePartBaseWithDescription extends CoursePartBase {
    description: string;
}
  
interface CoursePartOne extends CoursePartBaseWithDescription  {
    name: "Fundamentals";
}
  
interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}
  
interface CoursePartThree extends CoursePartBaseWithDescription {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBaseWithDescription {
    name: "Typescript and React";
    studentOpinion: string;
}
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

export interface ContentProps {
    courseParts: Array<CoursePart>;
}
  