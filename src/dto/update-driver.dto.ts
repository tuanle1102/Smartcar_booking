import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateDriverInfoDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Họ và tên',
        example: 'nhập họ và tên của bạn',
      })
    readonly fullName: string;
  
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Email',
        example: 'youremail@gmail.com',
      })
    readonly email: string;
    @IsString()
    @ApiProperty({
        description: 'GPLX',
        example: 'GPLX của bạn',
      })
    readonly licenseNumber: string;
  
    @IsDate()
    @ApiProperty({
        description: 'Ngày bắt đầu',
        example: 'DD/MM/YY',
      })
    readonly startDate: Date;
  }