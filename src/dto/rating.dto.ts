import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RatingDto {
  @IsString()
    @ApiProperty({
        description: 'Đánh giá',
        example: '1-5',
      })
    readonly rating: number;
    @IsString()
    @ApiProperty({
        description: 'Nhận xét',
        example: 'Tài xế thân thiện !!',
      })
    readonly  comment: string; // Nhận xét
    @IsString()
    @ApiProperty({
        description: 'id của người dùng',
        example: '',
      })
    readonly  userId: string; // Nhận xét
  }
  