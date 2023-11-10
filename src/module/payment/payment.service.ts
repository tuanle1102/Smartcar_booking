import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Booking } from 'src/entities/booking.entity';
import { Payment } from 'src/entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) { }
  async getAllPaymentsWithDetails() {
    // Sử dụng .find() để lấy tất cả các đơn đặt xe và sử dụng .populate() để lấy thông tin người dùng và tài xế
    const payment = await this.bookingModel.find()
      .populate('userId', 'fullname phoneNumber location avatar') // Thay 'fullname phoneNumber' bằng các trường bạn muốn lấy từ bảng User
      .populate('driverId', 'fullname phoneNumber location avatar') // Tương tự, thay 'fullname phoneNumber' bằng các trường bạn muốn lấy từ bảng Driver
      .exec();

    return payment;
  }
  async performPayment(bookingId: string) {
    // Tìm thông tin booking dựa trên bookingId
    const booking = await this.bookingModel.findById(bookingId).exec();

    if (!booking) {
      throw new Error('Không tìm thấy booking');
    }

    // Kiểm tra xem đã thanh toán chưa
    if (booking.isPaid) {
      throw new Error('Booking này đã được thanh toán trước đó');
    }

    // Tạo một bản ghi Payment
    const payment = new this.paymentModel({
      userId: booking.userId,
      driverId: booking.driverId,
      bookingId: booking.bookingId,
      totalPrice: booking.totalPrice,
      isPaid: true,
    });

    // Lưu thông tin thanh toán
    await payment.save();

    // Cập nhật trạng thái thanh toán cho booking
    booking.isPaid = true;
    await booking.save();

    return 'Thanh toán thành công';
  }
  async deletePayment(paymentId: string) {
    try {
      // Tìm thông tin thanh toán dựa trên paymentId
      const payment = await this.paymentModel.findById(paymentId).exec();

      if (!payment) {
        throw new Error('Không tìm thấy thanh toán');
      }

      // Đặt lại trạng thái thanh toán thành `false`
      payment.isPaid = false;
      await payment.save();

      // Cập nhật trạng thái thanh toán cho booking liên quan
      const booking = await this.bookingModel.findById(payment.bookingId).exec();
      if (booking) {
        booking.isPaid = false;
        await booking.save();
      }

      return 'Xóa thanh toán thành công và đặt lại trạng thái thanh toán cho booking';
    } catch (error) {
      return 'Lỗi khi xóa thanh toán: ' + error.message;
    }
  }
}
