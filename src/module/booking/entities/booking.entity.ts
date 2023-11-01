// booking.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop()
  userId: string; // ID của người dùng

  @Prop()
  driverId: string; // ID của tài xế

  @Prop({ type: Object })
  startLocation: { lat: number, lon: number }; // Vị trí xuất phát

  @Prop({ type: Object })
  endLocation: { lat: number, lon: number }; // Vị trí kết thúc

  @Prop({ default: new Date() })
  createdAt: Date; // Thời gian tạo đơn

  @Prop({ default: false })
  isCompleted: boolean; // Trạng thái hoàn thành
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
