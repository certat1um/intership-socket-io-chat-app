import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { join } from 'path';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get(['login', ''])
  async getLoginPage(@Res() res) {
    return res.sendFile(join(process.cwd(), 'public/html', 'login.html'));
  }

  @Get('register')
  async getRegisterPage(@Res() res) {
    return res.sendFile(join(process.cwd(), 'public/html', 'register.html'));
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Req() req, @Response() res: Response): Promise<any> {
    const generatedToken = await this.authService.login(req.user.id);
    //return res.set('Authorization', `Bearer ${generatedToken}`);
    
    //return '1';
  }

  @Post('register')
  async register(@Body() userDto: CreateUserDto): Promise<any> {
    return this.authService.register(userDto);
  }
}
