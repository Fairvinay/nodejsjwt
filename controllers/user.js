const creatError = require('http-errors')
const JSONdb  = require('simple-json-db')

const db  = new JSONdb(process.env.JSON_DB_PATH, { asyncWrite: true })
 
exports.getUser = async (req, res, next) => 
     { 
       try { 

        console.log("Inside /user getUser ")
         // checking for any error occurance 
        const { email } = req.payload

        if(!email) throw creatError.Unauthorized() 
   
        const userData = db.get(email) 
 
        if(!userData) throw creatError.NotFound() 

        // creating user as json 

        const userDataObj = JSON.parse(userData) 

        // remove the password key beforesending it to client 
        delete userDataObj.password 
  
        res.status(200).send(userDataObj) 
      } 
      catch(error) 
       {  
          next(error) 
       } 
 } 


