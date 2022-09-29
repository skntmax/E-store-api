
import express from 'express' 
const app = express()
import constant from './constant.js' 
const PORT = constant.PORT || process.env.PORT 
import {authRouter}  from './../router/auth.js'
import {productRouter}  from './../router/products'
import bodyParser  from'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
    
     let corsOption = {
          origin: true, //included origin as true
          credentials: true, //included credentials as true
     }

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors(corsOption))
// import {connection as conn}  from '../connection/db_connection'
// parse application/json

 // ---------user route ------------
 app.use( '/user' , authRouter )   
 app.use( '/product' , productRouter )   
 app.set("trust proxy " , 1)
 
    

app.listen( PORT, ()=>{
     console.log("sever running at 5000 ");
})