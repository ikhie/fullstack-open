import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const response = axios.get(baseUrl)
  return response.then(response => response.data)
}

const create = async newBlog => {
  const response = await axios.post(baseUrl, newBlog, { headers: { 'Authorization': token } })
  return response.data
}

const update = async (newObject, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject, { headers: { 'Authorization': token } })
  return response.data
}

const deleteBlog = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': token } })
  return response.status
}


export default { getAll, setToken, create, update, deleteBlog }