import {
  IsString,
  IsInt,
  IsISO8601,
  Min,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateAccessKeyDto {
  @IsString()
  accessKey: string;

  @IsInt()
  @Min(1)
  rateLimitPerMinute: number;

  @IsISO8601()
  expiryDate: string;

  @IsOptional()
  @IsBoolean()
  isEnabled: boolean;
}

export class DeleteAccessKeyDto {
  @IsString()
  accessKey: string;
}
