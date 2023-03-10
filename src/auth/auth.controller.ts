import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createEJSViewPath } from 'src/helpers/createPath';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('')
  async getHomepage(@Res() res) {
    return res.redirect('login');
  }

  @Get('login')
  async getLoginPage(@Res() res) {
    return res.render(createEJSViewPath('login'));
  }

  @Get('register')
  async getRegisterPage(@Res() res) {
    return res.render(createEJSViewPath('register'));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Req() req): Promise<unknown> {
    return this.authService.login(req.user.id);
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<unknown> {
    return this.authService.register(userDto);
  }
}
