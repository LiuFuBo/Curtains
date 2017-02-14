import Router from 'koa-router';
import compose from 'koa-compose';
import userRouter from './User';
import blogRouter from './Blog';
import {UserController, BlogController} from '../controller';

const router = new Router();
const userController = new UserController();
const blogController = new BlogController();

router.use('/user', userRouter.routes(), userRouter.allowedMethods());
router.use('/blog', blogRouter.routes(), blogRouter.allowedMethods());
router.get('/users', userController.getAllUsers);
router.get('/blogs', blogController.getBlogs);
router.post('/login', userController.login);
router.get('/search', blogController.search);

router.get('*', (ctx) => {
  ctx.body = {
    status : 404,
    message: 'page is not found'
  };
});

export default function routes() {
  return compose(
    [
      router.routes(),
      router.allowedMethods()
    ]
  )
}