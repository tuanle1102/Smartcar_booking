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
    @IsString()
    @ApiProperty({
        description: 'Ngày sinh',
        example: '11/02/2002',
      })
    readonly birthday:string ;
    @IsString()
    @ApiProperty({
        description: 'Căn cước công dân',
        example: '123456789',
      })
    readonly cccd: any;
    @IsString()
    @ApiProperty({
        description: 'Giấy phép lái xe',
        example: '123456789',
      })
    readonly gplx: string;
  
  
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'Email',
        example: 'youremail@gmail.com',
      })
      @IsString()
      @ApiProperty({
          description: 'Địa chỉ',
          example: 'Đại học Lạc Hồng, Biên Hòa, Đồng Nai',
        })
      readonly address: string;
    readonly email: string;
    @IsString()
    @ApiProperty({
        description: 'GPLX',
        example: '12345678',
      })
    readonly licenseNumber: string;
  
    @IsDate()
    @ApiProperty({
        description: 'Ngày bắt đầu',
        example: '2023-01-10T17:00:00.000+00:00',
      })
    readonly startDrivingDate: Date;
   
    @IsString()
    @ApiProperty({
        description: 'Ảnh đại diện',
        example: 'Avatar',
      })
    readonly avatar: string;

  
    @IsString()
    @ApiProperty({
        description: 'Vị trí của bạn',
        example: '{"lat":"123","lon":"456"}'
      })
    readonly location: string;
    @IsString()
    @ApiProperty({
        description: 'Trạng thái khả dụng',
        example: 'true',
      })
    readonly isAvailable: boolean;
    
    
  }


  

