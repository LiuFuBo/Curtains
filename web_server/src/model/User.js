import fs from 'fs';
import {DataBase} from '../util';

export default class User {
  async save(user) {
    const sql = 'insert into User values (?, ?, ?, ?, ?, ?)';
    const {id, name, password, professition, gender, description} = user;

    try {
      return await DataBase.query(sql, [id, name, password, professition, gender, description]);
    } catch(error) {
      console.log(error);
    }
  }

  async update(id, ...user) {
    const temp = [];
    for (const prop of user) {
      temp.push(`${prop}=?`);
    }
    const sql = `update User set ${temp.join(',')} where id = ?`;

    try {
      return await DataBase.query(sql, [...user, id]);
    } catch(error) {
      console.log(error);
    }
  }

  async del(id) {
    const sql = 'delete from User where id = ?';

    try {
      return await DataBase.query(sql, [id]);
    } catch(error) {
      console.log(error);
    }
  }

  async queryById(id) {
    const sql = 'select * from User where id = ?';

    try {
      return await DataBase.query(sql, [id]);
    } catch(error) {
      console.log(error);
    }
  }

  async appendAsText(user) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(user);

      fs.appendFile('web_server/source/user.txt', string, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  }

  async queryAllFromText() {
    return new Promise((resolve, reject) => {
      fs.readFile('web_server/source/user.txt', 'utf-8', (error, data) => {
        if (error) {
          reject(error);
        }

        const queryString = data.split('\r\n');
        const users = queryString.map(string => {
          const user = string.split('\t');

          return {
            id: user[0],
            userName: user[1],
            password: user[2],
            professition: user[3],
            gender: user[4],
            description: user[5]
          };
        });

        resolve(users);
      });
    });
  }

  async queryFromText(type, value) {
    return new Promise((resolve, reject) => {
      fs.readFile('web_server/source/user.txt', 'utf-8', (error, data) => {
        if (error) {
          reject(error);
        }

        const userStringArrays = data.split('\\r\\n');
        const userString = userStringArrays.filter(string => {
          if (type === 'userName') {
            return string.split('\\t')[1] === value;
          } else if (type === 'id') {
            return string.split('\\t')[0] === value;
          }
        });
        if (userString.length === 0) {
          resolve()
        }
        const user = userString[0].split('\\t');

        resolve({
          id: user[0],
          userName: user[1],
          password: user[2],
          professition: user[3],
          gender: user[4],
          description: user[5]
        });
      });
    })
  }
}