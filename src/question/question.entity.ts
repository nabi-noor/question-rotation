import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Region } from '../region/region.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  questionText: string;

  @ManyToOne(() => Region)
  region: Region;
}
