import UUID from 'uuid';
import fs from 'fs';
import User from '../model/User';
import {File} from '../util';

const userModel = new User();

export class UserService {
  async getUserById(id) {
    try {
      return await userModel.queryFromText('id', id);
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByName(name) {
    try {
      return await userModel.queryFromText('userName', name);
    } catch(error) {
      console.log(error);
    }
  }

  async getAllUsers() {
    try {
      return await userModel.queryAllFromText();
    } catch(error) {
      console.log(error);
    }
  }

  async saveUser(user) {
    const id = UUID.v1();

    try {
      return await userModel.appendAsText({
        id,
        professition: '',
        gender: 'male',
        description: '',
        ...user
      });
    } catch(error) {
      console.log(error);
    }
  }

  async deleteUser(id) {
    try {
      return await userModel.del(id);
    } catch(error) {
      console.log(error);
      throw error;
    }
  }

  async saveAvatar(id, imgData) {
    const base64Data = imgData.replace(/^data:image\/\w+;base64,/, '');
    const dataBuffer = new Buffer(base64Data, 'base64');

    try {
      const flag = await File.createDir(`web_server/source/${id}`);

      if (flag) {
        await fs.writeFile(`web_server/source/${id}/avatar.png`, dataBuffer, (error) => {
          if (error) {
            ctx.body = {
              message: 'upload avatar failed'
            };
          } else {
            ctx.body = {
              image: {
                origin: `web_server/source/${id}/avatar.png`
              }
            };
          }
        });
      }
    } catch(error) {
      console.log(error);
    }
  }
}