import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionAssignment } from './question-assignment.entity';
import { QuestionAssignmentService } from './question-assignment.service';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionAssignment])],
  providers: [QuestionAssignmentService],
  exports: [QuestionAssignmentService],
})
export class QuestionAssignmentModule {}
