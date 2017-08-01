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

  async queryByNameAndPsw(name, password) {
    const sql = 'select * from User where user_name = ? and password = ?';

    try {
      const user = await DataBase.query(sql, [name, password]);

      if (user.length === 0) {
        return null;
      } else {
        const {user_id, user_name, password, professition, gender, description} = user[0];

        return {
          id: user_id,
          userName: user_name,
          password,
          professition,
          gender,
          description
        };
      }
    } catch(error) {
      console.log(error);
    }
  }
}