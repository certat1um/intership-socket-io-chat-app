import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Participant } from './participant.entity';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAndPostInDB(dto: {
    userLogin: string;
    roomID: string;
    connectionID: string;
  }): Promise<void> {
    try {
      const { id } = await this.userRepository.findOneBy({
        login: dto.userLogin,
      });

      const existingParticipant = await this.participantRepository.findOneBy({
        user: id,
        room: dto.roomID,
      });

      if (existingParticipant) {
        await this.participantRepository.update(existingParticipant.id, {
          connectionId: dto.connectionID,
        });
        return;
      }

      const participant = new Participant();

      participant.connectionId = dto.connectionID;
      participant.user = dto.userLogin;
      participant.room = dto.roomID;

      this.participantRepository.save(participant);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
