import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from 'src/entities/payment.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}
  // @Get()
  // async getAllPaymentsWithDetails(): Promise<Payment[]> {
  //   return this.paymentService.getAllPaymentsWithDetails();
  // }
  @Get()
  async getAllBookings() {
    const bookings = await this.paymentService.getAllPaymentsWithDetails();
    return bookings;
  }
  @Post(':bookingId')
  async performPayment(@Param('bookingId') bookingId: string) {
    return this.paymentService.performPayment(bookingId);
  }
  @Delete(':id')
async deletePayment(@Param('id') id: string) {
  // Gọi service để xóa booking với ID tương ứng
  return this.paymentService.deletePayment(id);
}
}
