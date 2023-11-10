// booking.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,SchemaTypes } from 'mongoose';
import { Review, ReviewSchema } from './rating.entity';

export type BookingDocument = Booking & Document;

@Schema()
export class Booking {
  @Prop({ type: SchemaTypes.ObjectId }) 
  bookingId: Object;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: string; // ID của người dùng
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Driver' })
  driverId: string; // ID của tài xế
  @Prop({ type: Object })
  startLocation: { lat: number, lon: number }; // Vị trí xuất phát
  @Prop({ type: Object })
  endLocation: { lat: number, lon: number }; // Vị trí kết thúc
  @Prop()
  totalPrice: number;
  @Prop({default: false})
  isPaid: boolean
  @Prop({ default: new Date() })
  createdAt: Date; // Thời gian tạo đơn
  @Prop({ default: false })
  isCompleted: boolean; // Trạng thái hoàn thành
  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];
  @Prop({ default: 0 }) // Khởi tạo giá trị mặc định là 0
  avgRating: number;
  
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
