import { Test, TestingModule } from '@nestjs/testing';
import { TokenServiceController } from './token-service.controller';
import { TokenServiceService } from './token-service.service';

describe('TokenServiceController', () => {
  let tokenServiceController: TokenServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TokenServiceController],
      providers: [TokenServiceService],
    }).compile();

    tokenServiceController = app.get<TokenServiceController>(TokenServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(tokenServiceController.getHello()).toBe('Hello World!');
    });
  });
});
