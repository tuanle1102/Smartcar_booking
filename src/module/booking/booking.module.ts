import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking, BookingSchema } from './entities/booking.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverModule } from '../driver/driver.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }]),
  DriverModule
],
  controllers: [BookingController],
  providers: [BookingService],

})
export class BookingModule {}
