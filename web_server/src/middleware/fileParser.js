import formidale from 'formidable';
import path from 'path';

export default function() {
  return async function(ctx, next) {
    if (ctx.request.is('multipart/form-data')) {
      const form = new formidale.IncomingForm();

      form.encoding = 'utf-8';
      form.keepExtensions = true;
      form.multiples = true;
      form.uploadDir = path.resolve(__dirname, '../../temp');
      return new Promise((resolve) => {
        form.parse(ctx.req, function(error, fileds, files) {
          if (error) {
            throw error;
          } else {
            resolve({...fileds, files});
          }
        });
      }).then((body) => {
        ctx.request.body = body;
        return next(ctx);
      });
    } else {
      return next(ctx);
    }
  }
}