import { Res, Req, UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Param } from '@nestjs/common';
import { Response } from 'express';
import { createEJSViewPath } from 'src/helpers/createPath';
import { RoomService } from 'src/room/room.service';
import { UserService } from 'src/user/user.service';

@Controller('chat')
export class ChatController {
  constructor(
    private roomsService: RoomService,
    private userService: UserService,
  ) {}

  @Get(':id')
  async enterChatRoomPage(
    @Param() roomData: Record<string, string>,
    @Res() res: Response,
    @Req() req,
  ): Promise<unknown> {
    const room = await this.roomsService.findOneByID(roomData.id);
    console.log(req.data);

    return res.render(createEJSViewPath('chat'), { room });
  }

  @Get('userToken/:token')
  async getUserLoginByToken(@Param() params): Promise<string> {
    return this.userService.getLoginByToken(params.token);
  }
}
