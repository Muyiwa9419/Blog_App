const CONFIG = require('./config/config')
const express = require('express')
const joi = require('joi')
const NodeCache = require('node-cache')
const errorHandler = require('./middleware/errorHandler')
const signup = require('./routes/signup')
const login = require('./controllers/login')
const blog = require('./routes/blog')
const schema = require('./controllers/joiSchema')
const cacheMiddleware = require('./middleware/apiFeatures')


const app = express()



const validateRequest = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
        return res.status(400).json({
          status: 'error',
          message: error.details.map(detail => detail.message).join(', '),
        });
      }
      next();
    };
  };
console.log(CONFIG.DATABASE_CONNECT_STRING)
// connect to db
require('./middleware/db')(CONFIG.DATABASE_CONNECT_STRING)

// parse information from request
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/signup', validateRequest(schema), signup)
app.use('/api/login', login)
app.use('/api/blog', blog)


// use error handler middleware
app.use(errorHandler)

module.exports = app