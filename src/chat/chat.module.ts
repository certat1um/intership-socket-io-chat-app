import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/room/room.entity';
import { RoomService } from 'src/room/room.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { Participant } from './participant/participant.entity';
import { ParticipantService } from './participant/participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Room, Participant])],
  controllers: [ChatController],
  providers: [
    ChatGateway,
    ParticipantService,
    RoomService,
    UserService,
    JwtService,
  ],
})
export class ChatModule {}
