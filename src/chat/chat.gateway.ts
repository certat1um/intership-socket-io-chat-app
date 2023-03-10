import { InjectRepository } from '@nestjs/typeorm';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnGatewayInit } from '@nestjs/websockets/interfaces';
import { Server, Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { ChatController } from './chat.controller';
import { Participant } from './participant/participant.entity';
import { ParticipantService } from './participant/participant.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(private participantService: ParticipantService) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server): void {
    console.log('ChatGateway Initialized.');
  }

  handleConnection(client: Socket): void {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket): void {
    console.log('Client disconnected.', client.id);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    client: Socket,
    data: { userLogin: string; roomID: string },
  ) {
    if (Array.from(client.rooms).indexOf(data.roomID) < 0) {
      client.join(data.roomID);

      //this.participantService.createAndPostInDB({
      //  connectionID: client.id,
      //  ...data,
      //});

      //this.server.to(data.roomID).emit('joinedRoom', data.userLogin);
    }
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    client: Socket,
    data: { userLogin: string; roomID: string },
  ): void {
    client.leave(data.roomID);
    console.log(client.id, 'has left the room', data.roomID);

    //this.server.to(data.roomID).emit('leftRoom', data.userLogin);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(
    client: Socket,
    data: {
      connectionID: string;
      roomID: string;
      authorLogin: string;
      msg: string;
      createdAt: Date;
    },
  ): void {
    this.server.to(data.roomID).emit('msgToClient', data);
    // TODO
    // then post this message to database
  }
}
