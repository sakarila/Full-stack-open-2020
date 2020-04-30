const _ = require('lodash')

const dummy = (blogs) => {
    const value = 1
    return value 
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const maxLikes = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
    return maxLikes
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let blogPosts = _(blogs).groupBy('author').map((objects, author) => {
        return {
            'author': author,
            'blogs': objects.length
        }
    }).value();

    const maxBlogs = blogPosts.reduce((prev, current) => {
        return (prev.blogs > current.blogs) ? prev : current
    })
    return maxBlogs
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let likes = _(blogs).groupBy('author').map((objects, author) => {
        return {
        'author': author,
        'likes': _.sumBy(objects, 'likes')
        }
    }).value();

    const maxLikes = likes.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })

    return maxLikes
}
  
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}