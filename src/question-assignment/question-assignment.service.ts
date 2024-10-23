import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionAssignment } from './question-assignment.entity';
import { Question } from '../question/question.entity';

@Injectable()
export class QuestionAssignmentService {
  constructor(
    @InjectRepository(QuestionAssignment)
    private readonly assignmentRepo: Repository<QuestionAssignment>,
  ) {}

  async getAssignedQuestionForRegion(regionId: number): Promise<Question> {
    const assignment = await this.assignmentRepo.findOne({
      where: { region: { id: regionId } },
      relations: ['question'],
      order: { assignedTime: 'DESC' },
    });

    if (assignment) {
      return assignment.question;
    }
    return null;
  }
}
