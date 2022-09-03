/* 
 we need a middleware that will check if the user requesting a protected route has a 
  valid JWT token .
 So let's create a file named auth.js in our middleware directory and withing that , we 
  will have a function named accessTokenValidator which as the name suggests checks for 
  token validity and return an error in case the token is not a valid one 

*/ 

require ('dotenv').config() 

const _getKeyValue = require('lodash/get') 
const creatError = require('http-errors')

const { verifyJwtToken } = require('../utilities/jwt'); 

module.exports = { 

    accessTokenValidator: async (req, res, next) =>  { 

          try { 
            let token = null 
            console.log("Inside accessTokenValidator ")
            token = _getKeyValue(req.headers, 'authorization', null) 
            token = _getKeyValue(req.headers, 'Authorization', null) 
            console.log("token headers : "+req.headers)
            console.log("token headers : "+JSON.stringify(req.headers))
            token = req.header.authorization;

            console.log("token : "+token)
            token = req.header.Authorization;
            
            console.log("token : "+token)
            token = req.headers.authorization;
            
            console.log("token : "+token)
            if (!token) throw creatError.Unauthorized() 
             
            token = token.split(' ')[1] 
            req.payload = await verifyJwtToken({
                   token, secret : process.env.JWT_ACCESS_TOKEN_SECRET }) 

            next() 
          } 
          catch (error ) {
               next(error) 
            }  

     } 

} 

