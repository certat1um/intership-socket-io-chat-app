import { Res, UseGuards } from '@nestjs/common';
import { Controller, Get, Post, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { createEJSViewPath } from 'src/helpers/createPath';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomController {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  @Get()
  //@UseGuards(JwtAuthGuard)
  async getRoomsPage(@Res() res: Response): Promise<any> {
    const rooms = await this.roomRepository.find();

    return res.render(createEJSViewPath('rooms'), { rooms });
  }

  @Post(':roomID')
  async enterRoom(@Param() roomID: string): Promise<string> {
    return roomID;
  }
}
