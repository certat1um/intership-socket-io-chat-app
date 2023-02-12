import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { Room } from './rooms/room.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
import { RoomsModule } from './rooms/rooms.module';
import { AppController } from './app.controller';
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
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
