import express from 'express'
const productRouter = express.Router();
import {success_service_response , failed_service_response } from '../service_response'
import {user_signup , user_login, get_purchased_product }  from './controller' 
import {auth_middleware} from './../middlewares/middleware.js'
import {set_product , get_product_detail ,checkout_product} from './controller'





     


productRouter.post('/set-product' , (req,res)=>{
      
    set_product(req.body).then((response)=>{ 
         res.send(success_service_response({result:response.result  }))
      }).catch(err=>{
       console.log(err);
       res.send(failed_service_response( {  message:err.error  }))
      })

     
     })


     



     
productRouter.get('/get-product-detail' , (req,res)=>{
      
    get_product_detail().then((response)=>{ 
         res.send(success_service_response({result:response.result  }))
      }).catch(err=>{
       console.log(err);
       res.send(failed_service_response( {  message:err.error  }))
      })

     
     })
     

     


     
     
productRouter.post('/checkout' ,auth_middleware, (req,res)=>{
     req.body.USER_ID = req.USER_ID
      console.log("iiddd.>>" ,req.body );
     checkout_product(req.body).then((response)=>{ 
          res.send(success_service_response({result:response.result  }))
       }).catch(err=>{
        console.log(err);
        res.send(failed_service_response( {  message:err.error  }))
       })
      })
      



productRouter.get('/get-product-catalogue-detail' , (req,res)=>{
           let USER_ID = req.query.USER_ID

           get_purchased_product(USER_ID).then((response)=>{ 
               res.send(success_service_response({result:response.result  }))
            }).catch(err=>{
             console.log(err);
             res.send(failed_service_response( {  message:err.error  }))
            })

             
           })
           
 
      
 


export  {productRouter}