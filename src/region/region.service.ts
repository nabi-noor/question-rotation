import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private readonly regionRepo: Repository<Region>,
  ) {}

  async getAllRegions(): Promise<Region[]> {
    return this.regionRepo.find();
  }
}
