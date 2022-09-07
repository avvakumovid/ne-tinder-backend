import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';



export type ChatDocument = Chat & Document

@Schema()
export class Chat {

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }])
    users

    @Prop({ default: [] })
    massages: [{
        date: Date,
        message: string;
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }]


}

export const ChatSchema = SchemaFactory.createForClass(Chat)