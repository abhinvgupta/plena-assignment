import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AccessManagementServiceService } from './access-management-service.service';
import { CreateAccessKeyDto, DeleteAccessKeyDto } from './dtos/access-key.dto';
import { AccessKey } from './entities/access-key.entity';

@Controller('access-key')
export class AccessManagementServiceController {
  constructor(
    private readonly accessManagementServiceService: AccessManagementServiceService,
  ) {}

  @Post('create')
  createAccessKey(@Body() dto: CreateAccessKeyDto): Promise<AccessKey> {
    return this.accessManagementServiceService
      .saveAccessKey(dto)
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Put('update')
  updateAccessKey(@Body() dto: CreateAccessKeyDto) {
    return this.accessManagementServiceService
      .updateAccessKey(dto)
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Delete('delete')
  deleteAccessKey(@Body() dto: DeleteAccessKeyDto) {
    return this.accessManagementServiceService
      .deleteAccessKey(dto)
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Get('/fetch/:accessKey')
  fetchAccessKey(@Param('accessKey') accessKey: string): Promise<AccessKey> {
    return this.accessManagementServiceService
      .fetchAccessKey(accessKey)
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }

  @Get('fetch-all')
  fetchAllAccessKey(): Promise<AccessKey[]> {
    return this.accessManagementServiceService
      .fetchAllAccessKey()
      .catch((err: Error) => {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      });
  }
}
