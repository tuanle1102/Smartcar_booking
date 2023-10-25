
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Số điện thoại',
    example: '+84392365301',
  })
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  otp: string;
}
