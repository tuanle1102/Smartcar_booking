import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from 'src/dto/register.dto';
import { LoginDto } from 'src/dto/login.dto';
import { VerifyOtpDto } from 'src/dto/verify-dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from 'src/dto/update-profile.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  async registerWithPhone(@Body() registerDto: RegisterDto) {
    const { role } = registerDto; // Lấy giá trị 'role' từ yêu cầu

    // Gọi hàm đăng ký với trường 'role' đã lấy được
    const result = await this.userService.registerWithPhone(registerDto, role);

    return result;
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Xác thực OTP' })
  @ApiResponse({ status: 200, description: 'Xác thực thành công' })
  @ApiResponse({ status: 401, description: 'Xác thực thất bại' })
  @ApiBody({ type: VerifyOtpDto }) // Sử dụng decorators ApiBody để mô tả dữ liệu đầu vào
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const result = await this.userService.verifyOtp(verifyOtpDto.phoneNumber, verifyOtpDto.otp);
    if (result) {
      return { message: 'Xác thực thành công', token: result.token, status: result.status };
    } else {
      return { message: 'Xác thực thất bại' };
    }
  }

  @Post('logout/:phoneNumber')
  async logout(@Param('phoneNumber') phoneNumber: string) {
    try {
      await this.userService.logout(phoneNumber);
      return { message: 'Logout successful' };
    } catch (error) {
      return { message: 'Logout failed' };
    }
  }
  // @Put('profile/:userId')
  // async updateProfile(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
  //   return this.authService.updateProfile(userId, updateProfileDto);
  // }
  // @Put('driver-info/:userId')
  // async updateDriverInfo(@Param('userId') userId: string, @Body() updateDriverInfoDto: UpdateDriverInfoDto) {
  //   return this.authService.updateDriverInfo(userId, updateDriverInfoDto);
  // }
  // @Delete(':id') 
  // deleteUser(@Param('id') id: string) {
  //   return this.authService.deleteUser(id);
  // }
  @Post('login')
  async loginUser(@Body() loginDto: LoginDto) {
    const user = await this.userService.loginUser(loginDto);
    if (user) {
      return { message: 'Đăng nhập thành công', user: user };
    } else {
      return { message: 'Đăng nhập không thành công' };
    }
  }
  @Put('profile/:userId')
  async updateProfile(@Param('userId') userId: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(userId, updateProfileDto);
  }
  @Get()
  findAll() {
    return this.userService.getAll();
  }
 
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
  @Get('by-phone/:phoneNumber')
  async getUserByPhoneNumber(@Param('phoneNumber') phoneNumber: string) {
    const user = await this.userService.getUserByPhoneNumber(phoneNumber);
    return user;
  }
}
