import { Test, TestingModule } from '@nestjs/testing';
import { TokenServiceService } from './token-service.service';

describe('TokenServiceService', () => {
  let service: TokenServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TokenServiceService],
    }).compile();

    service = module.get<TokenServiceService>(TokenServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return token data for a symbol', () => {
    const symbol = 'ETH';
    const result = service.fetchToken(symbol);

    expect(result).toEqual({
      symbol: 'ETH',
      token: 'Ethereum',
      currentPrice: 100,
      marketCap: 10000000,
    });
  });
});
