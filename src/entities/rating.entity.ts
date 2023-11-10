import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types,SchemaTypes } from 'mongoose';

@Schema()
export class Review {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  userId: Object; // ID của người dùng
  @Prop({ required: true })
  rating: number;
  @Prop({ required: true })
  comment: string;
  @Prop({ default: new Types.ObjectId().toHexString() }) // Sử dụng new Types.ObjectId() để tạo một ObjectId mới
  _id: string;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
