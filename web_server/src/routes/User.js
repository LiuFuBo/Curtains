import Router from 'koa-router';
import {UserController} from '../controller';

const router = new Router();
const userController = new UserController();

router.post('/', userController.saveUser);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.post('/:id/image', userController.saveAvatar);
router.delete('/:id', userController.deleteUser);

export default router;