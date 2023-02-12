import { Controller, Get } from '@nestjs/common';
import { Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { createHTMLPagePath } from './helpers/createPath';

@Controller()
export class AppController {
  @Get('error')
  async getErrorPage(@Res() res) {
    res.sendFile(createHTMLPagePath('error'));
  }
}
