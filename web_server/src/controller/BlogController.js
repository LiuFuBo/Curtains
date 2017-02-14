import {BlogService} from '../service';

const blogService = new BlogService();

export class BlogController {
  async getBlogs(ctx) {
    const blogs = await blogService.getBlogs();

    ctx.body = {
      blogs
    };
  }

  async getBlogByName(ctx) {
    const {name} = ctx.param;
    const blog = await blogService.getBlogByName(name);

    ctx.body = {
      blog
    };
  }

  async getBlogById(ctx) {
    const {id} = ctx.param;
    const blog = await blogService.getBlogById(id);

    ctx.body = {
      blog
    };
  }

  async saveBlog(ctx) {
    const {title, summary, content, image} = ctx.request.body;
    const blog = await blogService.saveBlog({title, summary, content, image});

    ctx.body = {
      blog
    };
  }

  search() {

  }
}