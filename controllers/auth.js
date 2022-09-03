const { v4: uuid} = require('uuid')
const creatError = require('http-errors')

const JSONdb = require('simple-json-db')

const db = new JSONdb(process.env.JSON_DB_PATH, { asyncWrite: true })

const { signJwtToken } = require('../utilities/jwt')

/** 
 * Access token delivery handler 
 */

const tokenHandler = async (user) => { 
   try { 
          // generate token 
         const accessToken = await signJwtToken(user, 
                  { secret: process.env.JWT_ACCESS_TOKEN_SECRET, 
                    expriesIn: process.env.JWT_EXPIRY
                 })
         return Promise.resolve(accessToken)
    }
    catch(error) 
    { 
       return Promise.reject(error)
    } 
}

// handles register 
exports.register = async(req, res, next) => { 
  try { 
   console.log("Inside Register function ")
    const { email , password } = req.body 
    // this is just a demo code and not for prod 
    db.set(email, JSON.stringify({id: uuid(), username: `Demo username ${uuid()}`, password }))
    res.status(201) 
    res.send('Account created successfully') 
   }
   catch (error) 
    { 
      next(error) 
   } 
}
// handles login 

exports.login = async(req,res, next) => { 
   try { 
    const { email , password } = req.body 
    const userData = db.get(email) 
    if(!userData) throw creatError.NotFound() 
   
    const { id, username , password: dbPassword } = JSON.parse(userData);
    console.log(" /login user Data userame , id ", JSON.stringify(username ) +' '
                     + JSON.stringify(id ))
    if(!(id && (password === dbPassword))) throw creatError.Unauthorized()

    const token = await tokenHandler({ id, username, email }) 
    
    res.send(token) 
   
   } catch(error) 
    { 
      next(error) 
    } 
 } 

