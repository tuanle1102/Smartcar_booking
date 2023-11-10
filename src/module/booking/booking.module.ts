import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { Booking, BookingSchema } from 'src/entities/booking.entity';
import { ReviewSchema } from 'src/entities/rating.entity';
import { DriverService } from '../driver/driver.service';
import { DriverModule } from '../driver/driver.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Booking', schema: BookingSchema },
    ]),DriverModule,UserModule
  ],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService,MongooseModule.forFeature([{ name: Booking.name, schema: BookingSchema }])],
})
export class BookingModule {}
