import mysql from 'mysql';
import { Sequelize, QueryTypes } from 'sequelize';
import constant from '../src/constant';
 
export const sequelize = new Sequelize(constant.cred.dbname, constant.cred.user, constant.cred.password, {
    host:constant.cred.host,
    dialect: 'mysql',
    operatorsAliases: 0
  
  });



  export const execute = async (query) => {
    try {
      await sequelize.authenticate();
      const rows = await sequelize.query(query, { type: "SELECT" });
      return Promise.resolve(rows)
    } catch (error) {
      return Promise.reject(error); 
    }
  }


  
export const insert = async (tableName, param) => {
  try {

    await sequelize.authenticate();

    let paramKeys = Object.keys(param);
    const query = `
      INSERT INTO ${constant.cred.dbname}.${tableName}
      (${paramKeys.join(', ')}) 
      VALUES
      ( ${paramKeys.map((i, ind) => `"${param[i]}"`).join(', ')} )
      `;

    const rows = await sequelize.query(query, { type: "INSERT" });

    return Promise.resolve(rows);
  } catch (error) {
    return Promise.reject(error)
  }
}
  


// export const conn = mysql.createConnection({
//   host     : '216.48.177.88' ,
//   user     : 'rozgar_user' ,
//   password : 'damnlol_0346' ,
//   database : 'e_store'
// });
 
// conn.connect(function (err) {
//     if(err){
//         console.log("error occurred while connecting");
//     }
//     else{
//         console.log("connection created with Mysql successfully");
//     }
//  });
 
// connection.end();

