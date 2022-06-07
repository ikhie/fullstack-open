import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState('notification')



  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUserName('')
      setPassword('')
    }catch (exception){
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if(loggedUser){
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const addNewBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()

    try{
      blogService.create(newBlog).then((returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification('notification')
        setErrorMessage(`Created new blog ${returnedBlog.title}`)
      }))
    }catch(exception){
      setNotification('error')
      setErrorMessage(`failed to create a new blog: tatus ${exception.response.status}`)
    }

    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)

  }

  const removeBlog = (id) => {
    const blog = blogs.find(n => n.id === id).title
    const confirm = window.confirm(`Delete ${blog}?`)
    if(confirm){
      blogService.deleteBlog(id).then(() => {
        let blogsCopy = [...blogs]
        blogsCopy.splice(blogsCopy.indexOf(blog), 1)
        setBlogs(blogsCopy)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const updateBlog = (newBlog, id) => {
    blogService.update(newBlog, id).then((updatedBlog => {
      setBlogs(blogs.map(blog => blog.id !== id ? blog : updatedBlog))
    }))
  }

  const loginForm = () => (
    <div>
      <LoginForm
        handleLogin={handleLogin}
        handlePasswordChange={({ target }) => {setPassword(target.value)}}
        handleUserNameChange={({ target }) => {setUserName(target.value)}}
        username={username}
        password={password}/>
    </div>
  )

  const logoutButton = () => (
    <div>
      <button type="button" onClick={handleLogout}>Logout</button>
    </div>
  )

  const blogList = () => (
    <div>
      <div><p>{user.name}</p>{logoutButton()}</div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addNewBlog}/>
      </Togglable>

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
      )}
    </div>
  )

  return (
    <div>
      <Notification message={errorMessage} error={notification}/>
      {user === null ? loginForm() :  blogList()}
    </div>
  )
}

export default App