import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';

export class UpdateBookingDto extends PartialType(CreateBookingDto) { 

    startLocation: { lat: number, lon: number };
    endLocation: { lat: number, lon: number };
    isCompleted: boolean;
    driverId: string;
  }
  