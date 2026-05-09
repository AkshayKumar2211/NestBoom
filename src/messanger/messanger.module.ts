import { Module } from '@nestjs/common';
import { MessangerService } from './messanger.service';
import { MessangerGateway } from './messanger.gateway';

@Module({
  providers: [MessangerGateway, MessangerService],
})
export class MessangerModule {}
