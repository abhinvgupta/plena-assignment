import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { TokenServiceService } from './token-service.service';
import { AccessKeyInterceptor } from './interceptors/access-key.interceptor';
@Controller()
export class TokenServiceController {
  constructor(private readonly tokenServiceService: TokenServiceService) {}

  @UseInterceptors(AccessKeyInterceptor)
  @Get('token/:symbol')
  fetchToken(@Param('symbol') symbol: string): any {
    return this.tokenServiceService.fetchToken(symbol);
  }
}
