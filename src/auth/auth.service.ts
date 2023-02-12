import { HttpException, HttpStatus, Injectable, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { config } from 'dotenv';
import * as bcrypt from 'bcrypt';
config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<User | null> {
    const user = await this.userService.findOne(login);
    //const isValidPass = await bcrypt.compare(pass, user.password);

    if (user && user.password === pass) {
      const { password, ...userData } = user;
      return userData as User;
    }
    return null;
  }

  async login(userID: string): Promise<string> {
    return this.jwtService.sign({ id: userID });
  }

  async register(userDto: CreateUserDto): Promise<string> {
    const { login, password } = userDto;
    const oldUser = await this.userService.findOne(login);

    if (oldUser) {
      throw new HttpException(
        'User already exists. Please login',
        HttpStatus.CONFLICT,
      );
    }

    try {
      const user = new User();
      const encryptedPassword = await bcrypt.hash(password, 3);

      user.login = login;
      user.password = encryptedPassword;

      const { id } = await this.userService.registerInDB(user);
      return this.jwtService.sign({ id });
    } catch (err) {
      return err;
    }
  }
}
