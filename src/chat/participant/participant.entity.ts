import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/user.entity';
import { Room } from '../../room/room.entity';

@Entity('participants')
export class Participant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  user: string;

  @ManyToOne(() => Room, (room) => room.id)
  room: string;

  @Column()
  connectionId: string;
}
