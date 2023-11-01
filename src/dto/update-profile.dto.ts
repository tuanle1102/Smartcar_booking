import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Họ và tên',
        example: 'nhập họ và tên của bạn',
      })
    readonly fullName: string;
  }