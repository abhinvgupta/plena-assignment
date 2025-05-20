import { Test, TestingModule } from '@nestjs/testing';
import { AccessManagementServiceController } from './access-management-service.controller';
import { AccessManagementServiceService } from './access-management-service.service';

describe('AccessManagementServiceController', () => {
  let accessManagementServiceController: AccessManagementServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccessManagementServiceController],
      providers: [AccessManagementServiceService],
    }).compile();

    accessManagementServiceController =
      app.get<AccessManagementServiceController>(
        AccessManagementServiceController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(accessManagementServiceController.getHello()).toBe('Hello World!');
    });
  });
});
