import { Test, TestingModule } from '@nestjs/testing';
import { MessangerGateway } from './messanger.gateway';
import { MessangerService } from './messanger.service';

describe('MessangerGateway', () => {
  let gateway: MessangerGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessangerGateway, MessangerService],
    }).compile();

    gateway = module.get<MessangerGateway>(MessangerGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
