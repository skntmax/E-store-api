 const success_service_response=(model)=>{
   return {
     success:true,
     result:model.result ,
     error:false
   }
     
}
 

const failed_service_response=(model)=>{

    return {
      success:false,
      result:[],
      message:model.message ,
      error:true
    }
      
 }


 export {success_service_response ,failed_service_response}