import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.schema';
import { CreateChatDto } from './dto/create-user.dto';

@Injectable()
export class ChatService {
    constructor(@InjectModel(Chat.name) private chatModel: Model<ChatDocument>) { }

    async create(createChatDto: CreateChatDto) {
        const createChat = await new this.chatModel(createChatDto)
        return createChat.save()
    }
}