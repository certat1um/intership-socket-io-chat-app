import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { config } from 'dotenv';
config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(userID: string): Promise<string> {
    return this.jwtService.sign({ id: userID });
  }

  async register(userDto: CreateUserDto): Promise<any> {
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

      user.login = login;
      user.password = password;

      const { id } = await this.userService.registerInDB(user);
      return this.jwtService.sign({ id });
    } catch (err) {
      return err;
    }
  }
}
