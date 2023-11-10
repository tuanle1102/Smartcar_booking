import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverModule } from './module/driver/driver.module';
import { UserModule } from './module/user/user.module';
import { BookingModule } from './module/booking/booking.module';
import { PaymentModule } from './module/payment/payment.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://1102lequoctuan:pass@cluster0.ic0tt4u.mongodb.net/'), DriverModule,UserModule,BookingModule,PaymentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
