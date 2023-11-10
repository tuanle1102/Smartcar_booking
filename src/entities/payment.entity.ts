
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,SchemaTypes } from 'mongoose';

export type PaymentDocument = Payment & Document;

export class Payment {
    @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
    userId: string; // ID của người dùng
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Driver' })
    driverId: string; // ID của tài xế
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Booking' })
    bookingId: string; // ID của tài xế
    @Prop()
    totalPrice: number
    @Prop()
    isPaid: boolean;
  // Thêm các trường khác cần thiết
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);

