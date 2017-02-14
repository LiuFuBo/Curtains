import superagent from 'superagent';

export class Http {
  static get(url, options = {}) {
    return new Promise((resolve, reject) => {
      superagent.get(url)
        .query(options.param)
        .send(options.data)
        .then(resolve, reject);
    });
  }

  static post(url, options = {}) {
    return new Promise((resolve, reject) => {
      superagent.post(url)
        .send(options.data)
        .then(resolve, reject);
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