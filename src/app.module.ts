import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { RegionModule } from './region/region.module';
import { QuestionModule } from './question/question.module';
import { CycleModule } from './cycle/cycle.module';
import { QuestionAssignmentModule } from './question-assignment/question-assignment.module';
import { CronService } from './cron/cron.service';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'question-rotation',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    RegionModule,
    QuestionModule,
    CycleModule,
    QuestionAssignmentModule,
    CacheModule.register(
      {
        useFactory: async () => {
          const store = await redisStore({
            socket: {
              host: process.env.REDIS_HOST || 'localhost',
              port: parseInt(process.env.REDIS_PORT) || 6379
            }
          })

          return {
            store,
            ttl: 60 * 60 * 24,
          }
        },
        isGlobal: true
      }
    )
  ],
  providers: [CronService],
  controllers: [],
  exports: [CacheModule],
})
export class AppModule {}
