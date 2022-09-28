
const express = require('express') 
const app = express()
const PORT = 5000 || process.env.PORT 
const {authRouter} = require('./router/auth')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
let conn = require('./connection/db_connection')
// parse application/json
app.use(bodyParser.json())


 // ---------user route ------------
 app.use('/user',authRouter)   

    

app.listen( PORT, ()=>{
     console.log("sever running at 5000 ");
})