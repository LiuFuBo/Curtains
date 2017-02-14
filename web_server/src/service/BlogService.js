import UUID from 'uuid';
import {Blog} from '../model';

const blogModel = new Blog();

export class BlogService {
  async getBlogs() {
    try {
      return await blogModel.queryAllFromText();
    } catch(error) {
      console.log(error);
    }
  }

  async saveBlog(blog) {
    const id = UUID.v1();

    try {
      return await blogModel.appendAsText({
        id,
        ...blog
      });
    } catch(error) {
      console.log(error);
    }
  }

  async getBlogByName(name) {
    try {
      return await blogModel.queryByNameFromText(name);
    } catch(error) {
      console.log(error);
    }
  }

  async getBlogById(id) {
    try {
      return await blogModel.queryByIdFromText(id);
    } catch(error) {
      console.log(error);
    }
  }
}