const User = require('../models/user')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: "61eac7c1833ca3cb4e8eb612",
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: "61eac7c1833ca3cb4e8eb612",
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    user: "61eac7c1833ca3cb4e8eb612",
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    user: "61eac7c1833ca3cb4e8eb612",
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    user: "61eac7c1833ca3cb4e8eb612",
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    user: "61eac7c1833ca3cb4e8eb612",
    __v: 0
  }  
]

const oneBlog = {
  _id: '5a4b54a676234dba7ba77623',
  title: 'This is a blog',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 2,
  __v: 0
}

const users = [
  {
    username: "hellas",
    name: "Arto Hellas",
    password: 'salasana1234545',
  },
  {
    username: "mallas",
    name: "Esko Mattila",
    password: 'salasana1134235'
  },
  {
    username: "kaira",
    name: "Timo S??rj??k??s",
    password: 'salasana5678567'
  },
  {
    username: "kokis",
    name: "Kettu Kettunen",
    password: 'salasana54321'
}
]

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs,
  oneBlog,
  usersInDb,
  users
}
