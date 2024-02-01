import { Test, TestingModule } from '@nestjs/testing';
import { AuthentificationController } from './authentification.controller';
import { AuthentificationService } from './authentification.service';

describe('AuthentificationController', () => {
  let controller: AuthentificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthentificationController],
      providers: [AuthentificationService],
    }).compile();

    controller = module.get<AuthentificationController>(AuthentificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
