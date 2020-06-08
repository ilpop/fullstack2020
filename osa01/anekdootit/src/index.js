import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Anekdootti = ({ text, votes }) => {
  return (
    <div>
      <div> {text}</div>
      <div> {votes}</div>     
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick = {handleClick}> {text}</button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(0)
  const [mostVotes, setMostVotes] = useState(0)
 
  const next = () => {
  let random = Math.floor(Math.random() * anecdotes.length)
  while (random === selected) {
    random = Math.floor(Math.random() * anecdotes.length)
  }
  setSelected(random)

}

const vote = () => {
  const selectedVoteCount = votes[selected] || 0
  setVotes({...votes, [selected]: selectedVoteCount +1})


  if(!votes[mostVotes] || selectedVoteCount +1 > votes[mostVotes]) {
  setMostVotes([selected])
  }

}

;

    if (votes[mostVotes] > 0){ return (
      <div>
      <h2> Anecdote of the day: </h2>
      <Anekdootti text={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick = {next} text='next anecdote'/>
      <Button handleClick={vote} text='vote this anecdote'/>
      <h3>Anecdote with the most votes: </h3>
     <Anekdootti text={anecdotes[mostVotes]} votes={votes[mostVotes]}/>
     </div>
      )
}

  return(

    <div>
      <h2> Anecdote of the day: </h2>
      <Anekdootti text={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick = {next} text='next anecdote'/>
      <Button handleClick={vote} text='vote this anecdote'/>
      </div>

  )

  
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App />, document.getElementById('root'));
