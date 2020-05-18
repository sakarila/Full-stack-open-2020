import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    console.log(response.data)
    return response.data
}

const addLike = async (id) => {
    const allAnecdotes = await getAll()
    const anecdote = allAnecdotes.find(x => {
        return x.id === id
    })

    const object = {...anecdote, votes: anecdote.votes + 1}
    const response = await axios.put(`${baseUrl}/${id}`, object)
    return response
}

export default { getAll, createNew, addLike}