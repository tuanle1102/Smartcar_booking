// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRoles } from 'src/enum/user.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  fullname: string
  @Prop()
  email: string
  @Prop()
  address: string
  @Prop()
  birthday: string
  @Prop({ required: false, unique: true })
  phoneNumber: string;
  @Prop()
  otp: string;
  @Prop({ default: false })
  isVerify: boolean;
  @Prop({ type: String })
  avatar: any
  @Prop({ type: String })
  cccd: any
  @Prop({ type: String })
  gplx: any
  @Prop({ type: String, enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
