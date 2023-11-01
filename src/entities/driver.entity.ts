// user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { UserRoles } from 'src/enum/user.enum';


export type DriverDocument = Driver & Document;

@Schema()
export class Driver {
    @Prop({ type: SchemaTypes.ObjectId }) 
    _id: Object;
    @Prop({ required: false, unique: false })
    phoneNumber: string;
    @Prop()
    otp: string;
    @Prop({ default: false })
    isVerify: boolean;
    @Prop({ type: String, enum: UserRoles, default: UserRoles.USER })
    role: UserRoles;
    @Prop()
    fullname: string
    @Prop()
    address: string
    @Prop()
    birthday: string
    @Prop({ type: String })
    avatar: string;
    @Prop({ type: String })
    cccd: any
    @Prop({ type: String })
    gplx: any
    @Prop()
    startDrivingDate: Date;
    @Prop({ type: Object })
    location: { lat: number, lon: number }
     @Prop()
    isAvailable: boolean; // Trạng thái khả dụng
   
}

export const DriverSchema = SchemaFactory.createForClass(Driver);

