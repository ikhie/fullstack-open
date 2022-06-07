import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = (props) => {

  const [newName, setNewName] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  const addNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newName,
      author: newAuthor,
      url: newURL
    }

    props.createBlog(newBlog)
    setNewName('')
    setNewAuthor('')
    setNewURL('')
  }


  return(
    <form>
      <div>
        <h2>create new</h2>
        title: <input value={newName} placeholder='blog name' onChange={handleNameChange}/>
      </div>
      <div>
        author: <input value={newAuthor} placeholder='blog author' onChange={handleAuthorChange}/>
      </div>
      <div>
        url: <input value={newURL} placeholder='blog url' onChange={handleURLChange}/>
      </div>
      <div>
        <button type="submit" onClick={addNewBlog}>create</button>
      </div>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm