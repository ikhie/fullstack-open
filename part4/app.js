const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const url = config.MONGODB_URI

const mongoUrl = url
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => logger.error('error connection to MongoDB:', error ))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
