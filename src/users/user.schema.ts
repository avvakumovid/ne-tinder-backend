
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, } from 'mongoose';


export type UserDocument = User & Document


@Schema()
export class User {
    [x: string]: any;
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    birthdate: Date

    @Prop({ required: true })
    gender: 'Female' | 'Male'

    @Prop()
    age: number

    @Prop({ default: [] })
    location: number[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [], autopopulate: true }])
    myLikes: User[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [], autopopulate: true }])
    meLikes: User[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [], autopopulate: true }])
    matches: User[]




}



export const UserSchema = SchemaFactory.createForClass(User)
