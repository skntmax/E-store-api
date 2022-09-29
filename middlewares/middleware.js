import { success_service_response,failed_service_response } from "../service_response"
import jwt  from "jsonwebtoken";
export const auth_middleware = function (req, res, next) {

   
  var authorization = req.headers['authorization'];
  if (authorization) {
      var tokenBearer = authorization.split(' ');
      var token = tokenBearer[1];
        console.log("token " , token);
      jwt.verify( token , process.env.SECRET_KEY , function (err, decoded) {
          if (err) {
               res.send(failed_service_response({message:" Access denied1 "}))
           }
          else { 
              req.USER_ID =    decoded.ID;
              next();
          }
      });
  }
  else {
    res.send(failed_service_response({message:" Access denied1 "}))
  }
};


  