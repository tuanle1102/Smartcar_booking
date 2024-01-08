import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBookingDto {
    @IsString()
    @ApiProperty({
        description: 'id người dùng',
        example: '65990cfed5f27ba1152161f6',
      })
    readonly userId: string;
    @IsString()
    @ApiProperty({
        description: 'id tài xế',
        example: '6599129ae933db4619a3972f',
      })
    readonly driverId: string;
    @IsString()
    @ApiProperty({
        description: 'Vị trí bắt đầu',
        example: '{lat : 123.145,lon:452.12}',
      })
    readonly startLocation:  { lat: number, lon: number };
    @IsString()
    @ApiProperty({
        description: 'Vị trí kết thúc',
        example: '{ lat: 452.12,lon: 589.21 }',
      })
    readonly endLocation: { lat: number, lon: number };
    @IsString()
    @ApiProperty({
        description: 'Giá tiền',
        example: '50000',
      })
    readonly totalPrice: number;
    
}