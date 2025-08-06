import React from 'react'

// Header component
const Header = ({ name }) => <h2>{name}</h2>

// Part component
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

// Content component
const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
)

// Total component
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <strong>Total of {total} exercises</strong>
}

// Main Course component
const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
)

export default Course
