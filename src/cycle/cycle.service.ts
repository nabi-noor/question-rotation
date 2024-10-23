import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cycle } from './cycle.entity';
import { RegionService } from '../region/region.service';
import { QuestionService } from '../question/question.service';
import { QuestionAssignmentService } from '../question-assignment/question-assignment.service';
import { Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CycleService {
  constructor(
    @InjectRepository(Cycle)
    private readonly cycleRepo: Repository<Cycle>,
    private readonly regionService: RegionService,
    private readonly questionService: QuestionService,
    private readonly questionAssignmentService: QuestionAssignmentService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async assignQuestionsToCycle(cycleDuration: number) {
    const regions = await this.regionService.getAllRegions();
    const cycleStart = this.getCurrentCycleStart(cycleDuration);
    
    for (const region of regions) {
      const currentQuestion = await this.questionService.getCurrentQuestionForRegion(region.id);
    //   await this.questionAssignmentService.getAssignedQuestionForRegion(region.id, currentQuestion.id, cycleStart);
      
      // Update cache after assigning new question
      await this.cacheManager.set(`region_${region.id}_question`, currentQuestion,  (60 * 60 * 24) );
    }
  }

  private getCurrentCycleStart(cycleDuration: number): Date {
    const now = new Date();
    const cycleStart = new Date(now.getTime() - (now.getTime() % (cycleDuration * 24 * 60 * 60 * 1000)));
    return cycleStart;
  }
}
