const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const emptyList = []

  

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple bolgs equals the likes of them', () => {
    const result = listHelper.totalLikes(helper.initialBlogs)
    expect(result).toBe(36)
  })

  test('when list is empty', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })
})

describe('favourite blog', () => {

  const emptyList = []

  listWithOneBlog = [
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user: "61eac7c1833ca3cb4e8eb612",
      __v: 0
    }
  ]

  

  test('when list has only one blog that is the favourite', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog)
  })

  test('when list has multiple blogs equals one with most likes', () => {
    const result = listHelper.favoriteBlog(helper.initialBlogs)
    expect(result).toEqual(listWithOneBlog)
  })

  test('when list is empty equals empty array', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual([])
  })
})

describe('most blogs', () => {
  test('find author with most blogs', () => {
    const result = listHelper.mostBlogs(helper.initialBlogs)
    expect(result).toEqual({author: 'Robert C. Martin', blogs: 3})
  })

  test('find author with most likes', () => {
    const result =  listHelper.mostLikes(helper.initialBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
