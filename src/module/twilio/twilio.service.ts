import { Injectable, Logger } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private readonly twilioClient: Twilio;
  private readonly logger = new Logger(TwilioService.name);

  constructor() {
    const accountSid = 'ACc42b3f1732a25ceba618af9e407d0304';
    const authToken = 'f3d52dd488a3c890532d40446fea25f1';

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendOtp(phoneNumber: string, otp: string): Promise<void> {
    const fromPhoneNumber = '+12018796875';

    try {
      await this.twilioClient.messages.create({
        to: phoneNumber,
        from: fromPhoneNumber,
        body: `Your OTP is: ${otp}`,
      });
    } catch (error) {
      this.logger.error(`Error sending OTP: ${error.message}`);
      throw error; // Re-throw the error to propagate it up the call stack.
    }
  }
}
