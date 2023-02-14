import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(login: string): Promise<User> {
    return this.userRepository.findOneBy({ login });
  }

  async getLoginByToken(token: string): Promise<string> {
    const decodedJWT: any = this.jwtService.decode(token);
    const { login } = await this.userRepository.findOneBy({
      id: decodedJWT.id,
    });

    return login;
  }

  async registerInDB(user: User) {
    return this.userRepository.save(user);
  }
}
