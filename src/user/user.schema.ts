
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    birthdate: Date

    @Prop()
    age: number

    @Prop({ default: [] })
    location: number[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
    myLikes: User[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
    meLikes: User[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
    matches: User[]

}

export const UserSchema = SchemaFactory.createForClass(User)