module.exports ={
     
    error:{
        
        success:false,
        status:model.status,
        result:model.result ,
        message:model.message ,
        error:true
          
    },
    success:{
        success:true,
        status:model.status,
        result:model.result ,
        message:model.message ,
        error:false
    }
}