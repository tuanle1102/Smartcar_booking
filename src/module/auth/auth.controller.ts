// auth.controller.ts

import { Controller, Post, Body, NotFoundException, Param, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from 'src/dto/register.dto';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';
import { UpdateDriverInfoDto } from 'src/dto/update-driver.dto';
import { VerifyOtpDto } from 'src/dto/verify-dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async registerWithPhone(@Body() registerDto: RegisterDto) {
    const { role } = registerDto; // Lấy giá trị 'role' từ yêu cầu

    // Gọi hàm đăng ký với trường 'role' đã lấy được
    const result = await this.authService.registerWithPhone(registerDto, role);

    return result;
  }
  @Post('verify-otp')
  @ApiOperation({ summary: 'Xác thực OTP' })
  @ApiResponse({ status: 200, description: 'Xác thực thành công' })
  @ApiResponse({ status: 401, description: 'Xác thực thất bại' })
  @ApiBody({ type: VerifyOtpDto }) // Sử dụng decorators ApiBody để mô tả dữ liệu đầu vào
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const result = await this.authService.verifyOtp(verifyOtpDto.phoneNumber, verifyOtpDto.otp);
    if (result) {
      return { message: 'Xác thực thành công', token: result.token, status: result.status };
    } else {
      return { message: 'Xác thực thất bại' };
    }
  }

  @Post('logout/:phoneNumber')
  async logout(@Param('phoneNumber') phoneNumber: string) {
    try {
      await this.authService.logout(phoneNumber);
      return { message: 'Logout successful' };
    } catch (error) {
      return { message: 'Logout failed' };
    }
  }
  @Put('profile/:userId')
  async updateProfile(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.authService.updateProfile(userId, updateProfileDto);
  }
  @Put('driver-info/:userId')
  async updateDriverInfo(@Param('userId') userId: string, @Body() updateDriverInfoDto: UpdateDriverInfoDto) {
    return this.authService.updateDriverInfo(userId, updateDriverInfoDto);
  }
}
