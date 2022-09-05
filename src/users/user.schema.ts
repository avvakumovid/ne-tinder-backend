
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

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [], autopopulate: true }])
    myLikes: User[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [], autopopulate: true }])
    meLikes: User[]

    @Prop()
    matches: [{
        user: User,
        chat: Chat
    }]

    @Prop()
    pictures: string[]

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat', default: [], autopopulate: true }])
    chats: Chat[]

}


export const UserSchema = SchemaFactory.createForClass(User)
