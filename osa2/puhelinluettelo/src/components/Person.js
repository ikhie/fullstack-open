import React from 'react'

const Person = ({name, number, deleteEntry}) => {
    return (
        <li>{name} {number} <button onClick={deleteEntry}>delete</button></li>
    )
}

export default Person