import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/user.schema';


export type ChatDocument = Chat & Document

@Schema()
export class Chat {

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    users: User[]

    @Prop({ default: [] })
    massages: [{
        date: Date,
        message: string;
        author: User
    }]


}

export const ChatSchema = SchemaFactory.createForClass(Chat)