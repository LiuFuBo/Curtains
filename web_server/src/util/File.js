import fs from 'fs';
import path from 'path';

export class File {
  static dirname = path.join(__dirname, '../../');

  static async createDir(dir) {
    return new Promise(async (resolve, reject) => {
      try {
        const _dir = path.join(File.dirname, dir);
        const exis = await File.isExis(_dir);

        if (!exis) {
          fs.mkdir(_dir, (error) => {
            if (error) {
              reject(error);
            } else {
              resolve(true);
            }
          });
        } else {
          resolve(true);
        }
      } catch(error) {
        console.log(error);
      }
    });
  }

  static async isExis(dir) {
    return new Promise((resolve) => {
      fs.access(dir, (error) => {
        if (error) {
          resolve(false);
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

  static async removeFile(sourceAbsolute, dist) {
    return new Promise((resolve) => {
      const _dir = path.join(File.dirname, dist);
      const is = fs.createReadStream(sourceAbsolute);
      const os = fs.createWriteStream(_dir);

      is.pipe(os);
      is.on('end',function(err) {
        fs.unlinkSync(sourceAbsolute);
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}