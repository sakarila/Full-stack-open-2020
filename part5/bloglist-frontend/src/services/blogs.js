import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const updateBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = {
    author: blog.author,
    likes: blog.likes,
    url: blog.url,
    title: blog.title,
    user: blog.user.id
  }


  const response = await axios.put(`${baseUrl}/${blog.id}`, request, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, createNew, setToken, updateBlog, deleteBlog }