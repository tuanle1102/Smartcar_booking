export class CreateDriverDto {}
// create-driver.dto.ts
import { IsString } from 'class-validator';

export class GetDriverByPhoneNumberDto {
  @IsString()
  phoneNumber: string;
}
