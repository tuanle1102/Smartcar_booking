// create-booking.dto.ts
export class CreateBookingDto {
    userId: string;
    driverId: string;
    startLocation: { lat: number, lon: number };
    endLocation: { lat: number, lon: number };
  }
  