import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { Room } from './room/room.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { RoomModule } from './room/room.module';
import { AppController } from './app.controller';
import { ChatModule } from './chat/chat.module';
config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.USER_NAME,
      password: process.env.USER_PASSWORD || '',
      database: process.env.DB_DATABASE,
      entities: [User, Room],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    AuthModule,
    RoomModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
