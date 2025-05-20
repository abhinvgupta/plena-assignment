import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TokenServiceService {
  private readonly logger = new Logger(TokenServiceService.name);

  fetchToken(symbol: string): any {
    this.logger.log('Fetching token', symbol);
    return {
      symbol: 'ETH',
      token: 'Ethereum',
      currentPrice: 100,
      marketCap: 10000000,
    };
  }
}
