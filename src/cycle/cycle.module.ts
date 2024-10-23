import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cycle } from './cycle.entity';
import { CycleService } from './cycle.service';
import { RegionModule } from '../region/region.module';
import { QuestionModule } from '../question/question.module';
import { QuestionAssignmentModule } from '../question-assignment/question-assignment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cycle]),
    RegionModule,
    QuestionModule,
    QuestionAssignmentModule,
  ],
  providers: [CycleService],
  exports: [CycleService],
})
export class CycleModule {}
