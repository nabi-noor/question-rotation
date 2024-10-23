import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from './region.entity';
import { RegionService } from './region.service';

@Module({
  imports: [TypeOrmModule.forFeature([Region])],
  providers: [RegionService],
  exports: [RegionService],
})
export class RegionModule {}
