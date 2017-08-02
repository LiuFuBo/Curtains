import {BlogService} from '../service';

const blogService = new BlogService();

export class BlogController {
  async getBlogs(ctx) {
    const {page, perPage} = ctx.params;
    const _page = page && page > 0 || 1;
    const _perPage = perPage && perPage > 0 || 10;
    const from = (_page - 1) * _perPage + 1;
    const to = _page * _perPage;
    const blogs = await blogService.getBlogs(from, to);

    ctx.body = {
      status: 200,
      msg: '',
      content: blogs
    };
  }

  async getBlogById(ctx) {
    const {id} = ctx.params;
    const blog = await blogService.getBlogById(id);

    ctx.body = {
      blog
    };
  }

  async saveBlog(ctx) {
    const {title, summary, content, files} = ctx.request.body;
    const blog = await blogService.saveBlog({title, summary, content, images: files.image});

    ctx.body = {
      status: 201,
      msg: '',
      content: blog
    };
  }

  search() {

  }
}