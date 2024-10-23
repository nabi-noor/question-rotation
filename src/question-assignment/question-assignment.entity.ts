import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Region } from '../region/region.entity';
import { Question } from '../question/question.entity';
import { Cycle } from '../cycle/cycle.entity';

@Entity()
export class QuestionAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Region)
  region: Region;

  @ManyToOne(() => Question)
  question: Question;

  @ManyToOne(() => Cycle)
  cycle: Cycle;

  @Column()
  assignedTime: Date;
}
