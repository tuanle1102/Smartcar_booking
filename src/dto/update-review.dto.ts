// update-review.dto.ts
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateReviewDto {
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
    readonly  comment: string;
  }
  

