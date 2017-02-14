import fs from 'fs';
import {DataBase} from '../util';

export class Blog {
  async save(blog) {
    const sql = 'insert into Blog values (?, ?, ?)';
    const {id, name, info} = blog;

    try {
      return await DataBase.query(sql, [id, name, info]);
    } catch(error) {
      console.log(error);
    }
  }

  async update(id, ...blog) {
    const temp = [];
    for (const prop of blog) {
      temp.push(`${prop}=?`);
    }
    const sql = `update Blog set ${temp.join(',')} where id = ?`;

    try {
      return await DataBase.query(sql, [...blog, id]);
    } catch(error) {
      console.log(error);
    }
  }

  async del(id) {
    const sql = 'delete from Blog where id = ?';

    try {
      return await DataBase.query(sql, [id]);
    } catch(error) {
      console.log(error);
    }
  }

  async queryById(id) {
    const sql = 'select * from Blog where id = ?';

    try {
      return await DataBase.query(sql, [id]);
    } catch(error) {
      console.log(error);
    }
  }

  async queryAll() {
    const sql = 'select * from Blog';

    try {
      return await DataBase.query(sql);
    } catch(error) {
      console.log(error);
    }
  }

  async appendAsText(blog) {
    const {id, title, summary, content, image} = blog;
    const text = `${id}\t${title}\t${summary}\t${content}\t${image}\r\n`;

    await fs.appendFile('web_server/source/blog.txt', text, (error, data) => {
      if (error) {
        throw(error);
      } else {
        return blog;
      }
    });
  }

  async queryByNameFromText(title) {
    await fs.readFile('web_server/source/blog.txt', 'utf-8', (error, data) => {
      if (error) {
        throw(error);
      }

      const queryString = data.split('\r\n');
      const blogString = queryString.filter(string => string.split('\t')[1] === title);
      const blog = blogString.split('\t');

      return {
        id: blog[0],
        title: blog[1],
        summary: blog[2],
        content: blog[3],
        image: blog[4]
      };
    });
  }

  async queryByIdFromText(id) {
    await fs.readFile('web_server/source/blog.txt', 'utf-8', (error, data) => {
      if (error) {
        throw(error);
      }

      const queryString = data.split('\r\n');
      const blogString = queryString.filter(string => string.split('\t')[0] === id);
      const blog = blogString.split('\t');

      return {
        id: blog[0],
        title: blog[1],
        summary: blog[2],
        content: blog[3],
        image: blog[4]
      };
    });
  }

  async queryAllFromText() {
    return new Promise((resolve, reject) => {
      fs.readFile('web_server/source/blog.txt', 'utf-8', (error, data) => {
        if (error) {
          reject(error);
        }

        const queryString = data.split('\r\n');
        const blogs = queryString.map(string => {
          const user = string.split('\t');

          return {
            id: user[0],
            title: user[1],
            summary: user[2],
            content: user[3],
            image: user[4]
          };
        });

        return resolve(blogs);
      });
    });
  }
}