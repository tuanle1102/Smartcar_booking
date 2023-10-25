// register.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { UserRoles } from 'src/enum/user.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Số điện thoại',
    example: '+84392365301',
  })
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Vai trò',
    example: 'DRIVER || USER',
  })
  role: UserRoles;
}

