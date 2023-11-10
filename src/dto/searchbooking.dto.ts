import { IsDate, IsString } from 'class-validator';

export class SearchBookingDto {
  @IsString()
  id: string; // Field cho việc tìm kiếm theo ID

  @IsDate()
  ngay: Date; // Field cho việc tìm kiếm theo ngày
}
