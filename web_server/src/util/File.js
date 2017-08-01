import fs from 'fs';

export class File {
  static async createDir(dir) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await File.isExis(dir));
      } catch(error) {
        fs.mkdir(dir, (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        });
      }
    });
  }

  static async isExis(dir) {
    return new Promise((resolve, reject) => {
      fs.access(dir, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async parseBase64ToFile(path, base64) {
    const _base64 = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = new Buffer(_base64, 'base64');

    return new Promise((resolve, reject) => {
      fs.writeFile(path, buffer, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }
}