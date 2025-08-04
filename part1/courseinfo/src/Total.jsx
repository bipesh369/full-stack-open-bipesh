import React from 'react'

function Total({ parts }) {
  const total = parts[0].exercises + parts[1].exercises + parts[2].exercises

  return <p><strong>Total: {total} exercises</strong></p>
}

export default Total
