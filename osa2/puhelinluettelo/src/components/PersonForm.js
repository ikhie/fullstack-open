import React from 'react'

const PersonForm = (props) => {

    return(
        <form>
            <div>
                <h2>add a new</h2>
                name: <input value={props.newName} onChange={props.handleNameChange}/>
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
            </div>
            <div>
                <button type="submit" onClick={props.addPerson}>Add</button>
            </div>
        </form>    
    )
    
}

export default PersonForm