import { WebSocketGateway } from '@nestjs/websockets';
import { MessangerService } from './messanger.service';

@WebSocketGateway()
export class MessangerGateway {
  constructor(private readonly messangerService: MessangerService) {}
}
