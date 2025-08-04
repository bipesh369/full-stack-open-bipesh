import React from 'react'

function Statistics({ good, neutral, bad }) {
  const total = good + neutral + bad
  const average = total === 0 ? 0 : ((good - bad) / total).toFixed(3)

  if (total === 0)
    return <p>No feedback given</p>

  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Average: {average}</p>
    </>
  )
}

export default Statistics
