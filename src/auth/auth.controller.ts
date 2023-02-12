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
import { createHTMLPagePath } from 'src/helpers/createPath';
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
    return res.sendFile(createHTMLPagePath('login'));
  }

  @Get('register')
  async getRegisterPage(@Res() res) {
    return res.sendFile(createHTMLPagePath('register'));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Req() req): Promise<string> {
    return this.authService.login(req.user.id);
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<any> {
    return this.authService.register(userDto);
  }
}
