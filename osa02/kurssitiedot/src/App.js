import React from 'react';
import Course from './components/Course'

function App( {courses} ) {
  return (
    
      <div>
        <Course course={courses}/>
      </div>
      )
    }


export default App;
