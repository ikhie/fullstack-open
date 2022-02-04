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

const mapByAuthor = (blogs) => {
    let mapByAuthor = new Map()

    blogs.map(blog => {
        let tempArray = []
        if(mapByAuthor.has(blog.author)){
            tempArray = mapByAuthor.get(blog.author)
            tempArray.push(blog)
            mapByAuthor.set(blog.author, tempArray)
        }else{
            tempArray.push(blog)
            mapByAuthor.set(blog.author, tempArray)
        }
    })

    return mapByAuthor
}

const mostLikes = (blogs) => {

    const blogsByAuthor = mapByAuthor(blogs)
    let mostLikes = {
        author: '', 
        likes: 0
    }

    blogsByAuthor.forEach((blogs, author) => {
        const total = totalLikes(blogs)
        if(mostLikes.likes <= total){
            mostLikes.author = author
            mostLikes.likes = total
        }
    })

    return mostLikes
}


const mostBlogs = (blogs) => {

    let mostBlogs = {
        author: '',
        blogs: 0
    }

    const sorted = mapByAuthor(blogs)

    sorted.forEach((blogs, author) => {
        if(blogs.length > mostBlogs.blogs){
            mostBlogs.author = author
            mostBlogs.blogs = blogs.length
        }
    })


    return mostBlogs 
}




module.exports = {
    favoriteBlog,
    dummy,
    totalLikes,
    mostBlogs,
    mostLikes
}