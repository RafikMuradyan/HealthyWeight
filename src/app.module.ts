import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppRatingsModule } from './modules/app-ratings/app-ratings.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';
import { dataSourceOptions } from '../database/ormconfig';
import { HealthCheckerModule } from './modules/health-checker/health-checker.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { TelegramSenderModule } from './modules/telegram/telegram-sender/telegram-sender.module';
import { TelegramListenerModule } from './modules/telegram/telegram-listener/telegram-listener.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    AppRatingsModule,
    UserProfileModule,
    HealthCheckerModule,
    FeedbackModule,
    TelegramSenderModule,
    TelegramListenerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
