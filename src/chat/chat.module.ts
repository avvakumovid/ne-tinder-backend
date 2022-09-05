import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Chat, ChatSchema } from './chat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './../users/entities/user.entity';
import { UserSchema } from './../users/user.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [ChatService]
})
export class ChatModule { }