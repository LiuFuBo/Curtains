import Router from 'koa-router';
import {BlogController} from '../controller';

const router = new Router();
const blogController = new BlogController();

router.post('/', blogController.saveBlog);
router.get('/:id', blogController.getBlogById);

export default router;