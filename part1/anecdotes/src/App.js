import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  let anecdote_count = anecdotes.length + 1
  const [votes, setVotes] = useState(new Array(anecdote_count).fill(0))
  let top_vote = 0
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[top_vote]) {
      top_vote = i
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      has {votes[selected]} votes<br></br>
      <Button handleClick={() => setVotes(addVote(votes, selected))} text="vote" />
      <Button handleClick={() => setSelected(getRandomInt(0, anecdotes.length))} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      {anecdotes[top_vote]}<br></br>
      has {votes[top_vote]} votes<br></br>
    </div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}


const addVote = (votes, vote) => {
    let copy = [...votes]
    copy[vote] += 1
    return copy
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export default App
