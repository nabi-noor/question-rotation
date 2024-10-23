import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestionAssignmentModule } from '../question-assignment/question-assignment.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    QuestionAssignmentModule
],
  providers: [QuestionService],
  controllers: [QuestionController],
  exports: [QuestionService],
})
export class QuestionModule {}
