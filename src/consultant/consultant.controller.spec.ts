import { Test, TestingModule } from '@nestjs/testing';
import { ConsultantController } from './consultant.controller';
import { ConsultantService } from './consultant.service';

describe('ConsultantController', () => {
  let controller: ConsultantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsultantController],
      providers: [ConsultantService],
    }).compile();

    controller = module.get<ConsultantController>(ConsultantController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
