import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { BookingModule } from '../booking/booking.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from 'src/entities/payment.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Payment', schema: PaymentSchema },
    ]),BookingModule
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
