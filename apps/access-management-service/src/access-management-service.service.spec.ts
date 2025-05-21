import { Test, TestingModule } from '@nestjs/testing';
import { AccessManagementServiceService } from './access-management-service.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AccessKey } from './entities/access-key.entity';
import { Repository } from 'typeorm';
import { QueuePubsubService } from './queue-pubsub/queue-pubsub.service';

const mockAccessKeyRepository = {
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
};

const mockQueuePubsubService = {
  publishMessage: jest.fn(),
};

describe('AccessManagementServiceService', () => {
  let service: AccessManagementServiceService;
  let repo: Repository<AccessKey>;
  let pubsub: QueuePubsubService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessManagementServiceService,
        {
          provide: getRepositoryToken(AccessKey),
          useValue: mockAccessKeyRepository,
        },
        { provide: QueuePubsubService, useValue: mockQueuePubsubService },
      ],
    }).compile();

    service = module.get<AccessManagementServiceService>(
      AccessManagementServiceService,
    );
    repo = module.get<Repository<AccessKey>>(getRepositoryToken(AccessKey));
    pubsub = module.get<QueuePubsubService>(QueuePubsubService);
  });

  it('should save a new access key', async () => {
    const dto = {
      accessKey: 'key1',
      expiryDate: new Date().toISOString(),
      rateLimitPerMinute: 5,
      isEnabled: true,
    };
    const saved = {
      ...dto,
      expiryDate: new Date(dto.expiryDate),
      id: 1,
      isEnabled: true,
    };
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue(saved);
    const publishSpy = jest.spyOn(pubsub, 'publishMessage');

    const result = await service.saveAccessKey(dto);
    delete dto.isEnabled;
    expect(saveSpy).toHaveBeenCalledWith(dto);
    expect(publishSpy).toHaveBeenCalledWith('accessKeyCreated', dto);
    expect(result).toEqual(saved);
  });

  it('should update an access key', async () => {
    const dto = {
      accessKey: 'key1',
      expiryDate: new Date().toISOString(),
      rateLimitPerMinute: 5,
      isEnabled: true,
    };
    const updateSpy = jest
      .spyOn(repo, 'update')
      .mockResolvedValue({ affected: 1, raw: [], generatedMaps: [] });
    const publishSpy = jest.spyOn(pubsub, 'publishMessage');

    const result = await service.updateAccessKey(dto);

    expect(updateSpy).toHaveBeenCalledWith({ accessKey: dto.accessKey }, dto);
    expect(publishSpy).toHaveBeenCalledWith('accessKeyUpdated', dto);
    expect(result).toEqual({ message: 'Access key updated successfully' });
  });

  it('should return update failed message if no row affected', async () => {
    const dto = {
      accessKey: 'key1',
      expiryDate: new Date().toISOString(),
      rateLimitPerMinute: 5,
      isEnabled: true,
    };
    jest
      .spyOn(repo, 'update')
      .mockResolvedValue({ affected: 0, raw: [], generatedMaps: [] });

    const result = await service.updateAccessKey(dto);

    expect(result).toEqual({ message: 'Access key update failed' });
  });

  it('should delete an access key', async () => {
    const payload = { accessKey: 'key1' };
    jest.spyOn(repo, 'delete').mockResolvedValue({ affected: 1, raw: [] });

    const result = await service.deleteAccessKey(payload);

    expect(result).toEqual({ message: 'Access key deletion successfully' });
  });

  it('should fetch an access key by key', async () => {
    const data = { accessKey: 'key1' };
    jest.spyOn(repo, 'findOne').mockResolvedValue(data as AccessKey);

    const result = await service.fetchAccessKey('key1');
    expect(result).toEqual(data);
  });

  it('should fetch all access keys', async () => {
    const keys = [{ accessKey: 'key1' }, { accessKey: 'key2' }];
    jest.spyOn(repo, 'find').mockResolvedValue(keys as AccessKey[]);

    const result = await service.fetchAllAccessKey();
    expect(result).toEqual(keys);
  });
});
