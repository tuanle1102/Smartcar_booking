// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from 'src/enum/user.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  fullname: string
  @Prop({ required: false, unique: false })
  phoneNumber: string;
  @Prop()
  address: string
  @Prop()
  birthday: string
  @Prop()
  otp: string;
  @Prop({ default: false })
  isVerify: boolean;
  @Prop({ type: String })
  avatar: string;
  @Prop({ type: String })
  cccd: any
  @Prop()
  latitude: Number // Tọa độ latitude
  @Prop()
  longitude: Number // Tọa độ longitude
  @Prop({ type: String, enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
