import React from 'react';

const sumExercises = (parts) => {
  return parts.reduce( (a, b) => {
    return a + b['exercises'];
}, 0);
}

const Total = ({ total }) => {
  return(
    <p><b>total of {total} exercises</b></p>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Header = ({ text }) => {
  return (
    <h1>{text}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />)}
        <Total total={sumExercises(parts)} />
    </div>
  )
}

const Course = ( { courses } ) => {
  return (
    <div>
      {courses.map(course => 
        <div key={course.id}>
          <Header text = {course.name} />
          <Content parts = {course.parts} />
        </div>
      )}
    </div>
  )
}

export default Course;