import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { Room } from './entities/room.entity';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { config } from 'dotenv';
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
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppGateway],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
