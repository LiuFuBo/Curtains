import {DataBase} from '../util';

export class Blog {
  async save(blog) {
    const sql = 'insert into Blog values (?, ?, ?, ?, ?)';
    const {id, title, summary, content, image} = blog;

    try {
      const result = await DataBase.query(sql, [id, title, summary, content, image]);

      if (result.affectedRows === 1) {
        return blog;
      } else {
        return {};
      }
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
      const blog = await DataBase.query(sql, [id]);

      if (blog.length === 0) {
        return {};
      } else {
        const {blog_id, caption, summary, content, image} = blog[0];

        return {
          id: blog_id,
          title: caption,
          summary,
          content,
          image
        };
      }
    } catch(error) {
      console.log(error);
    }
  }

  async queryAll(from, to) {
    const sql = 'select * from Blog limit ?,?';

    try {
      const blogs = await DataBase.query(sql, [from, to]);

      if (blogs.length === 0) {
        return [];
      } else {
        return blogs.map(item => ({
          id: item.blog_id,
          title: item.caption,
          summary: item.summary,
          content: item.content,
          image: item.image
        }));
      }
    } catch(error) {
      console.log(error);
    }
  }
}