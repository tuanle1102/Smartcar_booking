// jwt.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  async generateJwtToken(user: any): Promise<string> {
    const payload = { 
      username: user.username,
       sub: user.userId,
       phoneNumber: user.phoneNumber,
      role: user.role };

    return this.jwtService.sign(payload);
  }
}
