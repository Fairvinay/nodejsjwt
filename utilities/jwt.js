
const jwt = require('jsonwebtoken')
const creatError = require('http-errors')

module.exports = { 

   signJwtToken : (data, { secret , expiresIn} ) => 
        
         { 
            console.log("Inside signJwt Token ")
            console.log("data signJwt Token " , data)
            console.log("secret signJwt Token " , secret)
            console.log("expiresIn signJwt Token " , expiresIn)
            return new Promise((resolve ,reject) => { 
              const options = { 
                         expiresIn :'1m'
                  }
              jwt.sign(data, secret, options , (err, token) => 
                        {  
                          if(err) return reject(creatError.InternalServerError()) 
                          resolve(token) 

                     })
            })
         }, 

     // verify tokens  
     
     verifyJwtToken: ({ token, secret} ) => { 
        console.log("Inside verifyJwtToken Token ") 
           return new Promise((resolve, reject) => { 
                jwt.verify(token, secret, (err, payload) => 
                   { 
                     if(err) { 
                        const message = err.name ==='TokenExpiredError' ? err.message: 'Unauthorized'
                        return reject(createError.NotAcceptable(message))
                     }
                     resolve(payload) 
                 })
             })
         } 
  } 


 