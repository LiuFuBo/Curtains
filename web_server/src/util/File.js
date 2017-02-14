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
}