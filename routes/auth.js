
/* Now that we are done with all the required functionality we have 
   to create routes for our users and for that , we have 2 fiels 

   inside the routes directory namely 

  auth.js : handles register/login routes 

  user.js : protected routes that handles retriving user's data 

*/ 



const express = require('express')

const router = express.Router(); 

const { register , login } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login) 

module.exports = router

