import React from 'react'

const Header = (props) => {
    return(
        <>
        <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {

    return(
        <div>
        {props.parts.map(value => <Part key={value.id} part={value.name} exercises={value.exercises} />)}
        </div>
    )
}

const Part = (props) => {
    return(
        <>
        <p>{props.part} {props.exercises}</p> 
        </>
    )
}

const Total = (props) => {

    const total = props.parts.reduce((s, p) => {
        return isNaN(s.exercises) ? s + p.exercises : s.exercises + p.exercises
    })

    return(
        <>
        <p><strong>total of {total} exercises</strong></p>
        </>
    )
}

const Course = ({course}) => {
    return(
      <div>
        <Header course={course.name}/>
        <Content 
          parts={course.parts} />
        <Total parts={course.parts}/>
      </div>
    )
}

export default Course