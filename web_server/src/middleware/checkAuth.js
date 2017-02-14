export default function checkAuth() {
  return async function (ctx, next) {
    if (ctx.path.indexOf('user') || ctx.path.indexOf('blog')) {
      await next();
    } else {
      ctx.body = {
        status: 401,
        message: 'unauthorized'
      };
    }
  }
}