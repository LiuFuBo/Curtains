import compose from 'koa-compose';
import checkAuth from './checkAuth';

export default function middleware() {
  return compose([
    checkAuth()
  ]);
}