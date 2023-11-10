import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../../entities/booking.entity';
import { CreateBookingDto } from '../../dto/create-booking.dto';
import { Driver } from 'src/entities/driver.entity';
import { User } from 'src/entities/user.entity';
import { UpdateBookingDto } from 'src/dto/update-booking.dto';
import { RatingDto } from 'src/dto/rating.dto';
import { Review } from 'src/entities/rating.entity';
import { UpdateReviewDto } from 'src/dto/update-review.dto';

@Injectable()
export class BookingService {
 
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  // Bây giờ bạn có thể định nghĩa phương thức createBooking
  async createBooking(bookingData: CreateBookingDto): Promise<Booking> {
    // Thực hiện tạo và lưu bản ghi Booking
    const createdBooking = new this.bookingModel(bookingData);
    return createdBooking.save();
  }
  async getAllBookings() {
    // Sử dụng .find() để lấy tất cả các đơn đặt xe và sử dụng .populate() để lấy thông tin người dùng và tài xế
    const bookings = await this.bookingModel.find()
      .populate('userId', 'fullname phoneNumber location avatar') // Thay 'fullname phoneNumber' bằng các trường bạn muốn lấy từ bảng User
      .populate('driverId', 'fullname phoneNumber location avatar') // Tương tự, thay 'fullname phoneNumber' bằng các trường bạn muốn lấy từ bảng Driver
      .exec();

    return bookings;
  }
  // booking.service.ts
async findById(id: string): Promise<Booking> {
  return this.bookingModel.findById(id).exec();
}

async findByDate(ngay: Date): Promise<Booking[]> {
  return this.bookingModel.find({ createdAt: ngay }).exec();
}
async updateBooking(id: string, updateBookingDto: UpdateBookingDto): Promise<Booking> {
  // Tìm booking với ID
  const booking = await this.bookingModel.findById(id).exec();
  
  if (!booking) {
    throw new NotFoundException('Booking not found');
  }
  
  // Áp dụng các thay đổi từ updateBookingDto vào booking
  if (updateBookingDto.startLocation) {
    booking.startLocation = updateBookingDto.startLocation;
  }
  if (updateBookingDto.endLocation) {
    booking.endLocation = updateBookingDto.endLocation;
  }
  if (updateBookingDto.isCompleted) {
    booking.isCompleted = updateBookingDto.isCompleted;
  }
  if (updateBookingDto.driverId) {
    booking.driverId = updateBookingDto.driverId;
  }
  // Thêm xử lý cho các trường khác
  
  // Lưu booking đã cập nhật
  return booking.save();
}

async deleteBooking(id: string): Promise<Booking> {
  // Tìm và xóa booking với ID
  const booking = await this.bookingModel.findByIdAndRemove(id).exec();
  
  if (!booking) {
    throw new NotFoundException('Booking not found');
  }
  
  return booking;
}
async rateBooking(_id: string, ratingDto: RatingDto): Promise<Booking> {
  // Tìm chuyến đi với ID
  const booking = await this.bookingModel.findById(_id).exec();

  if (!booking) {
    throw new NotFoundException('Booking not found');
  }

  // Tạo một đánh giá và nhận xét mới
  const review = new Review(); // Không truyền tham số vào hàm khởi tạo
  review.userId = ratingDto.userId;
  review.rating = ratingDto.rating;
  review.comment = ratingDto.comment;


  // Thêm đánh giá và nhận xét vào chuyến đi
  booking.reviews.push(review);

  // Tính toán điểm trung bình dựa trên tất cả đánh giá
  let totalRating = 0;
  for (const review of booking.reviews) {
    totalRating += review.rating;
  }
  booking.avgRating = totalRating / booking.reviews.length;

  // Lưu chuyến đi đã được đánh giá
  return booking.save();
}
async getReviewsByBookingId(bookingId: string) {
  const booking = await this.bookingModel.findById(bookingId).exec();
  if (!booking) {
    throw new NotFoundException('Booking not found');
  }

  return booking.reviews;
 }
async updateReview(bookingId: string, reviewId: string, updateReviewDto: UpdateReviewDto) {
  const booking = await this.bookingModel.findById(bookingId).exec();
  if (!booking) {
    throw new NotFoundException('Booking not found');
  }

  // Find the index of the review to update
  const reviewIndex = booking.reviews.findIndex((r) => r._id.toString() === reviewId);

  if (reviewIndex === -1) {
    throw new NotFoundException('Review not found');
  }

  // Update the review at the found index
  if (updateReviewDto.rating) {
    booking.reviews[reviewIndex].rating = updateReviewDto.rating;
  }

  if (updateReviewDto.comment) {
    booking.reviews[reviewIndex].comment = updateReviewDto.comment;
  }

  // Save the updated booking
  await booking.save();

  return booking.reviews[reviewIndex];
}

async deleteReview(bookingId: string, reviewId: string) {
  const booking = await this.bookingModel.findById(bookingId).exec();
  if (!booking) {
    throw new NotFoundException('Booking not found');
  }

  // Find the index of the review to delete
  const reviewIndex = booking.reviews.findIndex((r) => r._id.toString() === reviewId);

  if (reviewIndex === -1) {
    throw new NotFoundException('Review not found');
  }

  // Remove the review at the found index
  booking.reviews.splice(reviewIndex, 1);

  // Save the updated booking
  await booking.save();
}

}
