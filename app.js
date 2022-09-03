
// example from https://strapengine.com/jwt-authentication-in-nodejs/
// also look 
// https://siddharthac6.medium.com/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e

require('dotenv').config()

const express = require('express'); 
const app = express();

// 9423201831 Guruja M 
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// middlewares

app.use(express.json())

app.use('/', authRoutes) 
app.use('/user', userRoutes)

// error handling 
app.use((err, req, res, next) => 
    { 
      res.status(err.status || 500).send(
          { error: { 
                status: err.status || 500, 
                message: err.message 
             } 
          }
	)
    })
 
app.listen(process.env.PORT || 3000, () => { 
       console.log('server is running' , process.env.PORT || 3000) 
  })

process.on('SIGINT' , async() => { 
     process.exit(1) 
   })

