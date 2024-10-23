import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { QuestionService } from './question.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get(':regionId')
  async getQuestion(@Param('regionId') regionId: number) {
    const question = await this.questionService.getCurrentQuestionForRegion(regionId);
    if (!question) {
      throw new NotFoundException('No question assigned for this region');
    }
    return question;
  }
}
