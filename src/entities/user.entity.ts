// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document,SchemaTypes } from 'mongoose';
import { UserRoles } from 'src/enum/user.enum';
import { Review } from './rating.entity';
import { Types } from 'mongoose';


export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: SchemaTypes.ObjectId }) 
  _id: Object;
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
  @Prop({ type: Object })
  location: { lat: number, lon: number }
  @Prop({ type: String, enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;
}

export const UserSchema = SchemaFactory.createForClass(User);
