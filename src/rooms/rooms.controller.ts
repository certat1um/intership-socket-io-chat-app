import { Res, UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createEJSViewPath, createHTMLPagePath } from 'src/helpers/createPath';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomsController {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  async getRoomsPage(@Res() res: Response) {
    const rooms = await this.roomRepository.find();

    return res.render(createEJSViewPath('rooms'), { rooms });
  }

  @Get('javascript')
  async getJavascriptRoomPage(@Res() res) {
    return res.sendFile(createHTMLPagePath('chat'));
  }

  //@Get('getRoom')
  //async getRoomID(name: string): Promise<any> {
  //  return this.roomRepository.findOneBy({ name });
  //}

  @Post('/:roomID')
  async enterRoom(@Param() roomID: string): Promise<any> {
    console.log(roomID);
    return roomID;
  }
}
