import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards()
  @Post('login')
  async login(): Promise<string> {
    return this.authService.login('userEmail');
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<any> {
    return this.authService.register(userDto);
  }
}
