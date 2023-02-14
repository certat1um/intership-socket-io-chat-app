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
import { Participant } from './entities/participant.entity';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    console.log('ChatGateway Initialized.');
  }

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  async handleDisconnect(client: Socket) {
    console.log('ChatGateway Initialized.', client.id);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): void {
    this.server.emit('msgToClient', text);
  }
}
