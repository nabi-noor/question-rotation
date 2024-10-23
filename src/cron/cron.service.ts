import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CycleService } from '../cycle/cycle.service';

@Injectable()
export class CronService {
  constructor(private readonly cycleService: CycleService) {}

  @Cron('0 19 * * 1', { timeZone: 'Asia/Singapore' })
  async handleCron() {
    await this.cycleService.assignQuestionsToCycle(7); // 7-day cycle
  }
}
