import {UserService} from '../service';

const userService = new UserService();

export class UserController {
  async getAllUsers(ctx) {
    const users = await userService.getAllUsers();

    ctx.body = {
      users
    };
  }

  async getUserById(ctx) {
    const {id} = ctx.params;
    const user = await userService.getUserById(id);

    ctx.body = {
      user
    };
  }

  async updateUser(ctx) {
    const {id, userName, password, profession, gender, description} = ctx.request.body;
    const user = await userService.saveUser({
      id,
      userName,
      password,
      profession,
      gender,
      description
    });

    ctx.body = {
      user
    };
  }

  async saveUser(ctx) {
    const {userName, password, captcha} = ctx.request.body;

    if (captcha === '1234') {
      const user = await userService.saveUser({
        userName,
        password
      });

      ctx.body = {
        status: user ? 200 : 400
      };
    }
  }

  async deleteUser(ctx) {
    const {id} = ctx.params;

    try {
      ctx.body = await userService.deleteUser(id);
    } catch(error) {
      ctx.body = {
        status: 403,
        message: ''
      };
    }
  }

  async saveAvatar(ctx) {
    const {id} = ctx.params;
    const imgData = ctx.body.imgData;

    ctx.body = await userService.saveAvatar(id, imgData);
  }

  async login(ctx) {
    const {userName, password} = ctx.request.body;
    const user = await userService.getUserByNameAndPsw(userName, password);

    if (user) {
      ctx.body = {
        status: 200,
        msg: '',
        content: {
          userName: user.userName
        }
      };
    } else {
      ctx.body = {
        status: 404,
        msg: '用户名或密码错误',
        content: {}
      }
    }

  }
}