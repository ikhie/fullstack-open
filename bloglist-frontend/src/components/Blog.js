import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [expand, setExpand] = useState(false)

  const handleClick = () => {
    setExpand(!expand)
  }

  const updateLikes = () => {

    const user = Object.assign({}, blog.user)
    const newBlog = {
      user: user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    updateBlog(newBlog, blog.id)
  }

  const deleteBlog = () => {
    removeBlog(blog.id)
  }

  const toggleExpand = { display: expand ? '' : 'none' }

  return (
    <div className={'infoText'} style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button onClick={handleClick}>view</button>
      </div>
      <div style={toggleExpand}>
        <div>{blog.url}</div>
        <div>likes: {blog.likes} <button onClick={updateLikes}>like</button></div>
        <div>{blog.name}</div>
        <div><button onClick={deleteBlog}>remove</button></div>
      </div>
    </div>
  )
}

export default Blog