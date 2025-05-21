import { Injectable, Logger } from '@nestjs/common';
import { TokenData } from './interfaces/fetch-token.interface';

@Injectable()
export class TokenServiceService {
  private readonly logger = new Logger(TokenServiceService.name);

  fetchToken(symbol: string): TokenData {
    this.logger.log('Fetching token', symbol);
    return {
      symbol: 'ETH',
      token: 'Ethereum',
      currentPrice: 100,
      marketCap: 10000000,
    };
  }
}
