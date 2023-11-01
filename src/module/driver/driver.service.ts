import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Driver } from '../../entities/driver.entity';
import { TwilioService } from 'src/module/twilio/twilio.service';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/dto/register.dto';
import { UserRoles } from 'src/enum/user.enum';
import { LoginDto } from 'src/dto/login.dto';
import { UpdateDriverInfoDto } from 'src/dto/update-driver.dto';
import * as geolib from 'geolib';


@Injectable()
export class DriverService {
  constructor(@InjectModel(Driver.name) private driverModel: Model<Driver>, private readonly twilioService: TwilioService) { }


  async generateOtp(phoneNumber: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.driverModel.updateOne({ phoneNumber }, { otp });

    return otp;
  }
  async getAuthByPhoneNumber(phoneNumber: string) {
    return this.driverModel.findOne({ phoneNumber }).exec();
  }

  async registerWithPhone(registerDto: RegisterDto, role: UserRoles): Promise<string> {
    const { phoneNumber } = registerDto;
    const otp = await this.generateOtp(phoneNumber);

    // Create a user object
    const user = new this.driverModel({
      phoneNumber,
      otp,
      role: "DRIVER",
    });
    // Send OTP (via Twilio or your SMS service)
    this.twilioService.sendOtp(phoneNumber, otp); // Điều chỉnh dựa trên dịch vụ SMS của bạn

    await user.save();

    return `Mã OTP đã được gửi đến số điện thoại ${phoneNumber}`;
  }



  async verifyOtp(phoneNumber: string, otp: string): Promise<any> {
    const user = await this.driverModel.findOne({ phoneNumber, otp });

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


  async logout(phoneNumber: string): Promise<void> {
    // Đặt trạng thái xác thực về false
    await this.driverModel.updateOne({ phoneNumber }, { isVerified: false });
    // Tạo và lưu lại mã OTP mới
    const otp = await this.generateOtp(phoneNumber);

  }
  async loginUser(loginDto: LoginDto) {
    const { phoneNumber, otp } = loginDto;

    // Tìm người dùng dựa trên số điện thoại và mã OTP.
    const user = await this.driverModel.findOne({ phoneNumber, otp }).exec();

    if (!user) {
      // Xử lý khi đăng nhập không thành công (trả về lỗi hoặc thông báo).
      return { message: 'Đăng nhập không thành công' };
    }
    return { message: 'Đăng nhập thành công !!! ' }

    // Kiểm tra vai trò của người dùng và thực hiện xử lý tương ứng (driver hoặc user).
  }
  async getDriverByPhoneNumber(phoneNumber: string) {
    return this.driverModel.findOne({ phoneNumber }).exec();
  }
  async updateDriverInfo(userId: string, updateDriverInfoDto: UpdateDriverInfoDto) {
    return this.driverModel.updateOne({ _id: userId }, updateDriverInfoDto).exec();
  }
  async deleteDriver(id: string) {
    return this.driverModel.findByIdAndDelete(id);
  }
  async getAll(): Promise<Driver[]> {
    return this.driverModel.find().exec();
  }
  async findNearestDriver(startLocation: { lat: number; lon: number }): Promise<Driver> {
    // Lấy danh sách tất cả các tài xế có trạng thái "khả dụng"
    const availableDrivers = await this.driverModel.find({ isAvailable: true }).exec();

    if (availableDrivers.length === 0) {
      // Không có tài xế khả dụng
      return null;
    }

    // Sử dụng geolib để tính khoảng cách giữa điểm xuất phát và vị trí của tài xế
    let nearestDriver: Driver = null;
    let minDistance = Number.MAX_VALUE;

    availableDrivers.forEach((driver) => {
      const driverLocation = driver.location;
      const distance = geolib.getDistance(startLocation, driverLocation);

      if (distance < minDistance) {
        minDistance = distance;
        nearestDriver = driver;
      }
    });

    return nearestDriver;
  }
}

