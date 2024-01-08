import { Controller, Post, Body, Get, Param, Query, Put, Delete, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { BookingService } from './booking.service';
import { CreateBookingDto } from '../../dto/create-booking.dto';
import { DriverService } from '../driver/driver.service';
import { SearchBookingDto } from 'src/dto/searchbooking.dto';
import { UpdateBookingDto } from 'src/dto/update-booking.dto';
import { RatingDto } from 'src/dto/rating.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Booking } from 'src/entities/booking.entity';
import { UpdateReviewDto } from 'src/dto/update-review.dto';
import { User, UserDocument } from 'src/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Booking')
@Controller('booking')
export class BookingController {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private driverService: DriverService,
    private bookingService: BookingService,
  ) { }

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
        totalPrice: createBookingDto.totalPrice,
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
  @Get()
  async getAllBookings() {
    const bookings = await this.bookingService.getAllBookings();
    return bookings;
  }
  @Get(':idOrDate')
async findBooking(@Param('idOrDate') idOrDate: string, @Query() query: SearchBookingDto) {
  if (idOrDate === 'id') {
    // Tìm booking theo id
    return this.bookingService.findById(query.id);
  } else if (idOrDate === 'date') {
    // Tìm booking theo ngay
    return this.bookingService.findByDate(query.ngay);
  } else {
    // Xử lý lỗi hoặc trả về thông báo không hợp lệ
  }
}
@Get('id/:bookingId')
async findBookingById(@Param('bookingId') bookingId: string) {
  // Tìm booking theo id
  return this.bookingService.findById(bookingId);
}
@Get('date/:ngay')
async findBookingByDate(@Param('ngay') ngay: Date) {
  // Tìm booking theo ngay
  return this.bookingService.findByDate(ngay);
}
@Put(':id')
async updateBooking(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
  // Gọi service để cập nhật booking với ID tương ứng
  return this.bookingService.updateBooking(id, updateBookingDto);
}

@Delete(':id')
async deleteBooking(@Param('id') id: string) {
  // Gọi service để xóa booking với ID tương ứng
  return this.bookingService.deleteBooking(id);
}
@Post(':id/rate')
async rateBooking(@Param('id') id: string, @Body() ratingDto: RatingDto) {
  // Gọi service để thêm đánh giá và nhận xét cho chuyến đi với ID tương ứng
  return this.bookingService.rateBooking(id, ratingDto);
}
@Get(':id/reviews')
async getBookingReviews(@Param('id') id: string) {
  return this.bookingService.getReviewsByBookingId(id);
}
@Put(':bookingId/reviews/:reviewId')
async updateReview(
  @Param('bookingId') bookingId: string,
  @Param('reviewId') reviewId: string,
  @Body() updateReviewDto: UpdateReviewDto,
) {
  try {
    const updatedReview = await this.bookingService.updateReview(bookingId, reviewId, updateReviewDto);
    return updatedReview;
  } catch (error) {
    throw new NotFoundException(error.message);
  }
}
@Delete(':bookingId/reviews/:reviewId')
  async deleteReview(
    @Param('bookingId') bookingId: string,
    @Param('reviewId') reviewId: string,
  ) {
    try {
      await this.bookingService.deleteReview(bookingId, reviewId);
      return { message: 'Review deleted successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  
}