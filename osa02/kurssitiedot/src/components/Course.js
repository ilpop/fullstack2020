import React from 'react'

const Course = ({ course }) => {

    return (
      <div>
        <ul>
          {course.map((course, i) =>
            <Header key={course.id} course={course}/>
            )}
        </ul>
        
      </div>
    )
  }
  
  const Header = (props) => {
      return (
        <div>
          <li>
            <h1>{props.course.name}</h1>
            <Content key={props.course.id} course={props.course}/>
            </li>
            <Total parts = {props.course.parts} />
            </div>
            )
          }
  
    const Content = ({ course }) => {
      return(
      <div>
        <ul>
          {course.parts.map((part, i) =>
           <Part key={part.id} part={part} />
           )}
        </ul>
      </div>
      )
    }
    
    const Part = ({ part }) => {
      
      console.log('propsit: ', part)
      
      return (
      <li>
        {part.name}:  {part.exercises}
      </li>  
      )
    }
  
    const Total = ({ parts } ) => {
      const sum = parts.map(part => part.exercises).reduce(
        (f,s) => console.log('what is happening here?' ,f,s) ||
          f + s)
    
      return ( 
          <p>
            <strong> 
              total of: {sum} exercises.
            </strong>
          </p>
      )
    }

    export default Course
