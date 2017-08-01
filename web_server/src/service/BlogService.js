import UUID from 'uuid';
import {Blog} from '../model';
import {File} from '../util';

const blogModel = new Blog();

export class BlogService {
  async getBlogs(from, to) {
    try {
      return await blogModel.queryAll(from, to);
    } catch(error) {
      console.log(error);
    }
  }

  async saveBlog(blog) {
    const id = UUID.v1();
    const {image} = blog;
    const url = `../../resource/${id}`;

    try {
      if (File.isExis(url) || File.createDir(url)) {
        if (await File.parseBase64ToFile(url, image)) {
          return await blogModel.save({
            id,
            ...blog,
            image: url
          });
        }
      }
    } catch(error) {
      console.log(error);
    }
  }

  async getBlogById(id) {
    try {
      return await blogModel.queryById(id);
    } catch(error) {
      console.log(error);
    }
  }
}