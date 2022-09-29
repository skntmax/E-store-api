import express from 'express'
const authRouter = express.Router();
import {success_service_response , failed_service_response } from '../service_response'
import {user_signup , user_login, send_user_detail }  from './controller' 
import {auth_middleware} from './../middlewares/middleware.js'

authRouter.get('/' ,(req,res)=>{
     console.log("auth router ");
     })
      

authRouter.post('/login' , (req,res)=>{
   
    user_login(req.body, res).then((response)=>{ 
      console.log("response " , response);
      //  res.cookie('ud',response.token ,{ expire : new Date() + 9999 , httpOnly : true  })
       res.send(success_service_response({result:response.result  }))
    }).catch(err=>{
     console.log(err);
     res.send(failed_service_response( {  message:err.error  }))
    })
            
 })



authRouter.post('/signup' ,(req,res)=>{
    console.log(" sign up  " , req.body); 
    user_signup(req.body).then((response)=>{
      //    console.log("result.>" ,result);
           res.send(success_service_response({result:response.result  }))
            
     }).catch(err=>{
            console.log(err);
           res.send(failed_service_response( {  message:err.error  }))
     })   
    })


authRouter.get('/dashboard' , auth_middleware,(req,res)=>{
      req.body.USER_ID = req.USER_ID
       try{
        res.send(success_service_response({result:req.body.USER_ID}))
       }catch(err) {
        res.send(failed_service_response({message:err}))
       }
  })




  
authRouter.get('/user-detail' , auth_middleware,(req,res)=>{
  req.body.USER_ID = req.USER_ID
   try{ 
    send_user_detail(req.body).then((response)=>{
           res.send(success_service_response({result:response.result  }))
     }).catch(err=>{
            console.log(err);
           res.send(failed_service_response( {  message:err.error  }))
     })   
     
   }catch(err) {
    res.send(failed_service_response({message:err}))
   }
})




export  {authRouter}