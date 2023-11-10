import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/entities/user.entity';
import { TwilioService } from '../twilio/twilio.service';


@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService,TwilioService],
  exports: [UserService,MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UserModule {}
