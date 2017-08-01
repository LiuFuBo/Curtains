import superagent from 'superagent';

export class Http {
  static get(url, options = {}) {
    return new Promise((resolve, reject) => {
      superagent.get(url)
        .query(options.param)
        .then(resolve, reject);
    });
  }

  static post(url, options = {}) {
    return new Promise((resolve, reject) => {
      const post = superagent.post(url);

      if (options.contentType) {
        post.type(options.contentType);
      }
      if (options.attach) {
        for (const item of options.attach) {
          post.attach(item.name, item.file);
        }
        post.field(options.data);
      }
      if (!options.attach && options.data) {
        post.send(options.data);
      }
      post.then(resolve, reject);
    });
  }

  static put(url, options = {}) {
    if (options.patch) {
      return new Promise((resolve, reject) => {
        superagent.put(url)
          .query(options.param)
          .send(options.data)
          .then(resolve, reject);
      });
    } else {
      return new Promise((resolve, reject) => {
        superagent.put(url)
          .query(options.param)
          .send(options.data)
          .then(resolve, reject);
      });
    }
  }

  static del(url, options = {}) {
    return new Promise((resolve, reject) => {
      superagent.delete(url)
        .send(options.data)
        .then(resolve, reject);
    });
  }
}