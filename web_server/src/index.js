import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Logger from 'koa-logger';
import routes from './routes';
import middleware from './middleware';

const app = new Koa();

app.use(Logger());
app.use(bodyParser());
app.use(middleware());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.body = {
      message: err.message
    };
    ctx.status = err.status || 500;
  }
});

app.use(routes());

app.listen(3001, () => 'the server is listen to 3001');