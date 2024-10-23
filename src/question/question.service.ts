import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { QuestionAssignmentService } from '../question-assignment/question-assignment.service';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';  // Correct import from cache-manager

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepo: Repository<Question>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,  // Inject CacheManager properly
    private readonly questionAssignmentService: QuestionAssignmentService
  ) {}

  async getCurrentQuestionForRegion(regionId: number): Promise<Question> {
    const cacheKey = `region_${regionId}_question`;
    const cachedQuestion: Question = await this.cacheManager.get<Question>(cacheKey);

    if (cachedQuestion) {
      return cachedQuestion;
    }

    // Fetch from the database if no cached question
    const question = await this.questionAssignmentService.getAssignedQuestionForRegion(regionId);

    if (question) {
      // Explicitly cast cacheManager to include the set method
      await this.cacheManager.set(cacheKey, question,  (60 * 60 * 24) ); // Cache for 24 hours
    }

    return question;
  }
}
