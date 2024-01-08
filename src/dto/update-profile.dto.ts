import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate } from 'class-validator';

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Họ và tên',
        example: 'Lê Tuấn',
      })
    readonly fullName: string;
    @IsString()
    @ApiProperty({
        description: 'Địa chỉ',
        example: 'nhập địa chỉ của bạn',
      })
    readonly address: string;
    @IsString()
    @ApiProperty({
        description: 'Ảnh đại diện',
        example: 'Avatar',
      })
    readonly avatar: string;
    @IsString()
    @ApiProperty({
        description: 'Căn cước công dân',
        example: '9999999',
      })
    readonly cccd: string;
    @IsString()
    @ApiProperty({
        description: 'Vị trí',
        example: 'lat":"12345","lon":"456782"',
      })
    readonly location: string;
  }