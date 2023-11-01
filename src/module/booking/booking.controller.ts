import { Controller, Post, Body } from '@nestjs/common';

import { BookingService } from './booking.service'; // Import service cho Booking
import { CreateBookingDto } from './dto/create-booking.dto';
import { DriverService } from '../driver/driver.service';

@Controller('booking')
export class BookingController {
  constructor(
    private driverService: DriverService,
    private bookingService: BookingService,
  ) {}

  @Post('match')
async matchNearestDriver(@Body() createBookingDto: CreateBookingDto) {
  // Tìm tài xế gần nhất dựa trên vị trí xuất phát của người dùng
  const nearestDriver = await this.driverService.findNearestDriver(createBookingDto.startLocation);

  if (nearestDriver) {
    // Tạo bản ghi Booking
    const bookingData: CreateBookingDto = {
      userId: createBookingDto.userId,
      startLocation: createBookingDto.startLocation,
      endLocation: createBookingDto.endLocation,
      driverId: nearestDriver._id.toString(), // Chuyển đổi _id thành chuỗi
      // Thêm các thông tin khác cần thiết
    };

    // Lưu thông tin đặt xe
    const newBooking = await this.bookingService.createBooking(bookingData);

    // Trả về tài xế đã được match
    return newBooking;
  } else {
    // Không có tài xế khả dụng
    return 'Không có tài xế khả dụng';
  }
}

}