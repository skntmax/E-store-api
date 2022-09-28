const authRouter = require('express').Router()
const {success_service_response , failed_service_response} = require('../service_response')
const {user_signup} = require('./controller')

authRouter.get('/' ,(req,res)=>{
     console.log("auth router ");
     })


authRouter.get('/signup' ,(req,res)=>{
    console.log(" sign up  " , req.body); 
    user_signup("something").then((result)=>{
           console.log("response" , result);
           res.send(success_service_response( {  result:result.result  }))
     }).catch(err=>{
           res.send(failed_service_response( {  message:err.error  }))
           
     })

    
     //   console.log("conn " , conn );
      
     
    })



module.exports = {authRouter}