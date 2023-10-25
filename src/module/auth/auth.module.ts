import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/database/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TwilioService } from '../twilio/twilio.service';
import { JwtAuthService } from 'src/services/jwt.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService,TwilioService,JwtAuthService],
})
export class AuthModule {}
