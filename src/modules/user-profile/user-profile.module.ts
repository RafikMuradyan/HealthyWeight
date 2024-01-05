import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { IdealWeightModule } from '../../utils/calculate-ideal-weight/calculate-ideal-weight.module';

@Module({
  imports: [IdealWeightModule, TypeOrmModule.forFeature([UserProfile])],
  providers: [UserProfileService],
  controllers: [UserProfileController],
})
export class UserProfileModule {}
