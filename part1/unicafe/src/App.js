import { useState } from 'react'

const App = () => {
  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let total = good + neutral + bad
  let average = (good - bad)/total
  let positive = (good/total) * 100 + " %"

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive} />
    </div>
  )
}

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  return (
    <table>
      <tbody>
        <tr><StatisticsLine text="good" value={props.good} /></tr>  
        <tr><StatisticsLine text="neutral" value={props.neutral} /></tr>
        <tr><StatisticsLine text="bad" value={props.bad} /></tr>
        <tr><StatisticsLine text="average" value={props.average} /></tr>
        <tr><StatisticsLine text="positive" value={props.positive} /></tr>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}
const StatisticsLine = (props) => {
  return (
    <>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </>
  )
}

export default App