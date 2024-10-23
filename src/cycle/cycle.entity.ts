import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cycle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  duration: number; // Cycle duration in days
}
