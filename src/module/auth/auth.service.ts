// auth.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TwilioService } from '../twilio/twilio.service';
import { User } from 'src/database/user.schema';
import { JwtAuthService } from 'src/services/jwt.service';
import { RegisterDto } from 'src/dto/register.dto';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';
import { UpdateDriverInfoDto } from 'src/dto/update-driver.dto';
import { UserRoles } from 'src/enum/user.enum';


@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly twilioService: TwilioService, private jwtAuthService: JwtAuthService) { }


  async generateJwtToken(user: any): Promise<string> {
    return this.jwtAuthService.generateJwtToken(user);
  }
  async generateOtp(phoneNumber: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.userModel.updateOne({ phoneNumber }, { otp });

    return otp;
  }
  async registerWithPhone(registerDto: RegisterDto, role: UserRoles): Promise<string> {
    const { phoneNumber } = registerDto;
    const otp = await this.generateOtp(phoneNumber);
  
    // Create a user object
    const user = new this.userModel({
      phoneNumber,
      otp,
      role, // Thêm trường role từ yêu cầu Postman
    });
  
    // Save the user object to the database
  
    // Send OTP (via Twilio or your SMS service)
    this.twilioService.sendOtp(phoneNumber, otp); // Điều chỉnh dựa trên dịch vụ SMS của bạn
  
    await user.save();
  
    return `Mã OTP đã được gửi đến số điện thoại ${phoneNumber}`;
  }
  
  // auth.service.ts
  // ...

  async verifyOtp(phoneNumber: string, otp: string): Promise<{ token: string; status: string } | null> {
    const user = await this.userModel.findOne({ phoneNumber, otp });
    if (user) {
      // Update the user's verification status
      user.otp = null;
      user.isVerify = true;
      await user.save();

      // Sử dụng JwtAuthService để tạo mã JWT
      const token = await this.jwtAuthService.generateJwtToken(user);

      return { token, status: 'verified' };
    }
    return null;
  }

  async logout(phoneNumber: string): Promise<void> {
    // Đặt trạng thái xác thực về false
    await this.userModel.updateOne({ phoneNumber }, { isVerified: false });
    // Tạo và lưu lại mã OTP mới
    const otp = await this.generateOtp(phoneNumber);

  }


  async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ phoneNumber }).exec();
      return user;
    } catch (error) {
      throw new Error(`Error finding user by phone number: ${error.message}`);
    }
  }
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.userModel.updateOne({ _id: userId }, updateProfileDto).exec();
  }
  async updateDriverInfo(userId: string, updateDriverInfoDto: UpdateDriverInfoDto) {
    return this.userModel.updateOne({ _id: userId }, updateDriverInfoDto).exec();
  }
}



