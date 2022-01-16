const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const max = blogs.reduce((max, item) => {
        return Math.max(max, item.likes)
    }, 0)
    return blogs.length === 0 ? [] : [blogs.find((item) => item.likes === max)]
}


module.exports = {
    favoriteBlog,
    dummy,
    totalLikes
}