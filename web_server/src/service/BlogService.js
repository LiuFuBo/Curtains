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
    const {images} = blog;
    const dir = `/public/${id}`;
    let dirString = '';

    try {
      if (await File.createDir(dir)) {
        for(const item of images) {
          const imageName = UUID.v1();
          const extension = item.path.split('.')[1];
          const imageDir = dir + '\\' + imageName + '.' + extension;

          if (await File.removeFile(item.path, imageDir)) {
            dirString = dirString + imageDir + ';';
          }
        }
        if (dirString === '') {
          return {};
        } else {
          return await blogModel.save({
            id,
            ...blog,
            image: dirString
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