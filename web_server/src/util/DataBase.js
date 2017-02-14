import mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool({
  connectionLimit: config.connectionLimit,
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

export class DataBase {
  static async query(sql, value) {
    return new Promise((resolve, reject) => {
      pool.query(sql, value, (err, results) => {
        if(err) {
          reject(Error(err));
        } else {
          resolve(results);
        }
      });
    });
  }

  static async queryAsync(sql, value, callback) {
    pool.query(sql, value, (err, results, fields) => {
      callback(err, results, fields);
    });
  }
}