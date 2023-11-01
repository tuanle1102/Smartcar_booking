import { Module } from '@nestjs/common';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Driver, DriverSchema } from '../../entities/driver.entity';
import { TwilioService } from 'src/module/twilio/twilio.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }])
  ],
  controllers: [DriverController],
  providers: [DriverService,TwilioService],
  exports: [DriverService,MongooseModule.forFeature([{ name: Driver.name, schema: DriverSchema }])],
})
export class DriverModule { }
