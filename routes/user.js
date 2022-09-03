/* Now that we are done with all the required functionally 

  we hvae to create routes for our users and for that we have 
  2 files inside the routes diretory namely 

*/ 

const express = require('express')
const router = express.Router()

const { getUser } = require('../controllers/user')
const { accessTokenValidator } = require('../middlewares/auth')
// accessToken validator middleware

router.get('/info', accessTokenValidator, getUser)

module.exports = router