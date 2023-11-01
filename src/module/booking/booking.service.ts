import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
  ) {}
  
  // Bây giờ bạn có thể định nghĩa phương thức createBooking
  async createBooking(bookingData: CreateBookingDto): Promise<Booking> {
    // Thực hiện tạo và lưu bản ghi Booking
    const createdBooking = new this.bookingModel(bookingData);
    return createdBooking.save();
  }
}
