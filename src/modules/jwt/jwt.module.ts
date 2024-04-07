import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({
  imports: [],
  exports: [JwtService],
  providers: [JwtService],
})
export class JwtModule {}
