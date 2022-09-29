import { Sequelize, QueryTypes } from 'sequelize';
import 'dotenv/config'
 import { execute, insert } from '../connection/db_connection';
import bcrypt from 'bcrypt'
import { success_service_response } from '../service_response';
import jwt  from 'jsonwebtoken' ; 
 
   const user_signup =async (body)=>{
      
     try{
       const {fullName , email,password }  = body

        let model = {
          FULL_NAME:fullName,
           EMAIL:email, 
           PASSWORD:password 
        }

        let exisitingUser  = await execute(`select * from user_details where email='${email.toLowerCase()}' `)
         
        if(exisitingUser.length>0) {
         return Promise.reject({error:" User is already registered "})
         } else{
          let hashPass = await bcrypt.hash( password, 4 );
           
          if(hashPass) {
            model.PASSWORD  = hashPass

             let result = await insert('user_details' , model)
              if(result){
               return Promise.resolve({result:result})
              }
            }
         }
          
       }catch(error) {
         return Promise.reject(error)
       }
     
}



 
const user_login =async (body,res)=>{
  
   
  try{

      const {full_name , email , password }  = body

        let q = `select * from user_details where EMAIL='${email.toLowerCase()}'  `
       let userDetail = await execute(q)
         if(userDetail.length==0 ) {
           return Promise.reject({error:" please signup first "}) 
         }else{
          let status =  await bcrypt.compare( password , userDetail[0].PASSWORD)
             if(status) {
              var token = jwt.sign({ ID: userDetail[0].ID }, process.env.SECRET_KEY);
               if(token) {
                // res.cookie('ud',token ,{ expire : new Date() + 9999 }) 
                userDetail[0].token = token
                 delete(userDetail[0]['PASSWORD']) 
                return Promise.resolve({result:userDetail , token})
               }else{
                return Promise.reject({message:" token not generated "})
               }
              
             }else{
              return Promise.reject({error:" invalid user "})  
             }
         }
    
     
    }catch(error) {
      return Promise.reject(error)
    }
  
}





export const set_product =async (body)=>{
      
  try{      
      for(let i=0; i<body.length ;i++) {
        let model = {
          PRODUCT_TITLE:body[i].title,
          PRODUCT_DISCRIPTION:body[i].description,
          PRODUCT_IMAGE:body[i].image,
          PRICE:body[i].price
         }
         let resposne = await insert(`Products`, model )
 
      }   
    }catch(error) {
      return Promise.reject(error)
    }
  
}




export const get_product_detail =async (body)=>{
      
  try{
     let prdDetails = await execute(`select * from Products`)
      if(prdDetails.length>0){
        return Promise.resolve({result:prdDetails})
         
      }else{
      return Promise.reject({error:"Product not found  "})
         
      }
          
     }catch(error) {
      return Promise.reject(error)
    }
  
}




export const checkout_product =async (body)=>{
      
  try{
      
    console.log("body", body);
     let model  = {
      PRODUCT_ID:body.cart.join(',') ,
      TOTAL:body.total,
      USER_ID:body.USER_ID
     }
     let data =  await insert('Product_catalogue' , model )  
     if(data){
       return Promise.resolve({result:data })
     }else{
      return Promise.reject({error:"some error occured while checkout"})
       
     }
          
     }catch(error) {
      return Promise.reject(error)
    }
  
}





export const get_purchased_product =async (USER_ID)=>{
      
  try{

           let result = await execute(`select * from Product_catalogue where USER_ID=${USER_ID}`) 
            if(result.length>0) {
               let uniqueItems   =  [...new Set([...result.map(ele => ele.PRODUCT_ID.split(',') )])] 
                    let finalProd = await execute(`
                       select * from Products where PRODUCT_ID in (${uniqueItems.flat()})
                     ` ) 
                      
                      return Promise.resolve({result:finalProd})  
               }else{
           return Promise.reject({error:" No data found " })
                
               }
         
          }catch(error) {
      return Promise.reject(error)
    }
  
}



export const send_user_detail  =async (body)=>{
      
  try{
           let result = await execute(`select * from user_details where ID=${body.USER_ID}`) 
            if(result.length>0) {
                      return Promise.resolve({result:result[0]})  
               }else{
           return Promise.reject({error:" No user found  " })
               }
         
          }catch(error) {
      return Promise.reject(error)
    }
  
}










export {user_signup , user_login}