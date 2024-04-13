import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppRatingsModule } from './modules/app-ratings/app-ratings.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { dataSourceOptions } from '../database/ormconfig';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { TelegramModule } from './modules/telegram/telegram.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    AppRatingsModule,
    UserProfileModule,
    HealthCheckerModule,
    FeedbackModule,
    TelegramModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
