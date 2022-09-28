// import { success_service_response , failed_service_response } from "../service_response"
 const {connection:conn}   = require('../connection/db_connection') 
 

   const user_signup =async (body)=>{
       
     try{
       let q = `select * from user_details`
       
         conn.query(q, ( err,result )=>{
            if(!err) {
        console.log(result);
            return Promise.resolve(result)
            }else{
                 return Promise.reject({error:err})               
            }
       });  

       }catch(error) {
         return Promise.reject(error)
       }
     
}

module.exports = {
  user_signup
}