import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 3600,
      max: 100,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class UtilModule {}
