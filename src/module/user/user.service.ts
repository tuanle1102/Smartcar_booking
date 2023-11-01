import { Injectable } from '@nestjs/common';
import { TwilioService } from '../twilio/twilio.service';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/entities/user.entity';
import {Model} from 'mongoose'
import { RegisterDto } from 'src/dto/register.dto';
import { UserRoles } from 'src/enum/user.enum';
import { LoginDto } from 'src/dto/login.dto';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private readonly twilioService: TwilioService) { }

  async generateOtp(phoneNumber: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.userModel.updateOne({ phoneNumber }, { otp });

    return otp;
  }
  async getAuthByPhoneNumber(phoneNumber: string) {
    return this.userModel.findOne({ phoneNumber }).exec();
  }

  async registerWithPhone(registerDto: RegisterDto, role: UserRoles): Promise<string> {
    const { phoneNumber } = registerDto;
    const otp = await this.generateOtp(phoneNumber);

    // Create a user object
    const user = new this.userModel({
      phoneNumber,
      otp,
      role: "USER",
    });
    // Send OTP (via Twilio or your SMS service)
    this.twilioService.sendOtp(phoneNumber, otp); // Điều chỉnh dựa trên dịch vụ SMS của bạn

    await user.save();

    return `Mã OTP đã được gửi đến số điện thoại ${phoneNumber}`;
  }



  async verifyOtp(phoneNumber: string, otp: string): Promise<any> {
    const user = await this.userModel.findOne({ phoneNumber, otp });

    if (user) {
      // Xác thực OTP thành công, cập nhật trạng thái xác thực và xóa OTP
      user.otp = null;
      user.isVerify = true;

      await user.save();

      // Ở đây, bạn có thể thực hiện việc tạo token xác thực (JWT) nếu bạn sử dụng xác thực token.


      // Trả về thông tin sau khi xác thực thành công, bao gồm cả token nếu bạn đã tạo nó.
      return {
        message: 'Xác thực thành công', // Nếu bạn đã tạo token
        user: user, // Hoặc chỉ trả về thông tin user sau xác thực
      };
    } else {
      // Xác thực thất bại, trả về lỗi hoặc thông báo lỗi.
      return { message: 'Xác thực không thành công' };
    }
  }

  // async verifyOtp2(phoneNumber: string, otp: string): Promise<{ token: string; status: string } | null> {
  //   const driver = await this.driverModel.findOne({ phoneNumber, otp });
  //   if (driver) {
  //     // Update the user's verification status
  //     driver.otp = null;
  //     driver.isVerify = true;
  //     await driver.save();

  //     // Sử dụng JwtAuthService để tạo mã JWT
  //     const token = await this.jwtAuthService.generateJwtToken(driver);

  //     return { token, status: 'verified' };
  //   }
  //   return null;
  // }

  async logout(phoneNumber: string): Promise<void> {
    // Đặt trạng thái xác thực về false
    await this.userModel.updateOne({ phoneNumber }, { isVerified: false });
    // Tạo và lưu lại mã OTP mới
    const otp = await this.generateOtp(phoneNumber);

  }
  // async logout2(phoneNumber: string): Promise<void> {
  //   // Đặt trạng thái xác thực về false
  //   await this.driverModel.updateOne({ phoneNumber }, { isVerified: false });
  //   // Tạo và lưu lại mã OTP mới
  //   const otp = await this.generateOtp(phoneNumber);

  // }
  // async findUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
  //   try {
  //     const user = await this.userModel.findOne({ phoneNumber }).exec();
  //     return user;
  //   } catch (error) {
  //     throw new Error(`Error finding user by phone number: ${error.message}`);
  //   }
  // }
  // async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
  //   return this.userModel.updateOne({ _id: userId }, updateProfileDto).exec();
  // }
  // async updateDriverInfo(userId: string, updateDriverInfoDto: UpdateDriverInfoDto) {
  //   return this.userModel.updateOne({ _id: userId }, updateDriverInfoDto).exec();
  // }
  // async deleteUser(id: string): Promise<string> {
  //   const user = await this.userModel.findByIdAndRemove(id).exec();

  //   if (!user) {
  //     throw new NotFoundException(`User with ID ${id} not found`);
  //   }

  //   return 'Đã xóa thành công !!!';
  // }


  // auth.service.ts
  async loginUser(loginDto: LoginDto) {
    const { phoneNumber, otp } = loginDto;

    // Tìm người dùng dựa trên số điện thoại và mã OTP.
    const user = await this.userModel.findOne({ phoneNumber, otp }).exec();

    if (!user) {
      // Xử lý khi đăng nhập không thành công (trả về lỗi hoặc thông báo).
      return { message: 'Đăng nhập không thành công' };
    }
    return { message: 'Đăng nhập thành công !!! ' }

    // Kiểm tra vai trò của người dùng và thực hiện xử lý tương ứng (driver hoặc user).
  }
  async getDriverByPhoneNumber(phoneNumber: string) {
    const driver = await this.userModel.findOne({ phoneNumber, role: 'DRIVER' }).exec();
    return driver;
  }
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    return this.userModel.updateOne({ _id: userId }, updateProfileDto).exec();
  }
  async deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  async getAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async getUserByPhoneNumber(phoneNumber: string) {
    return this.userModel.findOne({ phoneNumber }).exec();
  }
}
