import compose from 'koa-compose';
import checkAuth from './checkAuth';
import fileParser from './fileParser';

export default function middleware() {
  return compose([
    checkAuth(),
    fileParser()
  ]);
}
