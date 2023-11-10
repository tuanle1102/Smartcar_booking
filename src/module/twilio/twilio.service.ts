// twilio.service.ts
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private readonly twilioClient: Twilio;

  constructor() {
    const accountSid = 'ACff809d6d706d9de12ab9f277ec65585f';
    const authToken = 'ca65f86a1cf903f0eb611c62172e60a0';
  
    this.twilioClient = new Twilio(accountSid,authToken
      
    );
  }

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    const phone_number = '+15088863089';
    await this.twilioClient.messages.create({
      to: phoneNumber,
      from: phone_number,
      body: `Your OTP is: ${otp}`,
    });
  }
}
