
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, } from 'mongoose';
import { Chat } from 'src/chat/chat.schema';



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

    @Prop({ required: true })
    gender: 'Female' | 'Male'

    @Prop()
    age: number

    @Prop({ default: [] })
    location: number[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
    myLikes: User[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }])
    meLikes: User[]

    @Prop([{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        chat: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true }
    }])
    matches

    @Prop()
    pictures: string[]

    // @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', default: [] }])
    // chats: Chat[]

}


export const UserSchema = SchemaFactory.createForClass(User)
