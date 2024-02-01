import { Test, TestingModule } from '@nestjs/testing';
import { ConsultantService } from './consultant.service';

describe('ConsultantService', () => {
  let service: ConsultantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultantService],
    }).compile();

    service = module.get<ConsultantService>(ConsultantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
