const mysql = require('mysql');
const { promisify } = require('util');
// const promisify = require('util').promisify;

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'mariadb',
  port: 3306,
  user: 'root',
  password: 'cantexitvim',
  database: 'banking'
});

const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
};

// module.exports = {
//   load: sql => new Promise((resolve, reject) => {
//     pool.query(sql, (error, results, fields) => {
//       if (error)
//         return reject(error);

//       resolve(results);
//     });
//   })
// };