import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const StatisticsLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}



const Statistics = ( {good, neutral, bad} ) => {
   const all = good + bad + neutral

   if (all < 1) {
     return (
       <div>
         <h2>statistics:</h2>
         no feedback given
       </div>
     )

   }


   return (
   
   <div> 
         <h2>statistics: </h2>
         <table>
           <tbody>
             <StatisticsLine text='good' value={good}/>
             <StatisticsLine text='neutral' value={neutral}/>
             <StatisticsLine text='bad' value={bad}/>
             <StatisticsLine text='all' value={all}/>
             <StatisticsLine text='average' value={(good-bad)/all}/>
             <StatisticsLine text='positive' value={good/all *100 +'%'}/>
           </tbody>
         </table>
     </div>

    )

  }

const Button =({handleClick, text}) => (
   <button onClick = {handleClick}> 
   {text} </button>
)

const App = (props) => {
  const [good, setGood] = useState(0)
  const increaseGood = () => setGood(good +1)
  const[neutral, setNeutral] = useState(0)
  const increaseNeutral = () => setNeutral(neutral +1)
  const[bad, setBad] = useState(0)
  const increaseBad = () => setBad(bad +1)

  return (
  
  <div>
    <h1>Give Feedback</h1>

    <Button handleClick={increaseGood}
    text='good'
    />
    <Button handleClick={increaseNeutral}
    text='neutral'
    />
    <Button handleClick={increaseBad}
    text='bad'
    />

    <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>

  )
}


ReactDOM.render( <App />,document.getElementById('root'));
